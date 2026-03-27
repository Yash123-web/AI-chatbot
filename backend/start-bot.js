const { Gateway } = require('./node_modules/moltbot/dist/index.js'); 

const bot = new Gateway({
  provider: "openrouter",
  apiKey: "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", 
  model: "google/gemini-2.0-flash-001",
  port: 18789,
  token: "my_hotel_secret_123" // <--- ADD THIS LINE
});

bot.start().then(() => {
  console.log("🚀 Hotel AI Concierge is ONLINE on port 18789");
}).catch(err => {
  console.error("❌ Failed to start the bot:", err);
});