import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const responseSchema = z.object({
  name: z.string().trim().min(2).max(100),
  attendance: z.enum(["yes", "no"]),
});

const SPREADSHEET_ID = "1JggiyUvXFcVvvr78_r344WEiScGm3CvuDHGm7BoRNZY";

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((data) => responseSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    if (!lovableKey || !sheetsKey) throw new Error("RSVP connection is unavailable");

    const response = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/პასუხები!A:C:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[new Date().toISOString(), data.name, data.attendance === "yes" ? "სიამოვნებით" : "სამწუხაროდ ვერ"]],
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