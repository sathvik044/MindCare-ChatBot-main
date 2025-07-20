import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'; // or './App.css' depending on your setup
import HomePage from "./HomePage";
import RecreationPage from "./RecreationPage";
import Chatbot from "./Chatbot"; // Create or import this
// import MoodDiary from "./MoodDiary"; // Assuming you have this
import BreathingBubble from "./BreathingBubble";
import SelfCarePage from './SelfCarePage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recreation" element={<RecreationPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/recreation" element={<RecreationPage />} />
        <Route path="/breathing-bubble" element={<BreathingBubble />} />
        
<Route path="/self-care" element={<SelfCarePage />} />
      </Routes>
    </Router>
  );
}

export default App;
