"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Performing", colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
  { name: "Ground Informals" },
  { name: "Classroom Informals" },
  { name: "Literary", colSpan: "md:col-span-2" },
  { name: "Fine Arts" },
  { name: "Quiz" },
  { name: "Flagship", colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
  { name: "E-Sports" },
  { name: "Sports" },
];

export default function EventsGrid() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center mb-20 text-white tracking-tight"
      >
        All Events
      </motion.h2>

      <div
        className="
          grid 
          grid-cols-2 
          md:grid-cols-4 
          lg:grid-cols-6 
          auto-rows-[180px] 
          md:auto-rows-[240px] 
          lg:auto-rows-[260px] 
          gap-4 
          md:gap-6 
          lg:gap-8
        "
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className={`relative flex items-center justify-center rounded-3xl 
              bg-gradient-to-br from-zinc-800 to-zinc-700
              border border-white/20
              ${cat.colSpan || ""} ${cat.rowSpan || ""} 
              hover:scale-105 transition-transform duration-300 
              shadow-[0_0_25px_rgba(255,255,255,0.08)] cursor-pointer`}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.07,
              duration: 0.45,
              type: "spring",
              stiffness: 80,
            }}
            whileHover={{
              y: -10,
              rotate: Math.random() * 3 - 1.5,
            }}
          >
            <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-3">
              {cat.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
