import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
const responseSchema = z.object({
  name: z.string().trim().min(2).max(100),
  attendance: z.enum(["yes", "no"]),
  party: z.enum(["solo", "plus_one", "family"]).default("solo"),
  guests: z.coerce.number().int().min(1).max(12).default(1),
  companions: z.string().trim().max(300).optional().default(""),
}).superRefine((data, ctx) => {
  if (data.attendance === "yes" && data.guests > 1 && data.companions.length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companions"],
      message: "Companion names are required for groups",
    });
  }
});
const partyLabel: Record<string, string> = {solo: "მარტო", plus_one: "+1", family: "ოჯახით"};
export const submitRsvp = createServerFn({ method: "POST" })
  .validator((data) => responseSchema.parse(data))
  .handler(async ({ data }) => {
    const { appendRsvp } = await import("./google-sheets.server");
    await appendRsvp([
      new Date().toISOString(),
      data.name,
      data.attendance === "yes" ? "სიამოვნებით" : "სამწუხაროდ ვერ",
      data.attendance === "yes" ? (partyLabel[data.party] ?? data.party) : "",
      data.attendance === "yes" ? data.guests : 0,
      data.attendance === "yes" && data.guests > 1 ? data.companions : "",
    ]);
    return { ok: true };
  });
