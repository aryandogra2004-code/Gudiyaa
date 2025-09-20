import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const cards = [
    "You are my tiny baby, my little girl 💕. every day waking up to your Morningssssweetyyy is the sweetst mornings i can have .",
    "I love your sundrrrrr  voice, your cutuuuu  laugh onlyyyy you can make my heart melt everyday  ✨.",
    "3 years together and still counting… I want to spend forever with you 💍💕💕💕❤️.",
    "you are meraa chotuu sa bacchaa and no matter how old we get you will always remain myy chotuuubaby 💖.",
    "I love you so much, Gudiyaa ❤️ You are my everything, forever & always ❤️."
  ];

  // Floating emojis (hearts + nazar eyes)
  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400" },
    { symbol: "🧿", color: "text-blue-500" }
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 p-6 overflow-hidden">
      {/* Floating emojis */}
      {[...Array(20)].map((_, i) => {
        const emoji = floatingEmojis[i % floatingEmojis.length];
        return (
          <motion.div
            key={i}
            className={`absolute ${emoji.color}`}
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, fontSize: `${20 + Math.random()*20}px` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -50], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: 6 + Math.random() * 3, repeat: Infinity, delay: i * 0.3 }}
          >
            {emoji.symbol}
          </motion.div>
        );
      })}

      {/* Title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
        <p className="text-lg md:text-xl text-rose-600 mt-3">
          3 years together... and many more to come ❤️
        </p>
      </motion.div>

      {/* Open envelope button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-6 h-6" /> Open Your Letter
      </motion.button>

      {/* Envelope modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-rose-500 hover:text-rose-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-rose-600 text-center mb-4">
                My Sweetest Gudiyaa ❤️
              </h2>

              <motion.div
                key={cardIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-rose-50 p-6 rounded-xl shadow-inner text-center text-gray-700 min-h-[120px] flex items-center justify-center"
              >
                {cards[cardIndex]}
              </motion.div>

              <div className="flex justify-between w-full mt-6">
                <button
                  onClick={() => setCardIndex((cardIndex - 1 + cards.length) % cards.length)}
                  className="p-2 text-rose-500 hover:text-rose-700"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCardIndex((cardIndex + 1) % cards.length)}
                  className="p-2 text-rose-500 hover:text-rose-700"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <motion.div
                className="flex justify-center mt-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
