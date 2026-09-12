import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Flower2, Heart, MapPin, Send, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { event, countdown } from "@/lib/event";
import { submitRsvp } from "@/lib/rsvp.functions";
import lace from "@/assets/lace.png";
import texture from "@/assets/envelope-texture-cream.jpg";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sendRsvp = useServerFn(submitRsvp);

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

  async function handleRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2 || !attendance) return;
    setStatus("sending");
    try {
      await sendRsvp({ data: { name, attendance } });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="wedding-landing" style={{ backgroundImage: `url(${texture})` }}>
      <article className="wedding-paper" id="invitation">
        <img className="wedding-lace wedding-lace-brown" src={lace} alt="" aria-hidden="true" />
        <header className="wedding-heading">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.12}><h1>{event.names}</h1></Reveal>
          <Reveal delay={0.22}><p className="event-date"><Heart aria-hidden="true" />{event.date}</p></Reveal>
          <Reveal delay={0.34}><p className="wedding-intro">{event.invitation}</p></Reveal>
        </header>
        <section className="wedding-section countdown-section" aria-labelledby="countdown-title">
          <Reveal><h2 id="countdown-title">ჩვენს დღემდე დარჩა</h2></Reveal>
          <Reveal delay={0.12}>
            <div className="wedding-countdown" role="timer" aria-live="off">
              {["დღეები", "საათები", "წუთები", "წამები"].map((label, i) => (
                <div key={label}>
                  <strong>{remaining ? String(remaining[i]).padStart(2, "0") : "—"}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <section className="wedding-section" id="schedule" aria-labelledby="schedule-title">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.1}><h2 id="schedule-title">დღის განრიგი</h2></Reveal>
          <Reveal delay={0.18}><p className="wedding-note">წინასწარი განრიგი — დროები დაზუსტდება.</p></Reveal>
          <Reveal delay={0.28}>
            <ol className="wedding-timeline">
              {event.schedule.map((item) => (
                <li key={item.time}>
                  <time>{item.time}</time>
                  <span aria-hidden="true">◇</span>
                  <h3>{item.title}</h3>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
        <section className="wedding-section" aria-labelledby="location-title">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.1}><h2 id="location-title">შეხვედრის ადგილი</h2></Reveal>
          <Reveal delay={0.18}><h3 className="wedding-venue"><MapPin aria-hidden="true" />{event.venue}</h3></Reveal>
          <Reveal delay={0.25}>
            <img
              className="wedding-location"
              src="/images/green-house.jpg"
              alt="მწვანე სახლის საქორწილო სივრცის ილუსტრაცია"
              width={1195}
              height={896}
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.32}>
            <Button asChild variant="outline" className="wedding-button">
              <a href={event.map} target="_blank" rel="noopener noreferrer">
                გახსენი რუკაზე <ArrowUpRight />
              </a>
            </Button>
          </Reveal>
        </section>
        <section className="wedding-section wedding-rsvp-section" aria-labelledby="rsvp-title">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.1}><h2 id="rsvp-title">დასწრების დადასტურება</h2></Reveal>
          <Reveal delay={0.18}><p className="wedding-note">გთხოვთ, შეგვატყობინოთ თქვენი პასუხი</p></Reveal>
          <Reveal delay={0.26}>
            {status === "sent" ? (
              <div className="wedding-rsvp-success" role="status">
                <Heart aria-hidden="true" />
                <h3>მადლობა, {name.trim()}!</h3>
                <p>{attendance === "yes" ? "სიხარულით დაგელოდებით." : "სამწუხაროა, რომ ვერ შემოგვიერთდებით."}</p>
              </div>
            ) : (
              <form className="wedding-rsvp" onSubmit={handleRsvp}>
                <label htmlFor="guest-name">სახელი / გვარი</label>
                <div className="wedding-input-wrap">
                  <UserRound aria-hidden="true" />
                  <input
                    id="guest-name"
                    className="wedding-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ჩაწერეთ სახელი და გვარი"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                  />
                </div>
                <fieldset>
                  <legend>შეძლებთ მობრძანებას?</legend>
                  <div className="wedding-rsvp-options">
                    <Button type="button" variant="outline" className={attendance === "yes" ? "is-selected" : ""} onClick={() => setAttendance("yes")} aria-pressed={attendance === "yes"}>
                      <Check aria-hidden="true" /> სიამოვნებით
                    </Button>
                    <Button type="button" variant="outline" className={attendance === "no" ? "is-selected" : ""} onClick={() => setAttendance("no")} aria-pressed={attendance === "no"}>
                      <X aria-hidden="true" /> სამწუხაროდ ვერ
                    </Button>
                  </div>
                </fieldset>
                <Button className="wedding-button wedding-submit" type="submit" disabled={status === "sending" || name.trim().length < 2 || !attendance}>
                  {status === "sending" ? "იგზავნება…" : "პასუხის გაგზავნა"} <Send aria-hidden="true" />
                </Button>
                {status === "error" && <p className="wedding-rsvp-error" role="alert">პასუხი ვერ გაიგზავნა. გთხოვთ, კვლავ სცადოთ.</p>}
              </form>
            )}
          </Reveal>
        </section>
        <footer className="wedding-footer">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.12}><p>გელოდებით სიყვარულით</p></Reveal>
          <Reveal delay={0.22}><span>{event.names} • {event.date}</span></Reveal>
        </footer>
        <img className="wedding-lace wedding-lace-brown wedding-lace-bottom" src={lace} alt="" aria-hidden="true" />
      </article>
    </div>
  );
}
