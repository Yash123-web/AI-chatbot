import { io } from "socket.io-client";

// This matches the port and token you set in your config or CLI
const MOLT_GATEWAY_URL = "http://localhost:18789";
const MOLT_TOKEN = "my_hotel_secret_123"; 

const socket = io(MOLT_GATEWAY_URL, {
  auth: { token: MOLT_TOKEN },
  reconnection: true,
});

socket.on("connect", () => {
  console.log("✅ Connected to Moltbot AI Gateway");
});

socket.on("connect_error", (err) => {
  console.error("❌ Moltbot Connection Error. Is the gateway running?", err.message);
});

/**
 * Sends a message to the AI and returns the response.
 * @param {string} userMessage - The guest's inquiry.
 * @returns {Promise<string>} - The AI's response.
 */
export const askHotelBot = (userMessage) => {
  return new Promise((resolve, reject) => {
    if (!socket.connected) {
      reject("AI Gateway is offline.");
      return;
    }

    // Moltbot expects a 'message' event with a text property
    socket.emit("message", { text: userMessage }, (response) => {
      if (response && response.text) {
        resolve(response.text);
      } else {
        resolve("I'm sorry, I'm having trouble thinking right now.");
      }
    });
  });
};