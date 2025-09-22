import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isSunset, setIsSunset] = useState(false);
  const [fallingStar, setFallingStar] = useState(false);

  const cards = [
    "You are my tiny baby, my little girl 💕. Every day waking up to your Morningssssweetyyy is the sweetest morning I can have.",
    "I love your sundrrrrr voice, your cutuuuu laugh. Onlyyyy you can make my heart melt everyday ✨.",
    "3 years together and still counting… I want to spend forever with you 💍💕💕💕❤️.",
    "You are meraa chotuu sa bacchaa and no matter how old we get you will always remain my chotuuubaby 💖.",
    "I love you so much, Gudiyaa ❤️ You are my everything, forever & always ❤️."
  ];

  const longMessage = `
My pyariii Gudiyaa 💕 

From the moment we met I somehow knew in my heart that youuu are the one and since that day I have not loved anyone more than you 🥺. I want to spend every single day making you feel loved and special because you deserve it and you desrveeee so much moreee, Jaan. You are my heart. No words can truly capture how much I adore you. Every day theee love grows innn my dill. I just lovee youuu soo soo much. You are my family, my comfort, my wife. We will live our whole life together just each other’s. I’ll make my girl's each and every dream come true. We will wakeee up together and wee will ninii togetherrr. Ap Meri Sanju ho aur ap mere he rahogi. I’ll never let your cutest smileee fade. You make me smile, you make meee happy, just ME & YOU 💟💟❤. With lotsss of loveee meriii jaannn, yourrrr babyyyy, Aruuuuuuu 💗💗💗🤭
`;

  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400", size: 25 },
    { symbol: "🧿", color: "text-blue-500", size: 30 }
  ];

  // Night / Sunset effect based on time
  useEffect(() => {
    const updateTime = () => {
      const h = new Date().getHours();
      setIsNight(h >= 18 || h < 5);
      setIsSunset(h >= 15 && h < 18);
    };
    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Falling star logic for night only
  useEffect(() => {
    if (!isNight) return;
    const interval = setInterval(() => {
      setFallingStar(true);
      setTimeout(() => setFallingStar(false), 1500);
    }, 10000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [isNight]);

  const stars = [...Array(30)].map((_, i) => ({
    top: Math.random() * 33,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-b from-pink-200 via-pink-300 to-rose-200 font-poppins overflow-hidden">
      
      {/* 🌅 Sunset Phase */}
      {isSunset && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
          {/* Sunset gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-400 via-orange-500 to-transparent"></div>

          {/* Sun going down */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bg-yellow-300 rounded-full shadow-[0_0_30px_10px_rgba(255,200,100,0.5)]"
            style={{ width: 60, height: 60 }}
            animate={{ top: ["10%", "70%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />

          {/* Clouds */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-70"
              style={{
                width: 100 + i * 30,
                height: 40 + i * 10,
                top: `${10 + i * 10}%`
              }}
              animate={{ x: ["100%", "-120%"] }}
              transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Birds */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{ top: `${20 + i * 15}%`, right: "-10%" }}
              animate={{ x: ["0%", "-120%"] }}
              transition={{ duration: 12 + i * 5, repeat: Infinity, ease: "linear" }}
            >
              🐦
            </motion.div>
          ))}
        </div>
      )}

      {/* 🌌 Night Phase */}
      {isNight && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0b0b3b] via-[#1c1c55] to-transparent"></div>
          {/* Moon */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-200 rounded-full shadow-[0_0_30px_8px_rgba(255,255,204,0.3)]">
            <div className="w-12 h-12 rounded-full bg-[#0b0b3b] absolute top-0 left-2"></div>
          </div>
          {/* Stars */}
          {stars.map((star, idx) => (
            <motion.div
              key={idx}
              className="absolute bg-white rounded-full"
              style={{ width: star.size, height: star.size, top: `${star.top}%`, left: `${star.left}%` }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: star.delay }}
            />
          ))}
          {/* Falling Star */}
          <AnimatePresence>
            {fallingStar && (
              <motion.div
                className="absolute bg-white w-1 h-1 rounded-full shadow-lg"
                initial={{ top: "5%", left: "0%" }}
                animate={{ top: "25%", left: "100%", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ❤️ Floating Emojis (Only in bottom pink area) */}
      {[...Array(25)].map((_, i) => {
        const emoji = i % 2 === 0 ? floatingEmojis[0] : floatingEmojis[1];
        return (
          <motion.div
            key={i}
            className={`${emoji.color} absolute`}
            style={{
              top: `${33 + Math.random() * 67}%`,
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

      {/* --- Your existing Letter UI code remains unchanged below --- */}
      {/* Title */}
      <motion.div className="text-center mt-40 mb-8 z-10 relative" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
        <p className="text-lg md:text-xl text-rose-600 mt-3">
          3 years together... and many more to come ❤️
        </p>
      </motion.div>

      {/* Open Letter */}
      <motion.button
        onClick={() => setOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-6 h-6" /> Open Your Letter
      </motion.button>

      {/* Your modal + scroll logic remains same */}
      {/* ... */}
    </div>
  );
}
