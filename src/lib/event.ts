const greenHouseMap =
  "https://www.google.com/maps/place/Green+House/@41.5562969,41.6630383,652m/data=!3m1!1e3!4m6!3m5!1s0x40678fae24d67d13:0x445517a1fdc3afa5!8m2!3d41.5561956!4d41.6661165!16s%2Fg%2F11nxvdzm92!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D";

export const event = {
  names: "ბექა & მაგდა",
  date: "31.10.2026",
  target: "2026-10-31T00:00:00+04:00", // Temporary midnight in Asia/Tbilisi.
  calendarStart: "20261031",
  calendarEnd: "20261101", // Exclusive end for an all-day event.
  invitation: "სიყვარულით გიწვევთ ჩვენი ცხოვრების განსაკუთრებული დღის გასაზიარებლად.",
  venue: "მწვანე სახლი",
  map: greenHouseMap,
  rsvpForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScd8sSg0ulQC-YJbXPD16B5HAezY71OKfG53RiddU0S7qOESw/viewform",
  hotelMap:
    "https://www.google.com/maps/place/hotel+monarch/data=!4m2!3m1!1s0x4067863f81d00001:0xf92f424c7b610b5b?sa=X&ved=1t:242&ictx=111",
  ceremonyMap:
    "https://www.google.com/maps/place/Botanical+Garden+parking/@41.7066494,41.7198399,17z/data=!3m1!4b1!4m6!3m5!1s0x405d7d03eefd0887:0x6e3aba8a464537fc!8m2!3d41.7066494!4d41.7224148!16s%2Fg%2F11qbs5mww1?entry=ttu",
  schedule: [
    {
      time: "11:00",
      title: "სასტუმრო მონარქი",
      note: "სტუმრების შეხვედრა",
      map: "https://www.google.com/maps/place/hotel+monarch/data=!4m2!3m1!1s0x4067863f81d00001:0xf92f424c7b610b5b?sa=X&ved=1t:242&ictx=111",
    },
    {
      time: "16:00",
      title: "ხელმოწერის ცერემონია",
      note: "მწვანე კონცხი — ბოტანიკური ბაღი (ჩაქვის მხრიდან)",
      map: "https://www.google.com/maps/place/Botanical+Garden+parking/@41.7066494,41.7198399,17z/data=!3m1!4b1!4m6!3m5!1s0x405d7d03eefd0887:0x6e3aba8a464537fc!8m2!3d41.7066494!4d41.7224148!16s%2Fg%2F11qbs5mww1?entry=ttu",
    },
    { time: "18:00", title: "საზეიმო ვახშამი", note: "მწვანე სახლი", map: greenHouseMap },
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
