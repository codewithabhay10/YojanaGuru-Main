import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBot.css"; // Import CSS for styling

async function getTranslation(text, lang) {
  try {
    let response = await fetch(`http://127.0.0.1:8000/${lang}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data.Translation; // Return translated text
  } catch (error) {
    console.error("Error:", error);
    return text; // Return original text if translation fails
  }
}

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(""); // Store user's selected language
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", { message: input });

      if (response.data && response.data.response) {
        let botMessageText = response.data.response;

        // If a language is selected, translate bot's response
        if (language) {
          botMessageText = await getTranslation(botMessageText, language);
        }

        const botMessage = { sender: "bot", text: botMessageText };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    }

    setLoading(false);
  };

  // Scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Language Selection */}
        {messages.length === 0 && (
          <div className="language-selection">
            <p>Select your preferred language:</p>
            <select onChange={(e) => setLanguage(e.target.value)} defaultValue="">
              <option value="" disabled>Select Language</option>
              <option value="hindi">Hindi</option>
              <option value="punjabi">Punjabi</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
              <option value="bengali">Bengali</option>
              <option value="gujrati">Gujarati</option>
            </select>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="typing-indicator">Bot is typing...</div>}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
