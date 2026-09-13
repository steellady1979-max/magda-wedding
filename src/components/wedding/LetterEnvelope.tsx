import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import envelope from "@/assets/letter-envelope-new.png.asset.json";
import candelabra from "@/assets/letter-candelabra.png.asset.json";

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
      <motion.div
        className="letter-paper"
        initial={false}
        animate={opened ? { x: "-50%", y: 0, opacity: 1 } : { x: "-50%", y: 155, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <div className="letter-copy">
          <img className="letter-candelabra" src={candelabra.url} alt="" aria-hidden="true" />
          {message.map((line, index) => (
            <motion.p
              key={line}
              initial={false}
              animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 1.15 + index * 0.42,
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
        <img src={envelope.url} alt="მოჩუქურთმებული კონვერტი" width={1309} height={839} />
        {!opened && <span>გახსენით წერილი</span>}
      </Button>
    </section>
  );
}