import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [phase, setPhase] = useState("day"); // day, evening, night
  const [rain, setRain] = useState(false);
  const [rainTimeout, setRainTimeout] = useState(null);
  const [fallingStar, setFallingStar] = useState(false);

  const API_KEY = "8765c13fab9c81aec1a625fc94420f98";
  const LAT = 30.722601189215016;
  const LON = 76.79940208364674;

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

  // Stars for night
  const stars = [...Array(30)].map((_, i) => ({
    top: Math.random() * 33,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3
  }));

  // Determine phase based on time
  useEffect(() => {
    const updatePhase = () => {
      const h = new Date().getHours();
      if (h >= 18 || h < 5) setPhase("night");
      else if (h >= 16) setPhase("evening");
      else setPhase("day");
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

  // Check weather every minute
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data.weather[0].main === "Rain") {
          setRain(true);
          if (rainTimeout) clearTimeout(rainTimeout);
          const timeout = setTimeout(() => setRain(false), 2 * 60 * 60 * 1000); // 2 hours
          setRainTimeout(timeout);
        } else setRain(false);
      } catch (e) {
        console.error("Weather API error", e);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000);
    return () => clearInterval(interval);
  }, []);

  // Messages based on phase/weather
  const getMessage = () => {
    if (rain && phase === "night") return "Don't be scared mera Chotaaa sa bchaa it will go away soo soonn 🌧️✨";
    if (rain && phase === "day") return "Don't be scared mera Chotaaa sa bchaa it will go away soo soonn ☔💞";
    if (phase === "night") return "get tucked in your blanket and sleepee cozy and comfy, my Gudiyaa 🌙💖";
    if (phase === "day") return "Goodmorningsss JAAN, wakey wakey Have Sundrrr sa dayyy , dhoop hai thodu sa panii pelooo jaan ☀️💛";
    if (phase === "evening") return "Cozy clouds for my cutie ☁️💗";
    return "";
  };

  // Cloud and sun positions
  const clouds = [...Array(5)].map((_, i) => ({
    top: Math.random() * 20 + 5,
    left: Math.random() * 100,
    speed: Math.random() * 5 + 1
  }));

  const raindrops = [...Array(100)].map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 2,
    length: 5 + Math.random() * 10
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start font-poppins overflow-hidden bg-pink-200">

      {/* Weather Top 1/3 */}
      <div className="absolute top-0 left-0 w-full h-1/3 z-0 overflow-hidden">
        {/* Background gradient based on phase */}
        <div className={`absolute top-0 left-0 w-full h-full transition-colors duration-1000
          ${phase==="night" ? "bg-gradient-to-b from-[#0b0b3b] via-[#1c1c55] to-transparent" : ""}
          ${phase==="day" && !rain ? "bg-gradient-to-b from-[#87CEFA] via-[#B0E0E6] to-transparent" : ""}
          ${phase==="evening" && !rain ? "bg-gradient-to-b from-[#f0e68c] via-[#d3d3d3] to-transparent" : ""}
          ${rain ? "bg-gradient-to-b from-[#a0a0a0] via-[#b0b0b0] to-transparent" : ""}
        `}></div>

        {/* Sun */}
        {phase === "day" && !rain && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-300 shadow-[0_0_30px_10px_rgba(255,255,150,0.5)]">
            {/* Rays */}
            <div className="absolute top-0 left-0 w-full h-full rounded-full animate-pulse opacity-50 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200"></div>
          </div>
        )}

        {/* Clouds */}
        {(phase === "day" || phase === "evening") && !rain && clouds.map((cloud, i) => (
          <motion.div key={i} className="absolute w-20 h-12 bg-white/70 rounded-full shadow-lg" 
            style={{ top: `${cloud.top}%`, left: `${cloud.left}%` }}
            animate={{ x: [0, 100] }}
            transition={{ repeat: Infinity, duration: cloud.speed, ease: "linear", repeatType: "loop", delay: i }}
          />
        ))}

        {/* Moon & Stars */}
        {phase === "night" && !rain && (
          <>
            <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-200 rounded-full shadow-[0_0_30px_8px_rgba(255,255,204,0.3)]">
              <div className="w-12 h-12 rounded-full bg-[#0b0b3b] absolute top-0 left-2"></div>
            </div>
            {stars.map((star, i) => (
              <motion.div key={i} className="absolute bg-white rounded-full"
                style={{ width: star.size, height: star.size, top: `${star.top}%`, left: `${star.left}%` }}
                animate={{ opacity: [0,1,0] }}
                transition={{ duration: 1 + Math.random()*2, repeat: Infinity, delay: star.delay }}
              />
            ))}
            <AnimatePresence>
              {fallingStar && (
                <motion.div className="absolute bg-white w-1 h-1 rounded-full shadow-lg"
                  initial={{ top: "5%", left: "0%" }}
                  animate={{ top: "25%", left: "100%", scale: 1 }}
                  exit={{ opacity:0 }}
                  transition={{ duration:1.5, ease:"easeInOut" }}
                />
              )}
            </AnimatePresence>
          </>
        )}

        {/* Rain */}
        {rain && raindrops.map((drop, i) => (
          <motion.div key={i} className="absolute w-[2px] bg-blue-400 rounded-full" 
            style={{ left: `${drop.left}%`, top: "-5%", height: `${drop.length}px` }}
            animate={{ y: ["-5%", "105%"] }}
            transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: drop.delay }}
          />
        ))}

        {/* Weather Message */}
        <div className="absolute bottom-2 w-full text-center text-white text-sm drop-shadow-lg px-4">
          {getMessage()}
        </div>
      </div>

      {/* Floating emojis bottom 2/3 */}
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
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col items-center" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-700">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-rose-600 text-center mb-4">My Sweetest Gudiyaa ❤️</h2>

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
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 flex flex-col items-center" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <button onClick={() => setShowScroll(false)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-700">
                <X className="w-5 h-5" />
              </button>
              <div className="bg-white p-6 rounded-xl shadow-inner border border-pink-200 w-full relative overflow-auto max-h-[80vh] max-w-full">
                <div className="absolute top-0 left-0 right-0 flex justify-between p-2 text-pink-400 font-bold text-xl">
                  <div>🎀🌸</div>
                  <div>🌸🎀</div>
                </div>
                <pre className="whitespace-pre-wrap text-center text-rose-600 text-base font-poppins min-w-[600px]">{longMessage}</pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
