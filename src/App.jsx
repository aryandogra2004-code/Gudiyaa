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

        {/* Hidden clickable cloud */}
        <motion.div
          onClick={() => setCloudClicked(true)}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-52 h-32 bg-yellow-300 rounded-full cursor-pointer flex items-center justify-center shadow-lg z-20"
          whileHover={{ scale: 1.1 }}
          animate={cloudClicked ? { scale: [1, 1.5, 0], rotate: [0, 15, -15, 0], opacity: [1, 1, 0] } : { scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {!cloudClicked && <p className="text-rose-700 font-bold text-lg">Click me ☁️</p>}
        </motion.div>

        {/* Message revealed after cloud bursts */}
        <AnimatePresence>
          {cloudClicked && (
            <motion.div
              className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl text-center text-rose-600 text-lg font-bold z-10 w-64"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Awww you clicked, <br /> YOU ARE SO CUTE!!!!
            </motion.div>
          )}
        </AnimatePresence>

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
                  className="animate-pu
