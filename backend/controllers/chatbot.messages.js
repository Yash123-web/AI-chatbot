import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    // Save user message
    const user = await User.create({ 
      sender: "user",
      text,
    });

    // ================= HOTEL BOT RESPONSES =================

    const botResponses = {

      // Greetings
      "hello": "Hello 👋 Welcome to Sunrise Hotel! How may I assist you today?",
      "hi": "Hi there! 😊 How can I help you with your stay?",
      "good morning": "Good morning ☀️ Welcome to Sunrise Hotel!",
      "good evening": "Good evening 🌙 How may I help you?",

      // Rooms
      "do you have rooms": "Yes, we have Deluxe, Premium, and Suite rooms available.",
      "room price": "Our prices start from ₹2500/night (Deluxe), ₹4000/night (Premium), ₹6500/night (Suite).",
      "deluxe room price": "Deluxe Room costs ₹2500 per night.",
      "suite price": "Suite Room costs ₹6500 per night.",
      "room types": "We offer Deluxe, Premium, and Suite rooms.",

      // Availability
      "check availability": "Please tell me your check-in and check-out dates.",
      "available rooms": "Currently, Deluxe and Premium rooms are available.",
      "any rooms available": "Yes, we have rooms available today.",

      // Booking
      "book a room": "Sure 😊 Please share your name, date, and room type.",
      "i want to book room": "Great! Please provide check-in date, nights, and room type.",
      "reserve room": "I can help you with reservation. Please share details.",

      // Amenities
      "amenities": "We provide Free WiFi, Swimming Pool, Gym, Spa, Restaurant, and Parking.",
      "do you have wifi": "Yes, we offer free high-speed WiFi.",
      "swimming pool": "Yes 🏊‍♂️ We have a clean swimming pool.",
      "gym": "Yes 💪 Our gym is open 24/7 for guests.",
      "spa": "Yes 🧖‍♀️ We have a luxury spa service.",

      // Food & Restaurant
      "restaurant": "We have a multi-cuisine restaurant open from 7AM to 11PM.",
      "breakfast": "Complimentary breakfast is included in most rooms.",
      "food service": "Yes, room service is available 24/7.",

      // Offers
      "offers": "🎉 Current offer: 20% off on weekend stays!",
      "discount": "You can get up to 20% discount on weekend bookings.",
      "honeymoon package": "We offer a honeymoon package with 25% discount and free spa.",

      // Location
      "location": "We are located near City Center, 5km from Railway Station.",
      "address": "Sunrise Hotel, MG Road, City Center, India.",

      // Check-in / Check-out
      "check in time": "Check-in time is 12:00 PM.",
      "check out time": "Check-out time is 11:00 AM.",

      // Contact
      "contact number": "You can contact us at +91-9876543210.",
      "phone number": "+91-9876543210",
      "email": "support@sunrisehotel.com",

      // Policies
      "cancellation policy": "Free cancellation up to 24 hours before check-in.",
      "refund policy": "Refund is processed within 5-7 working days.",

      // Help
      "help": "I can help you with booking, prices, amenities, offers, and availability.",
      "what can you do": "I can help you book rooms, check prices, show offers, and answer hotel queries.",

      // Farewell
      "bye": "Thank you for choosing Sunrise Hotel 😊 Have a great day!",
      "thank you": "You're welcome! We look forward to hosting you ❤️",

    };

    // Normalize user input
    const normalizedText = text.toLowerCase().trim();

    // Bot reply
    const botResponse =
      botResponses[normalizedText] ||
      "Sorry 😔 I didn't understand that. Please ask about rooms, booking, or amenities.";

    // Save bot message
    const bot = await Bot.create({
      sender: "bot",
      text: botResponse,
    });

    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });

  } catch (error) {
    console.log("Error in Message Controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};