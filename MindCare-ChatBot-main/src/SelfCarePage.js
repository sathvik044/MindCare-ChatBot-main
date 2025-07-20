import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SelfCarePage = () => {
  const [form, setForm] = useState({
    sleep: "",
    water: "",
    exercise: "",
  });

  const [savedPlan, setSavedPlan] = useState(null);
  const [moodEntry, setMoodEntry] = useState({ date: "", text: "" });
  const [savedMoods, setSavedMoods] = useState([]);

  // Load self-care plan and mood entries on mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("selfCarePlan");
    if (storedPlan) {
      const parsed = JSON.parse(storedPlan);
      setForm(parsed);
      setSavedPlan(parsed);
    }

    const storedMoods = localStorage.getItem("moodDiary");
    if (storedMoods) {
      setSavedMoods(JSON.parse(storedMoods));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("selfCarePlan", JSON.stringify(form));
    setSavedPlan(form);
    alert("Self-care plan saved!");
  };

  const handleMoodSave = () => {
    if (moodEntry.text.trim() === "" || moodEntry.date.trim() === "") return;

    const entry = {
      date: moodEntry.date,
      text: moodEntry.text.trim(),
    };

    const updatedMoods = [entry, ...savedMoods];
    setSavedMoods(updatedMoods);
    localStorage.setItem("moodDiary", JSON.stringify(updatedMoods));
    setMoodEntry({ date: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-purple-50 px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
        Self Care Plan
      </h2>

      {/* Self Care Plan Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-md space-y-6"
      >
        <div>
          <label className="block text-purple-700 font-semibold mb-2">
            🛌 Sleep Time:
          </label>
          <input
            type="time"
            name="sleep"
            value={form.sleep}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-purple-700 font-semibold mb-2">
            💧 Daily Water Intake (in liters):
          </label>
          <input
            type="number"
            name="water"
            value={form.water}
            onChange={handleChange}
            step="0.1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-purple-700 font-semibold mb-2">
            🏃‍♂️ Exercise Time:
          </label>
          <input
            type="text"
            name="exercise"
            value={form.exercise}
            onChange={handleChange}
            placeholder="e.g. Morning Jog, Evening Walk"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-full shadow hover:bg-purple-700 transition"
          >
            Save Plan
          </button>
        </div>
      </motion.form>

      {/* Display Saved Plan Below */}
      {savedPlan && (
        <motion.div
          className="mt-10 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            📋 Saved Self-Care Plan
          </h4>
          <p className="text-gray-700 mb-2">
            <strong>🛌 Sleep Time:</strong> {savedPlan.sleep || "Not set"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>💧 Water Intake:</strong> {savedPlan.water || "Not set"} L
          </p>
          <p className="text-gray-700">
            <strong>🏃‍♂️ Exercise Time:</strong> {savedPlan.exercise || "Not set"}
          </p>
        </motion.div>
      )}

      {/* Mood Diary Section */}
      <motion.div
        className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          📝 Mood Diary
        </h3>

        {/* Date Picker */}
        <label className="block text-purple-700 font-semibold mb-2">
          Select Date:
        </label>
        <input
          type="date"
          value={moodEntry.date}
          onChange={(e) => setMoodEntry({ ...moodEntry, date: e.target.value })}
          className="w-full p-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        />

        {/* Mood Text Input */}
        <textarea
          value={moodEntry.text}
          onChange={(e) => setMoodEntry({ ...moodEntry, text: e.target.value })}
          placeholder="Write about your mood today..."
          className="w-full p-4 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
          rows={4}
        ></textarea>

        <div className="text-center">
          <button
            onClick={handleMoodSave}
            className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition"
          >
            Save Entry
          </button>
        </div>

        {savedMoods.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              📚 Previous Entries:
            </h4>
            {savedMoods.map((entry, index) => (
              <div key={index} className="bg-purple-100 p-4 rounded-xl text-gray-700 shadow">
                <p className="text-sm text-purple-600 font-medium mb-1">{entry.date}</p>
                <p>{entry.text}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Badge Display Section */}
      <motion.div
        className="mt-16 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-purple-700 mb-8">
          🎖️ Your Progress Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-purple-800">
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <p className="text-4xl mb-2">🌟</p>
            <p className="font-semibold text-lg">3-Day Gratitude Streak</p>
            <p className="text-sm text-gray-600 mt-1">
              Keep that good energy going!
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <p className="text-4xl mb-2">🫧</p>
            <p className="font-semibold text-lg">Breathe Master</p>
            <p className="text-sm text-gray-600 mt-1">
              Completed 5 breathing sessions
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <p className="text-4xl mb-2">💧</p>
            <p className="font-semibold text-lg">Hydration Hero</p>
            <p className="text-sm text-gray-600 mt-1">
              Met water goal 3 days in a row!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SelfCarePage;
