import { useState } from "react";

const contacts = [
  { name: "", role: "" },
  { name: "", role: "" },
  { name: "", role: "" },
  { name: "", role: "" },
];
function Messages() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    "Hello! How can I help you?",
    "Can you clarify your question?",
    "Looking forward to assisting you!"
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="h-screen flex bg-purple-100">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-black">AnvikshAI</h1>
        <div className="mt-4 flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded">All Messages</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Unread</button>
        </div>
        <div className="mt-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                selectedContact === contact ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              <div className="ml-2">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-white m-4 rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{selectedContact.name}</h2>
            <p className="text-sm text-gray-500">{selectedContact.role}</p>
          </div>
          <div className="w-6 h-6 bg-gray-400 rounded-full cursor-pointer"></div>
        </div>
        <div className="p-4 h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 flex">
              <div className="bg-gray-200 p-3 rounded-lg max-w-lg">
                <p>{message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Ask something more"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <button 
            onClick={sendMessage} 
            className="ml-2 bg-black text-white p-3 rounded-lg"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
export default Messages;