import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("");
  const [replyStyle, setReplyStyle] = useState("");
  const [responseType, setResponseType] = useState("");
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (customMessage = null) => {
    const inputMessage = customMessage || message;
    if (!inputMessage.trim()) return;

    const userMessage = { sender: "user", text: inputMessage };
    setChatLog([...chatLog, userMessage]);
    setMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "dolphin-phi",
          prompt: `[INST] <<SYS>>
You are MindCare, a mental health assistant. Follow these rules:
1. User mood: ${mood}
2. Response style: ${replyStyle}
3. Support type: ${responseType}
4. Never diagnose - only provide supportive guidance
<</SYS>>

${inputMessage} [/INST]`,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 150
          }
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      setChatLog(prev => [...prev, {
        sender: "bot",
        text: data.response,
        mood,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (err) {
      console.error('API Error:', err);
      setError("Failed to get response. Please try again.");
      setChatLog(prev => [...prev, {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting. Please check if Ollama is running."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isLoading) handleSend();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [message, isLoading]);

  const glossyBtn = (label, onClick) => (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.08 }}
      style={{
        background: "linear-gradient(to bottom, #6ea8fe, #3b5bdb)",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "20px",
        padding: "16px 32px",
        borderRadius: "9999px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.2), inset 0 -4px 8px rgba(255,255,255,0.3)",
        border: "2px solid #00000030",
        margin: "12px",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );

  const fadeTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.6 }
  };

  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'harm myself'];
  const isCrisis = chatLog.some(msg =>
    msg.sender === "user" &&
    crisisKeywords.some(word => msg.text.toLowerCase().includes(word.toLowerCase()))
  );

  return (
    <div style={{ background: "linear-gradient(to bottom right, #eff6ff, #ffffff)", minHeight: "100vh", textAlign: "center", fontFamily: "sans-serif", overflowY: "auto" }}>
      <header style={{ backgroundColor: "#bfdbfe", padding: "3rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "0 0 60px 60px", margin: "0 2rem" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: "bold", color: "#1e3a8a" }}>MindCare</h1>
        <p style={{ color: "#1e40af", fontSize: "1.25rem" }}>Your journey to mental wellness starts here</p>
      </header>

      <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section key="step1" {...fadeTransition} style={{ minHeight: "75vh", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: "3rem", fontWeight: "700", margin: "2rem 0", color: "#1e3a8a" }}>
                How's your mood today?
              </h2>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem" }}>
                {glossyBtn("Happy", () => { setMood("Happy"); setStep(2); })}
                {glossyBtn("Sad", () => { setMood("Sad"); setStep(2); })}
                {glossyBtn("Moderate", () => { setMood("Moderate"); setStep(2); })}
              </div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section key="step2" {...fadeTransition} style={{ minHeight: "75vh", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "600", marginBottom: "2rem", color: "#1e3a8a" }}>
                How do you want your reply to be?
              </h2>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem" }}>
                {glossyBtn("General", () => { setReplyStyle("General"); setStep(3); })}
                {glossyBtn("Motivational", () => { setReplyStyle("Motivational"); setStep(3); })}
                {glossyBtn("Empathetic", () => { setReplyStyle("Empathetic"); setStep(3); })}
              </div>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section key="step3" {...fadeTransition} style={{ minHeight: "75vh", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "600", marginBottom: "2rem", color: "#1e3a8a" }}>
                What kind of support are you looking for?
              </h2>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem" }}>
                {glossyBtn("Advice", () => { setResponseType("Advice"); setStep(4); })}
                {glossyBtn("Mental Clarity", () => { setResponseType("Mental Clarity"); setStep(4); })}
                {glossyBtn("Just Listen", () => { setResponseType("Just Listen"); setStep(4); })}
              </div>
            </motion.section>
          )}

          {step === 4 && (
            <motion.section key="step4" {...fadeTransition} style={{ marginTop: "2rem", textAlign: "left", background: "linear-gradient(to top right, #dbeafe, #ffffff, #eff6ff)", borderRadius: "1rem", padding: "2rem" }}>
              <div style={{
                backgroundColor: "#e0ecff",
                padding: "0.5rem 1rem",
                borderRadius: "2rem",
                fontWeight: "500",
                fontSize: "1rem",
                color: "#1e3a8a",
                marginBottom: "1rem",
                display: "inline-block"
              }}>
                Mood: {mood} | Style: {replyStyle} | Support: {responseType}
              </div>

              {isCrisis && (
                <div style={{
                  backgroundColor: '#fee2e2',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  borderLeft: '4px solid #dc2626'
                }}>
                  <h4 style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>Important Resources</h4>
                  <p>Please contact crisis support: 988 (US) or 116 123 (UK)</p>
                </div>
              )}

              <div style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "1rem",
                height: "24rem",
                overflowY: "auto",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderRadius: "0.75rem",
                marginBottom: "1rem",
                border: "1px solid #bfdbfe"
              }}>
                {chatLog.map((msg, i) => (
                  <div key={i} style={{
                    marginBottom: "0.5rem",
                    textAlign: msg.sender === "user" ? "right" : "left",
                    display: 'flex',
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: msg.sender === 'user' ? '#3b82f6' : '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {msg.sender === 'user' ? 'Y' : 'M'}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: "0.5rem 1rem",
                      borderRadius: msg.sender === "user" ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
                      backgroundColor: msg.sender === "user" ? "#dbeafe" : "#bfdbfe",
                      color: msg.sender === "user" ? "#1e3a8a" : "#1e40af",
                      maxWidth: '70%',
                      wordBreak: 'break-word'
                    }}>
                      {msg.text}
                      <div style={{
                        fontSize: '0.7rem',
                        color: msg.sender === 'user' ? '#1e3a8a80' : '#1e40af80',
                        marginTop: '4px',
                        textAlign: 'right'
                      }}>
                        {msg.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: "0.5rem 1rem",
                      borderRadius: "1rem 1rem 1rem 0",
                      backgroundColor: "#bfdbfe",
                      color: "#1e40af"
                    }}>
                      <div className="dot-flashing"></div>
                      <span>Typing</span>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderTopLeftRadius: "9999px",
                    borderBottomLeftRadius: "9999px",
                    border: "1px solid #93c5fd",
                    outline: "none",
                    opacity: isLoading ? 0.7 : 1
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !message.trim()}
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderTopRightRadius: "9999px",
                    borderBottomRightRadius: "9999px",
                    border: "none",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    opacity: isLoading || !message.trim() ? 0.5 : 1,
                    cursor: isLoading || !message.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>

              {/* Quick-select message chips */}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {["I'm feeling overwhelmed", "Can I get some clarity?", "I need motivation", "Just need someone to listen"].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(preset)}
                    style={{
                      backgroundColor: "#e0ecff",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "0.5rem 1rem",
                      color: "#1e3a8a",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {error && (
                <div style={{
                  color: '#ef4444',
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ backgroundColor: "#bfdbfe", textAlign: "center", padding: "2rem", marginTop: "6rem", color: "#1e3a8a", borderRadius: "60px 60px 0 0", margin: "4rem 2rem 0" }}>
        &copy; 2025 MindCare. All rights reserved.
      </footer>

      {/* Typing dots animation CSS */}
      <style>{`
        .dot-flashing {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #1e40af;
          color: #1e40af;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% { opacity: 1; }
          50% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
