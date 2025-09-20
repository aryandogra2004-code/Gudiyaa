import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

// Google Fonts: <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);

  // Time logic for night effect
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkNight = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 18 || hour < 5);
    };
    checkNight();
    const interval = setInterval(checkNight, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  // Shooting star trigger every 8-15 sec
  useEffect(() => {
    if (!isNight) return;
    const timer = setTimeout(() => {
      setShootingStar(true);
      setTimeout(() => setShootingStar(false), 2000); // star lasts 2 sec
    }, Math.random() * 7000 + 8000);
    return () => clearTimeout(timer);
  }, [shootingStar, isNight]);

  const cards = [
    "You are my tiny baby, my little girl 💕. Every day waking up to your Morningssssweetyyy is the sweetest morning I can have.",
    "I love your sundrrrrr voice, your cutuuuu laugh. Onlyyyy you can make my heart melt everyday ✨.",
    "3 years together and still counting… I want to spend forever with you 💍💕💕💕❤️.",
    "You are meraa chotuu sa bacchaa and no matter how old we get you will always remain my chotuuubaby 💖.",
    "I love you so much, Gudiyaa ❤️ You are my everything, forever & always ❤️."
  ];

  const longMessage = `
My pyariii Gudiyaa 💕 
From the moment we met I somehow knew in my heart that youuu are the one...
`;

  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400", size: 25 },
    { symbol: "🧿", color: "text-blue-500", size: 30 }
  ];

  // Generate medium density stars
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 33, // top 1/3 for night
    size: 1 + Math.random() * 2,
    blink: 0.5 + Math.random() * 1.5
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden font-poppins">
      {/* Night overlay */}
      {isNight && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-transparent to-transparent z-0">
          {/* Full Moon */}
          <motion.div
            className="absolute top-12 left-10 w-24 h-24 rounded-full bg-yellow-200 shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Stars */}
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
                width: `${star.size}px`,
                height: `${star.size}px`
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: star.blink,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.1
              }}
            />
          ))}
          {/* Shooting Star */}
          <AnimatePresence>
            {shootingStar && (
              <motion.div
                initial={{ x: -50, y: 0, opacity: 0, scale: 0.8 }}
                animate={{ x: 120, y: 150, opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute w-4 h-4 bg-red-400 rounded-full shadow-lg"
              >
                {/* Fiery trail */}
                <div className="absolute w-16 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 rounded-full blur-sm -left-14 top-1/2" />
                {/* Smoke puffs */}
                <div className="absolute w-2 h-2 bg-gray-200 rounded-full opacity-50 -left-6 top-1/2 blur-sm" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Floating emojis in pink area */}
      <div className="absolute bottom-0 w-full h-2/3 z-0">
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
      </div>

      {/* Title */}
      <motion.div className="text-center mb-8 z-10" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
        <p className="text-lg md:text-xl text-rose-600 mt-3">3 years together... and many more to come ❤️</p>
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

      {/* Envelope and scroll modals remain same */}
      {/* (You can copy your previous modal code here) */}
    </div>
  );
}
