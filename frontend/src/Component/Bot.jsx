import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

// Use 127.0.0.1 directly to bypass potential local DNS issues
const BACKEND_URL = "http://127.0.0.1:5000/chat";

function Bot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessageText = input;
        
        // 1. Update UI
        setMessages(prev => [...prev, { text: userMessageText, sender: 'user' }]);
        setInput(""); 
        setLoading(true);

        try {
            // 2. The Request
            const res = await axios.post(BACKEND_URL, 
                { message: userMessageText },
                { 
                    timeout: 60000,
                    headers: { 'Content-Type': 'application/json' }
                } 
            );

            // 3. Handle successful reply
            if (res.data && res.data.reply) {
                setMessages(prev => [...prev, { text: res.data.reply, sender: 'bot' }]);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            let errorMessage = "Error: The concierge is currently offline.";
            
            // Check if backend actually replied with an error
            if (error.response) {
                errorMessage = error.response.data?.reply || "Server Error.";
            } else if (error.code === 'ECONNABORTED') {
                errorMessage = "Error: AI took too long to respond.";
            }

            setMessages(prev => [...prev, { text: errorMessage, sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#0d0d0d] text-white'>
            <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d] z-10">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <h1 className="text-lg font-bold tracking-tight text-green-500">HotelBot <span className='text-white opacity-50 font-light text-sm'>v2.0</span></h1>
                    <FaUserCircle size={30} className="text-gray-400 cursor-pointer" />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pt-20 pb-32 flex flex-col items-center">
                <div className="w-full max-w-4xl px-4 flex flex-col space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg mt-32 animate-pulse">
                            👋 Hi, I'm <span className="text-green-500 font-semibold">HotelBot</span>.<br/>
                            How can I help you today?
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`px-4 py-3 rounded-2xl max-w-[85%] md:max-w-[70%] ${
                                    msg.sender === "user"
                                        ? "bg-blue-600 self-end rounded-tr-none"
                                        : "bg-gray-800 self-start rounded-tl-none border border-gray-700"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))
                    )}
                    {loading && (
                        <div className="bg-gray-800/50 text-gray-400 px-4 py-2 rounded-xl self-start italic text-sm animate-pulse">
                            Concierge is typing...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d] p-4">
                <div className="max-w-4xl mx-auto flex items-center bg-gray-900 rounded-2xl px-4 py-2 border border-gray-700">
                    <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-white py-2"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading || !input.trim()}
                        className={`ml-2 px-5 py-2 rounded-xl font-bold ${
                            loading || !input.trim() ? "opacity-50" : "bg-green-600"
                        }`}
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Bot;