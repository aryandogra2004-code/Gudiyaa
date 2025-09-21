import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [phase, setPhase] = useState("pink"); // "pink", "evening", "night"
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

From the moment we met I somehow knew in my heart that youuu are the one and since that day I have not loved anyone more than you 🥺. I want to spend every single day making you feel loved and special because you deserve it and you desrveeee so much moreee, Jaan. You are my heart. No words can truly capture how much I adore you. Every day theee love grows innn my dill. I just lovee youuu soo soo much. You are my family, my comfort, my wife. We will live our whole life together just each other’s. I’ll make my girl's each and every dream come true. We will wakeee up together and wee will ninii togetherrr. Ap Meri Sanju ho aur ap mere he rahogi. I’ll never let your cutest smileee fade. when ever my bchu reads this i want you to feel that at this moment too you are in my heart.You give me so much love , you are my family my whole wide world You make me smile, you make meee happy, just ME & YOU 💟💟❤. With lotsss of loveee meriii jaannn, yourrrr babyyyy, Aruuuuuuu 💗💗💗🤭
`;

  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400", size: 25 },
    { symbol: "🧿", color: "text-blue-500", size: 30 }
  ];

  // Determine phase based on time
  useEffect(() => {
    const updatePhase = () => {
      const h = new Date().getHours();
      if (h >= 18 || h < 5) setPhase("night");
      else if (h >= 15 && h < 18) setPhase("evening"); // 3PM-6PM sunset
      else setPhase("pink"); // all other times: pink
    };
    updatePhase();
    const interval = setInterval(updatePhase, 60000);
    return () => clearInterval(interval);
  }, []);

  // Falling star
  useEffect(() => {
    if (phase !== "night") return;
    const interval = setInterval(() => {
      setFallingStar(true);
      setTimeout(() => setFallingStar(false), 1500);
    }, 10000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [phase]);

  const stars = [...Array(30)].map((_, i) => ({
    top: Math.random() * 33,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-b from-pink-200 via-pink-300 to-rose-200 font-poppins overflow-hidden">

      {/* Background / Sky Top */}
      <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">

        {/* Pink Background */}
        {phase === "pink" && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-200 via-pink-300 to-rose-200"></div>
        )}

        {/* Sunset / Evening Effect */}
        {phase === "evening" && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ff7f50] via-[#ff4500] to-transparent transition-colors duration-1000"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-orange-400 rounded-full shadow-[0_0_50px_15px_rgba(255,140,0,0.5)]"></div>
            {[...Array(5)].map((_, i) => {
              const top = Math.random() * 20 + 5;
              const left = Math.random() * 100;
              const speed = Math.random() * 5 + 1;
              return (
                <motion.div
                  key={i}
                  className="absolute w-20 h-12 bg-white/70 rounded-full shadow-lg"
                  style={{ top: `${top}%`, left: `${left}%` }}
                  animate={{ x: [0, 100] }}
                  transition={{ repeat: Infinity, duration: speed, ease: "linear", repeatType: "loop", delay: i }}
                />
              );
            })}
          </>
        )}

        {/* Night Effect */}
        {phase === "night" && (
          <>
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
          </>
        )}
      </div>

      {/* Floating Emojis */}
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

      {/* Title */}
      <motion.div className="text-center mt-40 mb-8 z-10 relative" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
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

      {/* Text below Open Letter */}
      <p className="text-lg md:text-xl text-rose-600 mt-3 mb-8 z-10 text-center">
        3 years together... and many more to come ❤️
      </p>

      {/* Envelope Modal and Scroll Modal remain unchanged */}
      {/* ... your existing envelope and scroll modal code ... */}
    </div>
  );
}
