import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isEvening, setIsEvening] = useState(false);
  const [fallingStar, setFallingStar] = useState(false);
  const [showSpecialCard, setShowSpecialCard] = useState(false);
  const [fireworks, setFireworks] = useState([]); // 🔥 Fireworks state

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

  // Determine night and evening phases
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 18 || hour < 5);
      setIsEvening(hour >= 15 && hour < 18);
    };
    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Falling star
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

  // Background style based on time
  const hour = new Date().getHours();
  const isPinkTime = hour >= 5 && hour < 15;
  const backgroundStyle = isPinkTime
    ? { background: "linear-gradient(to bottom, #fbc2eb, #fda4af)" }
    : { background: "linear-gradient(to bottom, #fbc2eb 33%, #fbc2eb 100%)" };

  // 🎇 Fireworks generator
  const triggerFireworks = () => {
    const colors = ["#fda4af", "#fbc2eb", "#ffe4e6", "#f472b6", "#facc15"];
    const shapes = ["●", "❤️", "✦"];
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      delay: i * 0.02
    }));
    setFireworks(particles);
    setTimeout(() => setFireworks([]), 1300); // remove after animation
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-start font-poppins overflow-hidden"
      style={backgroundStyle}
    >
      {/* Top 1/3 Sunset */}
      {isEvening && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500 via-red-500 to-transparent"></div>
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-yellow-400 rounded-full shadow-[0_0_40px_10px_rgba(255,200,0,0.4)]"
            animate={{ top: ["10%", "80%"] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
        </div>
      )}

      {/* Night */}
      {isNight && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0b0b3b] via-[#1c1c55] to-transparent"></div>
          <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-200 rounded-full shadow-[0_0_30px_8px_rgba(255,255,204,0.3)]">
            <div className="w-12 h-12 rounded-full bg-[#0b0b3b] absolute top-0 left-2"></div>
          </div>
          {stars.map((star, idx) => (
            <motion.div
              key={idx}
              className="absolute bg-white rounded-full"
              style={{ width: star.size, height: star.size, top: `${star.top}%`, left: `${star.left}%` }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: star.delay }}
            />
          ))}
        </div>
      )}

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

      {/* Envelope Modal */}
      <AnimatePresence>
        {open && !showScroll && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <motion.div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col items-center">
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-700">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-rose-600 text-center mb-4">My Sweetest Gudiyaa ❤️</h2>
              <motion.div key={cardIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.3 }} className="bg-rose-50 p-6 rounded-xl shadow-inner text-center text-gray-700 min-h-[120px] flex items-center justify-center">
                {cards[cardIndex]}
              </motion.div>
              <div className="flex justify-between w-full mt-6">
                <button onClick={() => setCardIndex((cardIndex - 1 + cards.length) % cards.length)} className="p-2 text-rose-500 hover:text-rose-700">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={() => setCardIndex((cardIndex + 1) % cards.length)} className="p-2 text-rose-500 hover:text-rose-700">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col items-center mt-6 cursor-pointer" onClick={() => setShowScroll(true)}>
                <p className="text-rose-600 font-semibold mb-2 text-center">Click on the heart my betuu</p>
                <motion.div className="animate-pulse" whileHover={{ scale: 1.2 }}>
                  <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Modal */}
      <AnimatePresence>
        {showScroll && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <motion.div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 flex flex-col items-center">
              <button onClick={() => setShowScroll(false)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-700">
                <X className="w-5 h-5" />
              </button>
              <p className="text-rose-600 text-lg whitespace-pre-line">{longMessage}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Clickable Pookie Card */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40">
        <motion.button
          onClick={() => {
            triggerFireworks();
            setShowSpecialCard(true);
          }}
          className="bg-rose-200 px-6 py-2 rounded-xl shadow-md text-2xl font-bold text-rose-500 hover:bg-rose-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Click me jaan 🎀
        </motion.button>
      </div>

      {/* 🎆 Fireworks Animation */}
      {fireworks.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: "50%",
            bottom: "90px",
            fontSize: "20px",
            color: p.color,
            filter: "drop-shadow(0px 0px 4px rgba(255,255,255,0.7))"
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ x: p.x * 200, y: p.y * -200, opacity: 0, rotate: 360, scale: 1.5 }}
          transition={{ duration: 1.3, delay: p.delay, ease: "ease-out" }}
        >
          {p.shape}
        </motion.div>
      ))}

      {/* Special Card */}
      <AnimatePresence>
        {showSpecialCard && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <button onClick={() => setShowSpecialCard(false)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-700">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center text-rose-600 text-lg font-semibold">
                💌 You make me say AWWW!! I loveyouuuuu soo much my pookiedookie🎀❤💌
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
