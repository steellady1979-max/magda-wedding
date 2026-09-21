export const event = {
  names: "ბექა & მაგდა",
  date: "31.10.2026",
  target: "2026-10-31T00:00:00+04:00", // Temporary midnight in Asia/Tbilisi.
  calendarStart: "20261031",
  calendarEnd: "20261101", // Exclusive end for an all-day event.
  invitation: "სიყვარულით გიწვევთ ჩვენი ცხოვრების განსაკუთრებული დღის გასაზიარებლად.",
  venue: "მწვანე სახლი",
  map: "https://www.google.com/maps?q=HM48+FCH+Green+House,+Makho&ftid=0x40678fae24d67d13:0x445517a1fdc3afa5&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,47071704,94218641,94282134,94286869,100820247,100822504&g_ep=CAISEjI2LjM2LjMuOTczNTQ4ODUxMBgAINeCAypTLDk0Mjk3Njk5LDk0MjMxMTg4LDk0MjgwNTY4LDQ3MDcxNzA0LDk0MjE4NjQxLDk0MjgyMTM0LDk0Mjg2ODY5LDEwMDgyMDI0NywxMDA4MjI1MDRCAkdF&skid=418f48f9-0374-4117-a0be-108a35918935&g_st=ifm",
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
    { time: "18:00", title: "საზეიმო ვახშამი", note: "მწვანე სახლი" },
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
