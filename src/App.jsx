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
  const [waterDroplets, setWaterDroplets] = useState([]);

  const API_KEY = "YOUR_OPENWEATHER_API_KEY";
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

  // Fetch weather
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
          const timeout = setTimeout(() => setRain(false), 2 * 60 * 60 * 1000);
          setRainTimeout(timeout);
        }
      } catch (e) {
        console.error("Weather API error", e);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000);
    return () => clearInterval(interval);
  }, []);

  // Water droplet generation
  useEffect(() => {
    if (!rain) return setWaterDroplets([]);
    const generateDroplet = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const left = Math.random() * 100;
      const speed = 2 + Math.random() * 2; // unique speed
      setWaterDroplets(prev => [...prev, { id, left, speed }]);
      setTimeout(() => {
        setWaterDroplets(prev => prev.filter(d => d.id !== id));
      }, 8000);
    };
    const interval = setInterval(() => {
      if (waterDroplets.length < 20) generateDroplet();
    }, 500);
    return () => clearInterval(interval);
  }, [rain, waterDroplets]);

  // Messages based on phase/weather
  const getMessage = () => {
    if (rain && phase === "night") return "Don't be scared mera Chotaaa sa bchaa it will go away soo soonn 🌧️✨";
    if (rain && phase === "day") return "Don't be scared mera Chotaaa sa bchaa it will go away soo soonn ☔💞";
    if (phase === "night") return "get tucked in your blanket and sleepee cozy and comfy, my Gudiyaa 🌙💖";
    if (phase === "day") return "Goodmorningsss JAAN, wakey wakey Have Sundrrr sa dayyy , dhoop hai thodu sa panii pelooo jaan ☀️💛";
    if (phase === "evening") return "Cozy clouds for my cutie ☁️💗";
    return "";
  };

  const clouds = [...Array(5)].map((_, i) => ({
    top: Math.random() * 20 + 5,
    left: Math.random() * 100,
    speed: Math.random() * 5 + 1
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start font-poppins overflow-hidden bg-pink-200">

      {/* Toggle Rain Button */}
      <motion.button
        onClick={() => setRain(!rain)}
        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md z-50 text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Toggle Rain
      </motion.button>

      {/* Weather Top 1/3 */}
      <div className="absolute top-0 left-0 w-full h-1/3 z-0 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full transition-colors duration-1000
          ${phase==="night" ? "bg-gradient-to-b from-[#0b0b3b] via-[#1c1c55] to-transparent" : ""}
          ${phase==="day" && !rain ? "bg-gradient-to-b from-[#87CEFA] via-[#B0E0E6] to-transparent" : ""}
          ${phase==="evening" && !rain ? "bg-gradient-to-b from-[#f0e68c] via-[#d3d3d3] to-transparent" : ""}
          ${rain ? "bg-gradient-to-b from-[#a0a0a0] via-[#b0b0b0] to-transparent" : ""}
        `}></div>

        {/* Sun */}
        {phase === "day" && !rain && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-300 shadow-[0_0_30px_10px_rgba(255,255,150,0.5)]">
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
      </div>

      {/* Water droplets */}
      {rain && waterDroplets.map(drop => (
        <motion.div key={drop.id} className="absolute text-xl" 
          style={{ left: `${drop.left}%`, top: "-5%" }}
          animate={{ y: "110%" }}
          transition={{ duration: drop.speed, ease: "linear" }}
        >
          💧
        </motion.div>
      ))}

      {/* Floating emojis */}
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

      {/* Title & Open Letter Button with Umbrella */}
      <motion.div className="text-center mt-40 mb-8 z-10 relative" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
        <p className="text-lg md:text-xl text-rose-600 mt-3">
          3 years together... and many more to come ❤️
        </p>

        {/* Umbrella */}
        <div className="relative mt-6 inline-block">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">☂️</div>
          <motion.button
            onClick={() => setOpen(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-6 h-6" /> Open Your Letter
          </motion.button>
        </div>
      </motion.div>

      {/* ... Keep your modal system unchanged ... */}
      {/* Envelope Modal & Scroll Modal same as previous code, copy/paste from working version */}
    </div>
  );
}
