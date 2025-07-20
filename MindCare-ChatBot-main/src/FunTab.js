import React from "react";
import { Link } from "react-router-dom";

const FunTab = () => {
  return (
    <div className="text-center space-y-6">
      <h3 className="text-2xl font-bold text-purple-700">Let's have some fun 🎉</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        <Link to="/game/tictactoe">
          <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl shadow transition-all">
            🧠 Tic-Tac-Toe
          </button>
        </Link>

        <Link to="/game/memory">
          <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl shadow transition-all">
            🃏 Memory Game
          </button>
        </Link>

        <Link to="/tool/breathe">
          <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl shadow transition-all">
            🌬️ Breathing Bubble
          </button>
        </Link>

        <Link to="/tool/moodlift">
          <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl shadow transition-all">
            😊 Mood Lifter
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FunTab;
