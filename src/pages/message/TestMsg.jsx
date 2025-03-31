import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const TestMsg = () => {
  const { id } = useParams();
  const [clientId, setClientId] = useState("user");
  const [receiverId, setReceiverId] = useState(id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const connectWebSocket = () => {
    if (!clientId) {
      alert("Enter your client ID!");
      return;
    }
    const ws = new WebSocket(`ws://127.0.0.1:8000/mentor/ws/${clientId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    setSocket(ws);
  };

  const sendMessage = () => {
    if (socket && receiverId && message) {
      const messageData = JSON.stringify({ receiver_id: receiverId, message });
      socket.send(messageData);
      setMessage("");
    } else {
      alert("Enter receiver ID and message!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WebSocket Chat</h2>
      <input
        type="text"
        placeholder="Enter your client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />
      <button onClick={connectWebSocket}>Connect</button>

      <hr />

      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <hr />

      <h3>Messages</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender_id}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestMsg;
