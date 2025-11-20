"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "Events", href: "/#events" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "About", href: "/#csr" },
  { label: "Contact", href: "/#contact" },
];

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      x: 300,
      transition: { duration: 0.35, ease: [0.42, 0, 0.58, 1] },
    },
    open: {
      x: 0,
      transition: { duration: 0.35, ease: [0.42, 0, 0.58, 1] },
    },
  };

  const listVariants: Variants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    closed: {},
  };

  const itemVariants: Variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 },
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="fixed top-6 right-6 z-[1001] w-12 h-12 flex flex-col justify-center items-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          className="block h-0.5 w-7 bg-white"
          variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 4 } }}
        />
        <motion.span
          className="block h-0.5 w-7 bg-white"
          variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        />
        <motion.span
          className="block h-0.5 w-7 bg-white"
          variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -4 } }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-sm p-8 z-[1000] border-l border-white/10"
              style={{
                backgroundColor: "rgba(10,10,10,0.7)",
                backdropFilter: "blur(20px)",
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="h-full flex flex-col justify-center">
                <motion.ul
                  variants={listVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col gap-4"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        scroll={true}
                        className="block text-3xl text-slate-200 font-semibold hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
