import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [phase, setPhase] = useState("day"); // day, evening, night
  const [rain, setRain] = useState(false);
  const [fallingStar, setFallingStar] = useState(false);
  const [weatherMsg, setWeatherMsg] = useState("");

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

  // Falling star for night
  useEffect(() => {
    if (phase !== "night") return;
    const interval = setInterval(() => {
      setFallingStar(true);
      setTimeout(() => setFallingStar(false), 1500);
    }, 10000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [phase]);

  // Determine time phase every minute
  useEffect(() => {
    const updatePhase = () => {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 5) setPhase("night");
      else if (hour >= 16) setPhase("evening");
      else setPhase("day");
    };
    updatePhase();
    const interval = setInterval(updatePhase, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather every minute (OpenWeatherMap)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const key = "8765c13fab9c81aec1a625fc94420f98";
        const lat = 30.722601189215016;
        const lon = 76.79940208364674;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
        const data = await res.json();
        // Rain detection (rain exists in api or snow for simplicity)
        const isRaining = data.weather.some(w => w.main.toLowerCase().includes("rain"));
        setRain(isRaining);

        // Update weather message
        if (isRaining && phase === "day") setWeatherMsg("Don't be scared mera Chotaaa sa bchaa it will go away soo soonn ☔💞");
        else if (isRaining && phase === "night") setWeatherMsg("Don't be scared mera Chotaaa sa bchaa it will go away soo soonn 🌧️✨");
        else if (phase === "night") setWeatherMsg("get tucked in your blanket and sleepee cozy and comfy, my Gudiyaa 🌙💖");
        else if (phase === "day") setWeatherMsg("Goodmorningsss JAAN, wakey wakey Have Sundrrr sa dayyy , dhoop hai thodu sa panii pelooo jaan ☀️💛");
        else if (phase === "evening") setWeatherMsg("Cozy clouds for my cutie ☁️💗");
      } catch (err) {
        console.error("Weather API error:", err);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000);
    return () => clearInterval(interval);
  }, [phase]);

  // Rain drops for animation
  const rainDrops = [...Array(50)].map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.7 + Math.random() * 0.8
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-b from-pink-200 via-pink-300 to-rose-200 font-poppins overflow-hidden">

      {/* Top 1/3 weather area */}
      <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
        {/* Background gradient blend */}
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
            {/* Falling star */}
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
        {phase === "day" && !rain && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-200 via-yellow-100 to-transparent"></div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_50px_8px_rgba(255,255,150,0.5)]"></div>
            {/* Clouds */}
            <motion.div className="absolute top-8 left-10 w-20 h-12 bg-white rounded-full opacity-80"
              animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 20 }} />
            <motion.div className="absolute top-16 left-40 w-28 h-14 bg-white rounded-full opacity-80"
              animate={{ x: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 25 }} />
          </>
        )}
        {phase === "evening" && !rain && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-200 via-orange-100 to-transparent"></div>
            {/* Sun partially hidden */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-yellow-400 rounded-full shadow-[0_0_30px_5px_rgba(255,200,150,0.5)]"></div>
            {/* Cozy clouds */}
            <motion.div className="absolute top-8 left-10 w-20 h-12 bg-white rounded-full opacity-80"
              animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 20 }} />
            <motion.div className="absolute top-16 left-40 w-28 h-14 bg-white rounded-full opacity-80"
              animate={{ x: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 25 }} />
          </>
        )}
        {/* Rain drops */}
        {rain && rainDrops.map((drop, idx) => (
          <motion.div
            key={idx}
            className="absolute w-[2px] h-6 bg-blue-400 rounded-full opacity-70"
            style={{ left: `${drop.left}%` }}
            animate={{ y: [0, 300] }}
            transition={{ duration: drop.duration, repeat: Infinity, delay: drop.delay }}
          />
        ))}
        {/* Weather message */}
        <div className="absolute bottom-2 w-full text-center text-white text-sm drop-shadow-lg">{weatherMsg}</div>
      </div>

      {/* Floating Emojis bottom 2/3 */}
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

      {/* Envelope & Scroll Modals (unchanged from your original code) */}
      {/* ... Keep all your original envelope/modal JSX here ... */}
    </div>
  );
}
