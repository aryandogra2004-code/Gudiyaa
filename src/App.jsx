import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const canvasRef = useRef(null);
  const [isNight, setIsNight] = useState(false);

  const cards = [
    "You are my tiny baby, my little girl 💕. Every day waking up to your Morningssssweetyyy is the sweetest morning I can have.",
    "I love your sundrrrrr voice, your cutuuuu laugh. Onlyyyy you can make my heart melt everyday ✨.",
    "3 years together and still counting… I want to spend forever with you 💍💕💕💕❤️.",
    "You are meraa chotuu sa bacchaa and no matter how old we get you will always remain my chotuuubaby 💖.",
    "I love you so much, Gudiyaa ❤️ You are my everything, forever & always ❤️."
  ];

  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400", size: 25 },
    { symbol: "🧿", color: "text-blue-500", size: 30 }
  ];

  // Night / Day check
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) {
      setIsNight(true);
    } else {
      setIsNight(false);
    }
  }, []);

  // Night Sky Canvas with Full Moon & Stars
  useEffect(() => {
    if (!isNight) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 3;

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      opacity: Math.random(),
      delta: Math.random() * 0.01 + 0.005 // slower twinkle
    }));

    function draw() {
      // Gradient background: night blending to pink
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(20,15,35,0.9)"); // top night
      gradient.addColorStop(1, "rgba(255,182,193,0.8)"); // soft pink
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Full Moon
      ctx.save();
      ctx.translate(120, 120); // position moon
      const moonGradient = ctx.createRadialGradient(0, 0, 20, 0, 0, 70);
      moonGradient.addColorStop(0, "rgba(255,255,240,0.95)");
      moonGradient.addColorStop(1, "rgba(245,245,245,0.3)");
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle crater effect
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 40;
        const craterX = Math.cos(angle) * rad;
        const craterY = Math.sin(angle) * rad;
        ctx.arc(craterX, craterY, Math.random() * 6 + 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,200,200,0.2)";
        ctx.fill();
      }
      ctx.restore();

      // Stars
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.opacity += s.delta;
        if (s.opacity > 1) s.opacity = 0;
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, [isNight]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center font-poppins">

      {/* Night Sky Canvas */}
      {isNight && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-1/3 z-0 pointer-events-none"
        />
      )}

      {/* Pink background for bottom 2/3 with slightly darker shade */}
      <div className="absolute top-1/3 w-full h-2/3 bg-gradient-to-b from-pink-300 via-pink-400 to-pink-300 z-0" />

      {/* Floating emojis (bottom 2/3) */}
      {[...Array(25)].map((_, i) => {
        const emoji = i % 2 === 0 ? floatingEmojis[0] : floatingEmojis[1];
        return (
          <motion.div
            key={i}
            className={`${emoji.color} absolute`}
            style={{
              top: `${Math.random() * 66 + 33}%`, // bottom 2/3 only
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

      {/* Title and main content */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
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

      {/* Add your envelope modals code below */}
    </div>
  );
}
