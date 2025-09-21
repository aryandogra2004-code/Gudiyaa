import { useEffect, useState } from "react";

export default function App() {
  const [phase, setPhase] = useState("day"); // day, evening, night
  const [isRain, setIsRain] = useState(false);
  const [weatherMessage, setWeatherMessage] = useState("");

  const lat = 30.722601189215016;
  const lon = 76.79940208364674;
  const API_KEY = "8765c13fab9c81aec1a625fc94420f98";

  // Weather messages
  const weatherMessages = {
    night: "get tucked in your blanket and sleepee cozy and comfy, my Gudiyaa 🌙💖",
    day: "Goodmorningsss JAAN, wakey wakey Have Sundrrr sa dayyy ☀️💛 Drink water betuu dhoop hai 💧",
    evening: "Cozy clouds for my cutie ☁️💗",
    rainyDay: "Don't be scared mera Chotaaa sa bchaa it will go away soo soonn ☔💞",
    rainyNight: "Don't be scared mera Chotaaa sa bchaa it will go away soo soonn 🌧️✨",
  };

  // Determine phase based on current time
  const updatePhase = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) setPhase("night");
    else if (hour >= 16) setPhase("evening");
    else setPhase("day");
  };

  // Fetch weather from OpenWeatherMap
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await res.json();
      const weatherId = data.weather[0].id;
      // Rain detection (codes 500-531)
      if (weatherId >= 500 && weatherId < 600) setIsRain(true);
      else setIsRain(false);
    } catch (err) {
      console.log("Weather API error", err);
      setIsRain(false); // fallback
    }
  };

  // Update message based on phase & rain
  const updateMessage = () => {
    if (phase === "day" && isRain) setWeatherMessage(weatherMessages.rainyDay);
    else if (phase === "night" && isRain) setWeatherMessage(weatherMessages.rainyNight);
    else if (phase === "day") setWeatherMessage(weatherMessages.day);
    else if (phase === "evening") setWeatherMessage(weatherMessages.evening);
    else if (phase === "night") setWeatherMessage(weatherMessages.night);
  };

  useEffect(() => {
    updatePhase();
    fetchWeather();
    const interval = setInterval(() => {
      updatePhase();
      fetchWeather();
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateMessage();
  }, [phase, isRain]);

  // Determine CSS class for top weather blend
  const getWeatherClass = () => {
    if (phase === "day" && isRain) return "rainyDay";
    if (phase === "night" && isRain) return "rainyNight";
    if (phase === "day") return "day";
    if (phase === "evening") return "evening";
    if (phase === "night") return "night";
  };

  return (
    <div className="min-h-screen relative font-poppins">
      {/* Top weather section - one-third height */}
      <div
        className={`absolute top-0 left-0 w-full h-1/3 transition-all duration-1000 ${getWeatherClass()}`}
        style={{ backgroundSize: "cover", backgroundBlendMode: "soft-light" }}
      >
        <div className="flex items-center justify-center h-full text-white text-center text-lg font-semibold p-4 bg-black/20">
          {weatherMessage}
        </div>
      </div>

      {/* Bottom pink section */}
      <div className="absolute top-1/3 left-0 w-full h-2/3 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-200 transition-all duration-1000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-40 text-center text-rose-700">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md">💌 For My Gudiyaa 💌</h1>
        <p className="text-lg md:text-xl mt-3">3 years together... and many more to come ❤️</p>
      </div>
    </div>
  );
}
