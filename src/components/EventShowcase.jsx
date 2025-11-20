"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function EventsShowcase() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center mb-14 text-white tracking-tight"
      >
        Events
      </motion.h2>

      {/* UPCOMING EVENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">

        {/* Upcoming Event 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-6 rounded-3xl bg-zinc-800/60 border border-white/20 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:scale-[1.02] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>

          <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10">Upcoming Event 1</h3>
          <p className="text-slate-300 mt-3 relative z-10">
            A big highlight of the festival. More details dropping soon.
          </p>

          <button className="mt-5 px-5 py-2 bg-white text-black font-semibold rounded-lg relative z-10 hover:bg-gray-200 transition">
            Learn More
          </button>
        </motion.div>

        {/* Upcoming Event 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-6 rounded-3xl bg-zinc-800/60 border border-white/20 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:scale-[1.02] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-orange-600/20"></div>

          <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10">Upcoming Event 2</h3>
          <p className="text-slate-300 mt-3 relative z-10">
            Another exciting event is on the way. Stay tuned.
          </p>

          <button className="mt-5 px-5 py-2 bg-white text-black font-semibold rounded-lg relative z-10 hover:bg-gray-200 transition">
            Learn More
          </button>
        </motion.div>

      </div>

      {/* VIEW ALL EVENTS BUTTON */}
      <div className="w-full flex justify-center">
        <Link
          href="/events"
          className="px-8 py-3 rounded-xl bg-white text-black text-lg font-semibold hover:bg-gray-200 transition-transform hover:scale-105"
        >
          View All Events
        </Link>
      </div>

    </section>
  );
}
