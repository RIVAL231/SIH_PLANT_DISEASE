'use client';

import { useState } from 'react';
import './chatbot.css';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text:"", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add the user's message to the chat
      setMessages([...messages, { text: input, isBot: false }]);
      
      const userMessage = input;
      setInput(''); // Clear the input field

      try {
        // Send the user's message to the FastAPI backend
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }), // Send JSON data
        });

        const data = await response.json();

        // Add the bot's response to the chat
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
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chat-header">
            <h3>Mr.Fasal</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="chat-input" />
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
