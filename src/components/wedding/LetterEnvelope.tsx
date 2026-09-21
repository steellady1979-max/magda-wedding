import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

const message = [
  "ძვირფასო სტუმარო,",
  "დადგა დღე, რომელსაც დიდი ხანია ველოდებით.",
  "გვინდა, ჩვენი ბედნიერების ყველაზე ლამაზი მომენტი თქვენთან ერთად გავიზიაროთ — სიცილით, მუსიკით და ბევრი სიყვარულით.",
  "გელოდებით ჩვენს განსაკუთრებულ დღეს",
];

export function LetterEnvelope() {
  const [opened, setOpened] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section className={`letter-envelope ${opened ? "is-open" : ""}`} aria-label="წყვილის მიმართვა">
      <motion.img
        className="letter-couple-art"
        src="/media/couple-frame-transparent.webp"
        alt="პატარძლისა და სიძის ილუსტრაცია"
        width={990}
        height={639}
        loading="lazy"
        decoding="async"
        initial={false}
        animate={opened ? { x: "-50%", opacity: 0, y: -18, scale: 0.97 } : { x: "-50%", opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="letter-paper"
        initial={false}
        animate={opened ? { x: "-50%", y: 0, opacity: 1 } : { x: "-50%", y: 155, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, delay: opened && !reduceMotion ? 0.28 : 0, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <div className="letter-copy">
          <img className="letter-candelabra" src="/media/letter-candelabra.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          {message.map((line, index) => (
            <motion.p
              key={line}
              initial={false}
              animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 1.43 + index * 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
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
        <img src="/media/letter-envelope-new.webp" alt="მოჩუქურთმებული კონვერტი" width={900} height={577} loading="lazy" decoding="async" />
        {!opened && <span>გახსენით წერილი</span>}
      </Button>
    </section>
  );
}
