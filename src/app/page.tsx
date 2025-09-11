"use client";
import Image from "next/image";
import GradientBlinds from "../components/GradientBlinds";
import AboutSection from "../components/AboutSection"; // Import the new section
import Galaxy from "@/components/Galaxy";

export default function Home() {
  return (
    <div className="font-sans">
      <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 overflow-hidden bg-transparent">
        <main className="z-10 flex flex-col gap-8 items-center text-center">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter">
            DIMENSIONS <span className="text-[#FF9FFC]">2025</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-400">
            Celebrating our 30th Pearl Jubilee, Dimensions brings together 30+ events showcasing the brilliance of students from over 120 colleges. Join us for two thrilling days of creativity, talent, and unforgettable experiences.
          </p>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-slate-200 font-medium text-sm sm:text-base h-12 px-6"
              href="#"
            >
              Register Now
            </a>
            <a
              className="rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center hover:bg-white/10 hover:border-transparent font-medium text-sm sm:text-base h-12 px-6"
              href="#"
            >
              Explore Events
            </a>
          </div>
        </main>
      </div>

      {/* Add the new AboutSection here */}
      <AboutSection />
      
    </div>
  );
}