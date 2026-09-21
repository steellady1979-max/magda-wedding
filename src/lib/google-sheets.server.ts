export async function appendRsvp(values: (string | number)[]): Promise<void> {
  const url = process.env["GOOGLE_APPS_SCRIPT_URL"]?.trim();
  const secret = process.env["RSVP_SECRET"]?.trim();
  if (!url || !secret) throw new Error("RSVP connection is unavailable");
  const endpoint = new URL(url);
  if (
    endpoint.protocol !== "https:" ||
    endpoint.hostname !== "script.google.com" ||
    !endpoint.pathname.endsWith("/exec")
  ) {
    throw new Error("RSVP connection is unavailable");
  }
  const signal = AbortSignal.timeout(20000);
  const initialResponse = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, values }),
    redirect: "manual",
    signal,
  });

  let response = initialResponse;
  if ([301, 302, 303, 307, 308].includes(initialResponse.status)) {
    const location = initialResponse.headers.get("location");
    if (!location) throw new Error("RSVP submission failed");

    const redirectEndpoint = new URL(location);
    if (
      redirectEndpoint.protocol !== "https:" ||
      redirectEndpoint.hostname !== "script.googleusercontent.com"
    ) {
      throw new Error("RSVP submission failed");
    }

    response = await fetch(redirectEndpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      redirect: "error",
      signal,
    });
  }

  if (!response.ok) throw new Error("RSVP submission failed");
  const result = (await response.json()) as { ok?: boolean };
  if (result.ok !== true) throw new Error("RSVP submission was not confirmed");
}
