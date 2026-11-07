import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { Stagger, StaggerItem } from "../../components/motion";
import s from "./faq.module.css";

// Accordion FAQ shared by the packages, family, corporate and international pages.
// items: [{ q, a }] (already translated). The first item starts open.
const Faq = ({ items, firstOpen = true }) => {
  const [open, setOpen] = useState(firstOpen ? 0 : -1);
  return (
    <Stagger className={s.faq} gap={0.06}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <StaggerItem key={f.q} y={16} className={`${s.faqItem} ${isOpen ? s.faqItemOpen : ""}`}>
            <h3 style={{ margin: 0, fontSize: "1rem" }}>
              <button type="button" className={s.faqQ} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span> <Plus weight="bold" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="a" style={{ overflow: "hidden" }}
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  <p className={s.faqA}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
};

export default Faq;
