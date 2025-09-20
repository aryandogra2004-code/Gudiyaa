import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [cloudClicked, setCloudClicked] = useState(false);

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

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 p-6 overflow-hidden font-poppins">

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
        className="text-center mb-8 z-10 relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md relative z-10">
          💌 For My Gudiyaa 💌
        </h1>

        {/* Cloud */}
        <div className="relative w-full h-32 mt-6 flex justify-center">
          <AnimatePresence>
            {!cloudClicked && (
              <motion.div
                key="cloud"
                onClick={() => setCloudClicked(true)}
                className="relative w-52 h-32 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                {/* Cloud shape using circles */}
                <div className="absolute bg-yellow-300 rounded-full w-24 h-24 -left-4 top-0 shadow-lg"></div>
                <div className="absolute bg-yellow-300 rounded-full w-28 h-28 left-12 top-0 shadow-lg"></div>
                <div className="absolute bg-yellow-300 rounded-full w-32 h-32 left-6 top-4 shadow-lg"></div>
                <div className="absolute bg-yellow-300 rounded-full w-36 h-36 left-0 top-8 shadow-lg"></div>
                <p className="absolute w-full text-center top-10 text-rose-700 font-bold text-lg z-10">Click me ☁️</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Revealed message + raining hearts */}
          {cloudClicked && (
            <>
              <motion.div
                className="absolute top-0 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl text-center text-rose-600 text-lg font-bold w-64 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Awww you clicked, <br /> YOU ARE SO CUTE!!!!
              </motion.div>

              {/* Raining hearts */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-red-500 text-xl"
                  style={{
                    left: `${Math.random() * 200}px`,
                    top: `-20px`
                  }}
                  animate={{ y: 300 + Math.random() * 300, x: Math.random() * 50 - 25 }}
                  transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: i * 0.1 }}
                >
                  ❤️
                </motion.div>
              ))}
            </>
          )}
        </div>

        <p className="text-lg md:text-xl text-rose-600 mt-6">
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

      {/* Envelope and scroll modals remain same */}
    </div>
  );
}
