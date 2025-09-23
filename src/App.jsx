import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [fireworks, setFireworks] = useState([]);

  const cards = [
    "Hey my Jaan ❤️ You are my everything.",
    "You make my world brighter every day ✨",
    "You are my safe place, my comfort, my Gudiyaa 💕",
  ];

  const triggerFireworks = () => {
    const colors = ["#fda4af", "#fbc2eb", "#ffe4e6", "#f472b6", "#facc15"];
    const shapes = ["circle", "heart", "star"];

    const createBurst = () => {
      const newFireworks = Array.from({ length: 80 }).map((_, i) => ({
        id: Date.now() + i,
        x: window.innerWidth / 2,
        y: window.innerHeight - 80,
        angle: Math.random() * Math.PI * 2,
        distance: 120 + Math.random() * 250,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        scale: 0.6 + Math.random() * 1,
        duration: 0.7 + Math.random() * 0.7,
      }));
      setFireworks((prev) => [...prev, ...newFireworks]);
      setTimeout(() => setFireworks([]), 1600);
    };

    // two bursts for dramatic effect
    createBurst();
    setTimeout(createBurst, 400);
  };

  const renderParticle = (p) => {
    const endX = p.x + Math.cos(p.angle) * p.distance;
    const endY = p.y - Math.sin(p.angle) * p.distance;

    let shapeStyle = {};
    if (p.shape === "heart") {
      shapeStyle = {
        clipPath: "polygon(50% 0%, 61% 12%, 75% 12%, 88% 25%, 88% 40%, 50% 100%, 12% 40%, 12% 25%, 25% 12%, 39% 12%)",
      };
    } else if (p.shape === "star") {
      shapeStyle = {
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      };
    }

    return (
      <motion.div
        key={p.id}
        initial={{ x: p.x, y: p.y, opacity: 1, scale: p.scale }}
        animate={{ x: endX, y: endY, opacity: 0, scale: 0.3, rotate: 360 }}
        transition={{ duration: p.duration, ease: "easeOut" }}
        className="absolute w-3 h-3"
        style={{
          backgroundColor: p.color,
          boxShadow: `0 0 10px ${p.color}`,
          borderRadius: p.shape === "circle" ? "9999px" : "0px",
          ...shapeStyle,
        }}
      />
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-300 overflow-hidden">
      {/* Fireworks */}
      <AnimatePresence>{fireworks.map(renderParticle)}</AnimatePresence>

      {/* Open Letter Button */}
      <button
        onClick={() => setOpen(true)}
        className="mb-4 px-6 py-3 bg-pink-500 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 transition"
      >
        <Mail className="inline-block mr-2" /> Open Your Letter 💌
      </button>

      {/* Special Button with Fireworks */}
      <button
        onClick={() => {
          triggerFireworks();
          setShowScroll(true);
        }}
        className="fixed bottom-5 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl shadow-lg hover:bg-red-600 transition"
      >
        Click me jaan 🎀
      </button>

      {/* Card Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          >
            <div className="relative bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-xl">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
              <p className="mb-4 text-lg">{cards[cardIndex]}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setCardIndex((cardIndex - 1 + cards.length) % cards.length)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => setCardIndex((cardIndex + 1) % cards.length)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="mt-4 text-pink-500 font-semibold">Click on the heart below</div>
              <button
                onClick={() => setShowScroll(true)}
                className="mt-3 flex items-center justify-center mx-auto text-red-500 text-3xl hover:scale-110 transition"
              >
                <Heart />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Letter */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <div className="relative bg-pink-50 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={() => setShowScroll(false)}
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
                My Special Letter to You ❤️
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
                My pyariii Gudiyaa 💕 From the moment we met, I knew in my heart you are the one.
                You have filled my days with laughter, my nights with peace, and my soul with love.
                You are my best friend, my safe place, and my forever person. No matter how far,
                my heart will always find its way to you. I love you endlessly! 💖
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}