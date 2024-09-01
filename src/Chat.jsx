import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = ({ username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages from the server
    fetch("http://localhost:3000/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));

    // Listen for messages from the server
    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        user: username,
        message: message,
      };
      socket.emit("sendMessage", messageData);
      setMessage(""); // Clear the input field after sending the message
    }
  };

  return (
    <div>
      <div
        id="chat"
        style={{
          height: "300px",
          border: "1px solid #ccc",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.message}{" "}
            <small>({msg.timestamp})</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
