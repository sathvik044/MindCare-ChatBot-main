import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = ["Relax", "Gratitude", "Fun"];
const relaxSubTabs = ["Videos", "Quotes", "Sounds"];

const RecreationPage = () => {
  const [activeTab, setActiveTab] = useState("Relax");
  const [activeRelaxTab, setActiveRelaxTab] = useState("Videos");

  const [gratitudes, setGratitudes] = useState(["", "", ""]);
  const [savedGratitudes, setSavedGratitudes] = useState(() => {
    const stored = localStorage.getItem("savedGratitudes");
    return stored ? JSON.parse(stored) : [];
  });

  const handleSaveGratitude = () => {
    if (gratitudes.some((item) => item.trim() !== "")) {
      const updatedGratitudes = [...savedGratitudes, [...gratitudes]];
      setSavedGratitudes(updatedGratitudes);
      localStorage.setItem("savedGratitudes", JSON.stringify(updatedGratitudes));
      setGratitudes(["", "", ""]);
    }
  };

  const handleClearGratitudes = () => {
    localStorage.removeItem("savedGratitudes");
    setSavedGratitudes([]);
  };

  return (
    <div className="min-h-screen bg-purple-50 px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">Recreation</h2>

      {/* Top Tabs */}
      <div className="flex justify-center mb-10 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ${
              activeTab === tab
                ? "bg-purple-600 text-white shadow"
                : "bg-purple-200 text-purple-700 hover:bg-purple-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Relax Tab Content */}
      {activeTab === "Relax" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6 space-x-4">
            {relaxSubTabs.map((subTab) => (
              <button
                key={subTab}
                onClick={() => setActiveRelaxTab(subTab)}
                className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 ${
                  activeRelaxTab === subTab
                    ? "bg-purple-500 text-white shadow"
                    : "bg-purple-200 text-purple-700 hover:bg-purple-300"
                }`}
              >
                {subTab}
              </button>
            ))}
          </div>

          {activeRelaxTab === "Videos" && (
            <div className="space-y-4 text-blue-700">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">🎥 Uplifting Videos</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a href="https://www.youtube.com/watch?v=ZToicYcHIOU" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Guided Meditation
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=inpok4MKVLM" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Box Breathing Exercise
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=2OEL4P1Rz04" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Positive Affirmations
                  </a>
                </li>
              </ul>
            </div>
          )}

          {activeRelaxTab === "Quotes" && (
            <div className="space-y-3 text-gray-700 italic">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">💬 Quotes</h3>
              <blockquote>“You don’t have to control your thoughts. You just have to stop letting them control you.” – Dan Millman</blockquote>
              <blockquote>“This too shall pass.”</blockquote>
              <blockquote>“Be kind to your mind.”</blockquote>
            </div>
          )}

          {activeRelaxTab === "Sounds" && (
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">🎶 Calming Sounds & Music</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li>
                  <a href="https://www.youtube.com/watch?v=lFcSrYw-ARY" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Rain Sounds for Sleep
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=1ZYbU82GVz4" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Relaxing Nature Ambience
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=hHW1oY26kxQ" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Lo-fi Chill Mix
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className="text-center pt-8">
            <Link to="/breathing-bubble">
              <button className="bg-purple-500 text-white px-8 py-3 rounded-full shadow hover:bg-purple-600 transition duration-300">
                Try Breathing Bubble 🫧
              </button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Gratitude Tab Content */}
      {activeTab === "Gratitude" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto space-y-6"
        >
          <h3 className="text-3xl font-bold text-purple-800 text-center mb-6">
            Gratitude Board 🙏
          </h3>

          <div className="bg-purple-100 p-6 rounded-2xl shadow-md space-y-4">
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="text"
                placeholder={`Gratitude ${index + 1}`}
                value={gratitudes[index]}
                onChange={(e) => {
                  const newGrats = [...gratitudes];
                  newGrats[index] = e.target.value;
                  setGratitudes(newGrats);
                }}
                className="w-full px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              />
            ))}

            <div className="text-center">
              <button
                onClick={handleSaveGratitude}
                className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition duration-300"
              >
                Save Gratitudes
              </button>
              <button
                onClick={handleClearGratitudes}
                className="block mx-auto mt-4 text-sm text-red-500 underline hover:text-red-700"
              >
                Clear All Saved Gratitudes
              </button>
            </div>
          </div>

          {savedGratitudes.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow space-y-3">
              <h4 className="text-xl font-semibold text-purple-700">Saved Entries:</h4>
              <ul className="text-gray-800 space-y-4">
                {savedGratitudes.map((entry, idx) => (
                  <li key={idx} className="ml-4 list-disc space-y-1">
                    {entry.map((item, i) => (
                      <p key={i}>• {item}</p>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Fun Tab Content */}
      {activeTab === "Fun" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-purple-700 text-lg mt-8"
        >
          <p>Mini games and mood boosters coming soon! 🎉</p>
        </motion.div>
      )}
    </div>
  );
};

export default RecreationPage;
