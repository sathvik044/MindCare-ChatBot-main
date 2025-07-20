// src/MoodTracker.js
import React, { useState } from "react";
import MoodChart from "./MoodChart";

const MoodTracker = () => {
  const [mood, setMood] = useState(5);
  const [data, setData] = useState([]);

  const handleAddMood = () => {
    const today = new Date().toISOString().split("T")[0];
    setData((prev) => [...prev, { date: today, mood }]);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Mood Tracker</h2>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-1/2"
        />
        <span className="text-lg font-medium">{mood}</span>
        <button
          onClick={handleAddMood}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Log Mood
        </button>
      </div>
      <MoodChart data={data} />
    </div>
  );
};

export default MoodTracker;
