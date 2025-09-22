import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [isEvening, setIsEvening] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsEvening(hour >= 15 && hour < 18);

    const interval = setInterval(() => {
      const h = new Date().getHours();
      setIsEvening(h >= 15 && h < 18);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-start font-poppins overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #ff8c42, #ff4c29 33%, #ffccdd 33%, #ffccdd 100%)"
      }}
    >
      {/* Sunset Top 1/3 */}
      {isEvening && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden pointer-events-none">
          {/* Sun */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_40px_10px_rgba(255,200,0,0.4)] z-10"
            animate={{ top: ["10%", "80%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          />

          {/* Clouds behind sun */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/50 rounded-full blur-2xl"
              style={{
                width: `${100 + i * 50}px`,
                height: `${50 + i * 25}px`,
                top: `${10 + i * 15}%`,
                left: `${i * 40}%`,
                zIndex: 1
              }}
              initial={{ x: i % 2 === 0 ? "-30%" : "120%" }}
              animate={{ x: i % 2 === 0 ? "120%" : "-30%" }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Clouds in front of sun */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/60 rounded-full blur-2xl"
              style={{
                width: `${120 + i * 40}px`,
                height: `${60 + i * 25}px`,
                top: `${15 + i * 20}%`,
                left: `${i * 30}%`,
                zIndex: 20
              }}
              initial={{ x: i % 2 === 0 ? "120%" : "-30%" }}
              animate={{ x: i % 2 === 0 ? "-30%" : "120%" }}
              transition={{ duration: 50 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {/* Title */}
      <div className="text-center mt-40 mb-8 z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
        <p className="text-lg md:text-xl text-rose-600 mt-3">
          3 years together... and many more to come ❤️
        </p>
      </div>

      {/* Open Letter Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-20"
      >
        <Mail className="w-6 h-6" /> Open Your Letter
      </button>
    </div>
  );
}
