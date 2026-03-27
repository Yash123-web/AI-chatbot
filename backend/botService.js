import { io } from "socket.io-client";

// The gateway address from your logs
const OPENCLAW_URL = "http://127.0.0.1:18789"; 

const socket = io(OPENCLAW_URL, {
  // Use the token you set during 'onboard'
  auth: { token: "my_hotel_secret_123" } 
});

socket.on("connect", () => console.log("🏨 Hotel Bot linked to OpenClaw Gateway"));

export const sendMessageToAI = (text) => {
  return new Promise((resolve) => {
    socket.emit("message", { text }, (res) => {
      resolve(res.text);
    });
  });
};