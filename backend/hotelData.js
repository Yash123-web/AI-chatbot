const hotelData = {
  rooms: [
    { type: "Deluxe", price: "₹2500/night", features: "AC, WiFi, City View" },
    { type: "Premium", price: "₹4000/night", features: "AC, Mini Bar, Balcony" },
    { type: "Suite", price: "₹6500/night", features: "King Bed, Bathtub, Garden View" }
  ],
  amenities: [
    "Free High-speed WiFi",
    "24/7 Gym",
    "Outdoor Swimming Pool",
    "Luxury Spa",
    "Multi-cuisine Restaurant",
    "Free Parking"
  ],
  offers: [
    "20% off on weekend stays",
    "Honeymoon package: 25% discount + Free Spa session"
  ]
};

const getHotelData = () => {
  return hotelData;
};

module.exports = { getHotelData }; 