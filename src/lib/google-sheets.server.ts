export async function appendRsvp(values: (string | number)[]): Promise<void> {
  const url = process.env["GOOGLE_APPS_SCRIPT_URL"]?.trim();
  const secret = process.env["RSVP_SECRET"]?.trim();
  if (!url || !secret) throw new Error("RSVP connection is unavailable");
  const endpoint = new URL(url);
  if (endpoint.protocol !== "https:" || endpoint.hostname !== "script.google.com" || !endpoint.pathname.endsWith("/exec")) throw new Error("RSVP connection is unavailable");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, values }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("RSVP submission failed");
  const result = await response.json() as { ok?: boolean };
  if (result.ok !== true) throw new Error("RSVP submission was not confirmed");
}
