import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  const navButtons = [
    { label: "Recreation", emoji: "🎨", route: "/recreation" },
    { label: "Chatbot", emoji: "💬", route: "/chatbot" },
    { label: "Self Care", emoji: "🧘", route: "/self-care" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-white flex flex-col items-center justify-between font-sans">
      {/* Hero Section */}
      <header className="w-full text-center py-16 px-4 bg-white bg-opacity-60 backdrop-blur-md shadow-md rounded-b-[40px]">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-purple-800"
        >
          Welcome to <span className="text-indigo-600">MindCare</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg text-indigo-700 italic"
        >
          Your calm space for mental wellness 🌱
        </motion.p>
      </header>

      {/* Button Grid */}
      <main className="mt-12 flex flex-wrap justify-center gap-10 px-6">
        {navButtons.map(({ label, emoji, route }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[170px] h-[130px] bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center space-y-2 transition-all duration-300 border border-purple-200 hover:bg-purple-50"
            onClick={() => navigate(route)}
            style={{ cursor: "pointer" }}
          >
            <div className="text-4xl">{emoji}</div>
            <div className="text-md font-semibold text-purple-800">{label}</div>
          </motion.div>
        ))}
      </main>

      {/* Quote / Affirmation Section */}
      <div className="mt-16 px-6 text-center max-w-xl">
        <p className="text-lg text-purple-700 font-medium">
          “Taking care of your mind is just as important as taking care of your body.” 
        </p>
      </div>

      {/* Footer */}
      <footer className="w-full mt-16 py-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-3xl shadow-inner text-center text-sm text-indigo-700">
        © 2025 MindCare — Made with peace, patience, and 💜
      </footer>
    </div>
  );
};

export default HomePage;
