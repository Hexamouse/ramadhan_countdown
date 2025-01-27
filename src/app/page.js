"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; 
import { FaMoon, FaStar, FaMosque } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const calculateCountdown = (targetDate) => {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export default function RamadhanCountdown() {
  const ramadhanStartNU = useMemo(() => new Date("2025-03-10T00:00:00Z"), []);
  const ramadhanStartMuhammadiyah = useMemo(() => new Date("2025-03-11T00:00:00Z"), []);
  const eidStartNU = useMemo(() => new Date("2025-04-09T00:00:00Z"), []);
  const eidStartMuhammadiyah = useMemo(() => new Date("2025-04-10T00:00:00Z"), []);

  const [countdownNU, setCountdownNU] = useState(null);
  const [countdownMuhammadiyah, setCountdownMuhammadiyah] = useState(null);
  const [isRamadhanStartedNU, setIsRamadhanStartedNU] = useState(false);
  const [isRamadhanStartedMuhammadiyah, setIsRamadhanStartedMuhammadiyah] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });

    const interval = setInterval(() => {
      const now = new Date();

      const isRamadhanNU = now >= ramadhanStartNU && now < eidStartNU;
      const isRamadhanMuhammadiyah = now >= ramadhanStartMuhammadiyah && now < eidStartMuhammadiyah;

      setIsRamadhanStartedNU(isRamadhanNU);
      setIsRamadhanStartedMuhammadiyah(isRamadhanMuhammadiyah);

      setCountdownNU(
        isRamadhanNU ? calculateCountdown(eidStartNU) : calculateCountdown(ramadhanStartNU)
      );
      setCountdownMuhammadiyah(
        isRamadhanMuhammadiyah ? calculateCountdown(eidStartMuhammadiyah) : calculateCountdown(ramadhanStartMuhammadiyah)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [ramadhanStartNU, eidStartNU, ramadhanStartMuhammadiyah, eidStartMuhammadiyah]);

  if (!countdownNU && !countdownMuhammadiyah) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/etc/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-yellow-300 drop-shadow-lg"
          animate={{ scale: [0.8, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          Eid Mubarak!
        </motion.h1>
        <p className="text-lg sm:text-xl text-yellow-500 mt-4 text-center">
          Semoga Allah menerima amal ibadah kita.
        </p>
        <FaMosque className="text-yellow-500 text-5xl sm:text-6xl mt-6 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/etc/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6 sm:mb-8 drop-shadow-lg"
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        Ramadhan Countdown
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-between w-full max-w-4xl px-4 sm:px-8 gap-4">
        {/* Nahdlatul Ulama Countdown Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 m-4 w-full sm:max-w-md"
          data-aos="fade-up"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 700, damping: 10 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">Nahdlatul Ulama</h2>
          {countdownNU ? (
            <div className="text-2xl sm:text-3xl font-mono text-center text-gray-800">
              {countdownNU.days}d {countdownNU.hours}h {countdownNU.minutes}m {countdownNU.seconds}s
            </div>
          ) : (
            <p className="text-lg text-gray-700 text-center">Ramadhan telah dimulai!</p>
          )}
          <FaMoon className="text-yellow-400 text-5xl sm:text-6xl mx-auto mt-4" />
        </motion.div>

        {/* Muhammadiyah Countdown Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 m-4 w-full sm:max-w-md"
          data-aos="fade-up"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 700, damping: 10 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">Muhammadiyah</h2>
          {countdownMuhammadiyah ? (
            <div className="text-2xl sm:text-3xl font-mono text-center text-gray-800">
              {countdownMuhammadiyah.days}d {countdownMuhammadiyah.hours}h {countdownMuhammadiyah.minutes}m {countdownMuhammadiyah.seconds}s
            </div>
          ) : (
            <p className="text-lg text-gray-700 text-center">Ramadhan telah dimulai!</p>
          )}
          <FaStar className="text-yellow-400 text-5xl sm:text-6xl mx-auto mt-4" />
        </motion.div>
      </div>

      <footer className="mt-6 sm:mt-10 py-4 px-6 sm:px-8">
        <p className="text-center text-yellow-500 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Dzikri Maulana. Created with Next.js.
        </p>
      </footer>
    </div>
  );
}