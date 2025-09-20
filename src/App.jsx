import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cloudClicked, setCloudClicked] = useState(false);
  const [showKiss, setShowKiss] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Handle cloud click
  const handleCloudClick = () => {
    if (!cloudClicked) {
      setCloudClicked(true);
      setShowKiss(true);
      // After kiss animation, show text
      setTimeout(() => {
        setShowKiss(false);
        setShowMessage(true);
      }, 1500); // kiss animation duration
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200 p-6 font-poppins">

      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>

        {/* Cloud */}
        <div className="relative w-64 h-32 mt-6 mx-auto">
          {!cloudClicked && (
            <motion.div
              className="relative w-full h-full cursor-pointer"
              onClick={handleCloudClick}
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
            >
              {/* Simple cloud using blurred white circles */}
              <div className="absolute w-24 h-24 bg-white rounded-full blur-md -left-4 top-2"></div>
              <div className="absolute w-28 h-28 bg-white rounded-full blur-md left-10 top-0"></div>
              <div className="absolute w-32 h-32 bg-white rounded-full blur-md left-6 top-6"></div>
              <div className="absolute w-36 h-36 bg-white rounded-full blur-md left-0 top-10"></div>
              <p className="absolute w-full text-center top-10 font-bold text-gray-700 text-lg z-10">
                Click me ☁️
              </p>
            </motion.div>
          )}

          {/* Kiss animation */}
          <AnimatePresence>
            {showKiss && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl text-pink-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                💋
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message after kiss */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl text-center text-rose-600 text-lg font-bold w-72"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                AWWW you clicked, <br /> YOU ARE SUCH A CUTIEEEEBB!!!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Open envelope button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-6 h-6" /> Open Your Letter
      </motion.button>

      {/* Keep your original envelope modal & scroll modal here */}
    </div>
  );
}
