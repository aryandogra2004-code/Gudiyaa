import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

// Google Fonts: add in index.html
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

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

  const longMessage = `
My pyariii Gudiyaa 💕 

From the moment we met I somehow knew in my heart that youuu are the one and since that day I have not loved anyone more than you 🥺...
  `;

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

  // Shooting Star / Meteor logic
  useEffect(() => {
    if (!isNight) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 3;

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      opacity: Math.random(),
      delta: Math.random() * 0.02 + 0.01
    }));

    let meteor = null;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "rgba(20,15,35,0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Moon
      ctx.save();
      ctx.translate(100, 100);
      const moonGradient = ctx.createRadialGradient(0, 0, 20, 0, 0, 60);
      moonGradient.addColorStop(0, "rgba(255,255,240,0.9)");
      moonGradient.addColorStop(1, "rgba(255,255,255,0.3)");
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();
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

      // Meteor
      if (!meteor && Math.random() < 0.005) {
        meteor = {
          x: Math.random() * canvas.width * 0.7 + canvas.width * 0.1,
          y: 0,
          angle: Math.PI / 3, // semi-arc trajectory
          speed: 8,
          trail: []
        };
      }

      if (meteor) {
        meteor.trail.push({ x: meteor.x, y: meteor.y });
        if (meteor.trail.length > 20) meteor.trail.shift();

        // Draw fiery trail
        for (let i = 0; i < meteor.trail.length; i++) {
          const t = meteor.trail[i];
          ctx.beginPath();
          ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,${150 - i * 6},0,${0.5 - i * 0.02})`; // fiery color
          ctx.fill();
        }

        // Meteor
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Tiny smoke
        ctx.fillStyle = "rgba(200,200,200,0.2)";
        ctx.beginPath();
        ctx.arc(meteor.x - 5, meteor.y + 5, 3, 0, Math.PI * 2);
        ctx.fill();

        // Update position semi-circle type
        meteor.x += meteor.speed * Math.cos(meteor.angle);
        meteor.y += meteor.speed * Math.sin(meteor.angle);

        if (meteor.y > canvas.height || meteor.x > canvas.width) {
          meteor = null;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }, [isNight]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 p-6 overflow-hidden font-poppins">

      {/* Night Sky Canvas */}
      {isNight && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-1/3 z-0 pointer-events-none"
        />
      )}

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

      {/* Title */}
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

      {/* The rest of your envelope modals code stays unchanged */}
    </div>
  );
}
