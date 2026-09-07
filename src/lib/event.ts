export const event = {
  names: "ბექა & მაგდა",
  date: "31.10.2026",
  target: "2026-10-31T00:00:00+04:00", // Temporary midnight in Asia/Tbilisi.
  calendarStart: "20261031",
  calendarEnd: "20261101", // Exclusive end for an all-day event.
  invitation: "სიყვარულით გიწვევთ ჩვენი ცხოვრების განსაკუთრებული დღის გასაზიარებლად.",
  venue: "მწვანე სახლი",
  map: "https://maps.app.goo.gl/B1eXHwL7XtwfLH3V9?g_st=ic",
  rsvpForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScd8sSg0ulQC-YJbXPD16B5HAezY71OKfG53RiddU0S7qOESw/viewform",
  schedule: [
    { time: "16:00", title: "სტუმრების მიღება" },
    { time: "17:00", title: "ცერემონია" },
    { time: "18:00", title: "საზეიმო ვახშამი" },
    { time: "20:00", title: "ცეკვა და გართობა" },
  ],
};
export function countdown(now: number) {
  const seconds = Math.max(0, Math.floor((Date.parse(event.target) - now) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];
}
export function calendarUrl() {
  return (
    "https://calendar.google.com/calendar/render?" +
    new URLSearchParams({
      action: "TEMPLATE",
      text: `${event.names} — ქორწილი`,
      dates: `${event.calendarStart}/${event.calendarEnd}`,
      ctz: "Asia/Tbilisi",
      location: event.venue,
      details: `${event.invitation}\n${event.map}\nდროები დაზუსტდება.`,
    })
  );
}
