"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // FIX: Added 'as const' to ensure specific types are inferred
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
  } as const;

  // FIX: Added 'as const' for consistency
  const listVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  // FIX: Added 'as const' for consistency
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  } as const;

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="fixed top-6 right-6 z-[1001] w-12 h-12 flex flex-col justify-center items-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          className="block h-0.5 w-7 bg-white"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 4 },
          }}
        ></motion.span>
        <motion.span
          className="block h-0.5 w-7 bg-white"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        ></motion.span>
        <motion.span
          className="block h-0.5 w-7 bg-white"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -4 },
          }}
        ></motion.span>
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
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-sm p-8 z-[1000] border-l border-white/10"
              style={{
                backgroundColor: 'rgba(10, 10, 10, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="h-full flex flex-col justify-center">
                <motion.ul
                  className="flex flex-col gap-4"
                  variants={listVariants}
                >
                  {navItems.map((item) => (
                    <motion.li key={item.label} variants={itemVariants}>
                      <motion.a
                        href={item.href}
                        className="block text-3xl text-slate-200 font-semibold transition-colors hover:text-white"
                        whileHover={{ x: 10 }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </motion.a>
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
};

export default SideMenu;