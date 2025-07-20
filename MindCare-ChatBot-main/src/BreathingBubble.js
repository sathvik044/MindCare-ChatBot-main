import React from "react";
import { motion } from "framer-motion";

const BreathingBubble = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col justify-center items-center px-4">
      <motion.div
        className="w-60 h-60 bg-purple-400 rounded-full shadow-lg"
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.p
        className="text-xl text-purple-800 font-medium mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Breathe in... and out...
      </motion.p>
    </div>
  );
};

export default BreathingBubble;
