"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Youtube } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
} as const;

const ContactUs = () => {
  return (
    <motion.section
      className="py-24 px-4 sm:px-8 bg-black text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-center"
        >
          Get In Touch
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto text-center"
        >
          Have a question or want to get involved? We&apos;d love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <motion.div className="space-y-10" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Mail size={24} />
                Email Us
              </h3>
              <a
                href="mailto:contact@dimensionsfest.com"
                className="text-lg text-slate-300 hover:text-white transition-colors"
              >
                contact@dimensionsfest.com
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-6">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Instagram size={32} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Youtube size={32} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form className="space-y-6" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-md p-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-md p-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                rows={5}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-md p-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-black font-bold py-4 rounded-md text-lg transition-transform"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactUs;
