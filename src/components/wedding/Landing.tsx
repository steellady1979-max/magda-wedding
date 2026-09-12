import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { event, countdown } from "@/lib/event";
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
        <img className="wedding-lace wedding-lace-brown" src={lace} alt="" aria-hidden="true" />
        <header className="wedding-heading">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.12}><h1>{event.names}</h1></Reveal>
          <Reveal delay={0.22}><p className="event-date">{event.date}</p></Reveal>
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
          <Reveal delay={0.18}><h3 className="wedding-venue">{event.venue}</h3></Reveal>
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
