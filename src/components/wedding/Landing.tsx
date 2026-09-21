import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Church, Flower2, Heart, MapPin, Send, Sparkles, UtensilsCrossed, UserRound, UsersRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LetterEnvelope } from "@/components/wedding/LetterEnvelope";

import { event, countdown } from "@/lib/event";
import { submitRsvp } from "@/lib/rsvp.functions";
import texture from "@/assets/envelope-texture-cream.jpg";
import ceremonyArt from "@/assets/ceremony-garden.jpg.asset.json";


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
  const [party, setParty] = useState<"solo" | "plus_one" | "family">("solo");
  const [guests, setGuests] = useState(1);
  const [companions, setCompanions] = useState("");
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
      await sendRsvp({
        data: {
          name,
          attendance,
          party: attendance === "yes" ? party : "solo",
          guests: attendance === "yes" ? guests : 1,
          companions: attendance === "yes" ? companions : "",
        },
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="wedding-landing" style={{ backgroundImage: `url(${texture})` }}>
      <article className="wedding-paper" id="invitation">
        <img className="wedding-lace wedding-lace-brown" src="/media/lace.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <header className="wedding-heading">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.12}><h1>{event.names}</h1></Reveal>
          <Reveal delay={0.22}><p className="event-date"><Heart aria-hidden="true" />{event.date}</p></Reveal>
          <Reveal delay={0.34}><p className="wedding-intro">{event.invitation}</p></Reveal>
        </header>
        <Reveal><LetterEnvelope /></Reveal>
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
          <ol className="wedding-timeline">
            {event.schedule.map((item, index) => {
              const Icon = [UsersRound, Church, UtensilsCrossed][index] ?? Sparkles;
              return (
                <motion.li
                  key={item.time}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <time>{item.time}</time>
                  <span className="timeline-icon" aria-hidden="true"><Icon /></span>
                  <div className="timeline-body">
                    <h3>{item.title}</h3>
                    {item.note ? <p className="timeline-note">{item.note}</p> : null}
                    {item.map ? (
                      <a className="timeline-map" href={item.map} target="_blank" rel="noopener noreferrer">
                        <MapPin aria-hidden="true" /> იხილე რუკაზე
                      </a>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>
        <section className="wedding-section" id="locations" aria-labelledby="location-title">
          <Reveal><Divider /></Reveal>
          <Reveal delay={0.1}><h2 id="location-title">ლოკაციები</h2></Reveal>
          <div className="wedding-places">
            {[
              {
                title: "ხელმოწერის ცერემონია",
                place: "მწვანე კონცხი — ბოტანიკური ბაღი",
                note: "ჩაქვის მხრიდან",
                img: ceremonyArt.url,
                alt: "ხელმოწერის ცერემონიის სივრცის ფერწერული ილუსტრაცია",
                map: event.ceremonyMap,
              },
              {
                title: "საზეიმო ვახშამი",
                place: event.venue,
                note: "",
                img: "/media/green-house.webp",
                alt: "მწვანე სახლის საქორწილო სივრცის ილუსტრაცია",
                map: event.map,
              },
            ].map((place, i) => (
              <Reveal key={place.title} delay={0.18 + i * 0.1}>
                <article className="wedding-place">
                  <img className="wedding-location" src={place.img} alt={place.alt} loading="lazy" decoding="async" />
                  <h3 className="wedding-venue"><MapPin aria-hidden="true" />{place.title}</h3>
                  <p className="wedding-note">{place.place}{place.note ? ` (${place.note})` : ""}</p>
                  <Button asChild variant="outline" className="wedding-button">
                    <a href={place.map} target="_blank" rel="noopener noreferrer">
                      იხილე რუკაზე <ArrowUpRight />
                    </a>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
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
                {attendance === "yes" && (
                  <>
                    <fieldset>
                      <legend>რამდენი ადამიანი მოდის?</legend>
                      <div className="wedding-rsvp-options is-counts">
                        {[1, 2, 3, 4, 5, 6].map((count) => (
                          <Button
                            key={count}
                            type="button"
                            variant="outline"
                            className={guests === count ? "is-selected" : ""}
                            aria-pressed={guests === count}
                            onClick={() => {
                              setGuests(count);
                              setParty(count === 1 ? "solo" : count === 2 ? "plus_one" : "family");
                              if (count === 1) setCompanions("");
                            }}
                          >
                            {count === 1 ? "მარტო" : `+${count - 1}`}
                          </Button>
                        ))}
                      </div>
                    </fieldset>
                    {guests > 1 && (
                      <>
                        <label htmlFor="guest-companions">თანმხლები სტუმრების სახელები</label>
                        <div className="wedding-input-wrap">
                          <UserRound aria-hidden="true" />
                          <input
                            id="guest-companions"
                            className="wedding-input"
                            value={companions}
                            onChange={(e) => setCompanions(e.target.value)}
                            placeholder="მაგ. ნინო ბერიძე, გიორგი ხარაზი"
                            maxLength={300}
                            required
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

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
        <img className="wedding-lace wedding-lace-brown wedding-lace-bottom" src="/media/lace.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </article>
    </div>
  );
}
