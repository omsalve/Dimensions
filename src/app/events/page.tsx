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

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-center mb-16 text-white tracking-tight"
      >
        Events
      </motion.h2>

      {/* Grid */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-4 md:gap-6 lg:gap-8

          auto-rows-[180px]
          md:auto-rows-[240px]
          lg:auto-rows-[260px]
        "
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className={`
              relative flex items-center justify-center
              rounded-3xl cursor-pointer

              bg-gradient-to-br from-zinc-800 to-zinc-700
              border border-white/20
              shadow-[0_0_25px_rgba(255,255,255,0.08)]

              transition-transform duration-300
              ${cat.colSpan || ""} ${cat.rowSpan || ""}
            `}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              duration: 0.45,
              type: "spring",
              stiffness: 80,
            }}
            whileHover={{
              y: -12,
              rotate: Math.random() * 3 - 1.5,
            }}
          >
            <h3 className="text-white text-lg md:text-2xl font-semibold px-3 text-center drop-shadow-lg">
              {cat.name}
            </h3>
          </motion.div>
        ))}
      </div>

    </main>
  );
}
