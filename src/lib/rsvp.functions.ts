import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const responseSchema = z.object({
  name: z.string().trim().min(2).max(100),
  attendance: z.enum(["yes", "no"]),
  party: z.enum(["solo", "plus_one", "family"]).default("solo"),
  guests: z.coerce.number().int().min(1).max(12).default(1),
  companions: z.string().trim().max(300).optional().default(""),
});

const SPREADSHEET_ID = "1JggiyUvXFcVvvr78_r344WEiScGm3CvuDHGm7BoRNZY";

const partyLabel: Record<string, string> = {
  solo: "მარტო",
  plus_one: "+1",
  family: "ოჯახით",
};

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((data) => responseSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    if (!lovableKey || !sheetsKey) throw new Error("RSVP connection is unavailable");

    const response = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/პასუხები!A:F:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [
            [
              new Date().toISOString(),
              data.name,
              data.attendance === "yes" ? "სიამოვნებით" : "სამწუხაროდ ვერ",
              partyLabel[data.party] ?? data.party,
              data.attendance === "yes" ? data.guests : 0,
              data.companions,
            ],
          ],
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error(`Google Sheets request failed [${response.status}]: ${detail}`);
      throw new Error("RSVP submission failed");
    }
    return { ok: true };
  });
