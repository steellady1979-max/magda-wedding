import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { event, countdown, calendarUrl } from "@/lib/event";
import lace from "@/assets/lace.png";
import texture from "@/assets/envelope-texture-cream.jpg";

function Divider() {
  return (
    <div className="wedding-divider" aria-hidden="true">
      <span />
      <Flower2 strokeWidth={1} />
      <span />
    </div>
  );
}
export function Landing() {
  const [remaining, setRemaining] = useState<number[] | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      setRemaining(countdown(Date.now()));
      if (Date.now() >= Date.parse(event.target)) clearInterval(timer);
    };
    update();
    if (Date.now() < Date.parse(event.target)) timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="wedding-landing" style={{ backgroundImage: `url(${texture})` }}>
      <article className="wedding-paper" id="invitation">
        <img className="wedding-lace" src={lace} alt="" aria-hidden="true" />
        <header className="wedding-heading">
          <Divider />
          <h1>{event.names}</h1>
          <p className="event-date">{event.date}</p>
          <p className="wedding-intro">{event.invitation}</p>
          <Button asChild variant="outline" className="wedding-button">
            <a href="#schedule">
              დღის განრიგი <ArrowDown />
            </a>
          </Button>
        </header>
        <section className="wedding-section countdown-section" aria-labelledby="countdown-title">
          <h2 id="countdown-title">ჩვენს დღემდე დარჩა</h2>
          <div className="wedding-countdown" role="timer" aria-live="off">
            {["დღეები", "საათები", "წუთები", "წამები"].map((label, i) => (
              <div key={label}>
                <strong>{remaining ? String(remaining[i]).padStart(2, "0") : "—"}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="wedding-button">
            <a href={calendarUrl()} target="_blank" rel="noopener noreferrer">
              <CalendarDays /> Google Calendar-ში დამატება
            </a>
          </Button>
        </section>
        <section className="wedding-section" id="schedule" aria-labelledby="schedule-title">
          <Divider />
          <h2 id="schedule-title">დღის განრიგი</h2>
          <p className="wedding-note">წინასწარი განრიგი — დროები დაზუსტდება.</p>
          <ol className="wedding-timeline">
            {event.schedule.map((item) => (
              <li key={item.time}>
                <time>{item.time}</time>
                <span aria-hidden="true">◇</span>
                <h3>{item.title}</h3>
              </li>
            ))}
          </ol>
        </section>
        <section className="wedding-section" aria-labelledby="location-title">
          <Divider />
          <h2 id="location-title">შეხვედრის ადგილი</h2>
          <h3 className="wedding-venue">{event.venue}</h3>
          <img
            className="wedding-location"
            src="/images/green-house.jpg"
            alt="მწვანე სახლის საქორწილო სივრცის ილუსტრაცია"
            width={1195}
            height={896}
            loading="lazy"
          />
          <Button asChild variant="outline" className="wedding-button">
            <a href={event.map} target="_blank" rel="noopener noreferrer">
              გახსენი რუკაზე <ArrowUpRight />
            </a>
          </Button>
        </section>
        <section className="wedding-section" aria-labelledby="rsvp-title">
          <Divider />
          <h2 id="rsvp-title">შეძლებთ მობრძანებას?</h2>
          <iframe
            className="wedding-google-form"
            src={`${event.rsvpForm}?embedded=true`}
            title="დასწრების ფორმა — ბექა და მაგდა"
            loading="lazy"
          />
          <a
            className="wedding-form-link"
            href={event.rsvpForm}
            target="_blank"
            rel="noopener noreferrer"
          >
            ფორმის გახსნა ცალკე ჩანართში ↗
          </a>
        </section>
        <footer className="wedding-footer">
          <Divider />
          <p>გელოდებით სიყვარულით</p>
          <span>
            {event.names} • {event.date}
          </span>
        </footer>
      </article>
    </div>
  );
}
