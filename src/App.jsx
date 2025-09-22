import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [isEvening, setIsEvening] = useState(false);

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
    <div className="min-h-screen relative flex flex-col items-center justify-start font-poppins overflow-hidden"
         style={{
           background: "linear-gradient(to bottom, #ff8c42, #ff4c29 33%, #ffccdd 100%)"
         }}>

      {/* Evening Sunset Sky */}
      {isEvening && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden pointer-events-none">
          {/* Clouds behind sun */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/50 rounded-full blur-2xl"
              style={{
                width: `${100 + i * 40}px`,
                height: `${50 + i * 20}px`,
                top: `${10 + i * 20}%`,
                left: `${i * 50}%`,
                zIndex: 1
              }}
              initial={{ x: i % 2 === 0 ? "-30%" : "120%" }}
              animate={{ x: i % 2 === 0 ? "120%" : "-30%" }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Sun */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_40px_10px_rgba(255,200,0,0.4)] z-10"
            animate={{ top: ["10%", "80%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          />

          {/* Clouds in front of sun */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/60 rounded-full blur-2xl"
              style={{
                width: `${120 + i * 30}px`,
                height: `${60 + i * 20}px`,
                top: `${15 + i * 25}%`,
                left: `${i * 40}%`,
                zIndex: 20
              }}
              initial={{ x: i % 2 === 0 ? "120%" : "-30%" }}
              animate={{ x: i % 2 === 0 ? "-30%" : "120%" }}
              transition={{ duration: 50 + i * 20, repeat: Infinity, ease: "linear" }}
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
            className={`${emoji.color} absolute pointer-events-none`}
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

      {/* Open Letter Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-6 h-6" /> Open Your Letter
      </motion.button>

      {/* Envelope & Scroll Modals are same as before */}
      {/* ... */}
    </div>
  );
}
