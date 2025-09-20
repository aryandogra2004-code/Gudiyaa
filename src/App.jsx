import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  const cards = [
    "You are my tiny baby, my little girl 💕. Every day waking up to your Morningssssweetyyy is the sweetest morning I can have.",
    "I love your sundrrrrr voice, your cutuuuu laugh. Onlyyyy you can make my heart melt everyday ✨.",
    "3 years together and still counting… I want to spend forever with you 💍💕💕💕❤️.",
    "You are meraa chotuu sa bacchaa and no matter how old we get you will always remain my chotuuubaby 💖.",
    "I love you so much, Gudiyaa ❤️ You are my everything, forever & always ❤️."
  ];

  const longMessage = `
    My Sweetest Gudiyaa 💕,

    From the moment I met you, my world has been brighter. Every laugh, every hug, every tiny moment
    we share is etched into my heart forever. You are my little star, my sunshine, my tiny miracle,
    and I want to spend every single day making you feel loved and special.

    You are my heart, my soul, my everything. No words can truly capture how much I adore you.
    Here’s to countless more memories, laughter, hugs, kisses, and dreams fulfilled together.

    Always yours,
    ❤️ Aryan
  `;

  // Floating emojis
  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400", size: 25 },
    { symbol: "🧿", color: "text-blue-500", size: 30 }
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 p-6 overflow-hidden">
      
      {/* Floating emojis */}
      {[...Array(25)].map((_, i) => {
        const emoji = i % 2 === 0 ? floatingEmojis[0] : floatingEmojis[1];
        return (
          <motion.div
            key={i}
            className={`${emoji.color} absolute`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${emoji.size + Math.random() * 15}px`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -50], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: i * 0.3 }}
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
        {open && !showScroll && (
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

              {/* Navigation */}
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

              {/* Heart with text */}
              <div className="flex flex-col items-center mt-6 cursor-pointer" onClick={() => setShowScroll(true)}>
                <p className="text-rose-600 font-semibold mb-2 text-center">
                  Click on the heart my betuu
                </p>
                <motion.div
                  className="animate-pulse"
                  whileHover={{ scale: 1.2 }}
                >
                  <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll modal */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button
                onClick={() => setShowScroll(false)}
                className="absolute top-4 right-4 text-rose-500 hover:text-rose-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cute vintage paper background */}
              <div className="bg-white/90 p-6 rounded-xl shadow-inner border border-pink-200 relative w-full"
                   style={{ backgroundImage: `url('https://i.ibb.co/9y7rV7K/vintage-paper.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
              >
                {/* Ribbons and flowers */}
                <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
                  <div className="text-pink-400 font-bold text-xl">🎀🌸</div>
                  <div className="text-pink-400 font-bold text-xl">🌸🎀</div>
                </div>

                <pre className="whitespace-pre-wrap text-center text-rose-600 text-lg">
                  {longMessage}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
