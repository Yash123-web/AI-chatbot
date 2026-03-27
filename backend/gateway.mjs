import { Server } from 'socket.io';
import axios from 'axios';

const PORT = 18789;
const AUTH_TOKEN = "my_hotel_secret_123";

const io = new Server(PORT, {
    cors: { origin: "*" }
});

console.log("--------------------------------------------------");
console.log("🛠️ Starting Manual AI Gateway...");

io.on("connection", (socket) => {
    // Validate the token sent from server.js
    const token = socket.handshake.auth?.token || 
                  (socket.handshake.headers?.authorization && socket.handshake.headers.authorization.split(' ')[1]);
    
    if (token !== AUTH_TOKEN) {
        console.log("🚫 Connection refused: Invalid or missing Token");
        return socket.disconnect();
    }

    console.log("🔗 Connection Established: server.js is now linked!");

    // Listen for the "message" event from your server.js
    socket.on("message", async (data, callback) => {
        console.log(`🧠 AI is processing: "${data.text}"`);

        try {
            const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
                model: "google/gemini-2.0-flash-001",
                messages: [{ role: "user", content: data.text }]
            }, {
                headers: {
                    "Authorization": `Bearer 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`,
                    "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
                    "Content-Type": "application/json"
                }
            });

            const aiReply = response.data.choices[0].message.content;
            console.log("✅ AI Response generated successfully.");
            
            // Send the answer back to server.js
            callback({ text: aiReply });

        } catch (err) {
            console.error("❌ OpenRouter Error:", err.response?.data || err.message);
            callback({ text: "I'm sorry, I'm having trouble connecting to my AI brain right now." });
        }
    });

    socket.on("disconnect", () => {
        console.log("🔌 server.js disconnected from the gateway.");
    });
});

console.log(`🚀 Manual AI Gateway is ONLINE on port ${PORT}`);
console.log("--------------------------------------------------");