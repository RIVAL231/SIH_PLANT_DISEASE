'use client';

import { useState, useEffect, useRef } from 'react';
import './chatbot.css';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      
      const userMessage = input;
      setInput('');

      try {
        const response = await fetch('https://sih-plant-disease.onrender.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          { text: data.conversation[data.conversation.length - 1].content, isBot: true }
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prev) => [
          ...prev,
          { text: "Error: Unable to connect to the server.", isBot: true }
        ]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <button className={`chat-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat} aria-label="Toggle chat">
        <span className="chat-toggle-icon"></span>
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chat-header">
            <h3>Mr. Fasal</h3>
            <button className="close-btn" onClick={toggleChat} aria-label="Close chat">×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="send-btn" aria-label="Send message">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}