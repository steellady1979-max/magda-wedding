import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import envelope from "@/assets/cream-envelope.png.asset.json";

const message = `ძვირფასო სტუმარო,

დადგა დღე, რომელსაც დიდი ხანია ველოდებით.
გვინდა, ჩვენი ბედნიერების ყველაზე ლამაზი მომენტი თქვენთან ერთად გავიზიაროთ — სიცილით, მუსიკით და ბევრი სიყვარულით.

გელოდებით ჩვენს განსაკუთრებულ დღეს`;

export function LetterEnvelope() {
  const [opened, setOpened] = useState(false);
  const [visibleText, setVisibleText] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!opened) return;
    if (reduceMotion) {
      setVisibleText(message);
      return;
    }

    setVisibleText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(message.slice(0, index));
      if (index >= message.length) window.clearInterval(timer);
    }, 32);
    return () => window.clearInterval(timer);
  }, [opened, reduceMotion]);

  return (
    <section className={`letter-envelope ${opened ? "is-open" : ""}`} aria-label="წყვილის მიმართვა">
      <motion.div
        className="letter-paper"
        initial={false}
        animate={opened ? { x: "-50%", y: "-58%", opacity: 1 } : { x: "-50%", y: "4%", opacity: 0 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <p>{visibleText}<span className="typing-caret" aria-hidden="true" /></p>
      </motion.div>

      <Button
        type="button"
        variant="ghost"
        className="letter-envelope-trigger"
        onClick={() => {
          if (!opened) setOpened(true);
        }}
        aria-expanded={opened}
      >
        <img src={envelope.url} alt="კრემისფერი კონვერტი" width={1240} height={1748} />
        {!opened && <span><MailOpen aria-hidden="true" /> გახსენით წერილი</span>}
      </Button>
    </section>
  );
}