"use client";

import HotelCard from "./HotelCard";



const hotels = [
  {
    image: "/hotel1.jpg", // Replace with your image path or URL
    name: "Standard Hotel Name 1",
    rating: 5,
    description: "Fusce pellentesque velit ...",
  },
  {
    image: "/hotel2.jpg",
    name: "Standard Hotel Name 2",
    rating: 4,
    description: "Fusce pellentesque velit ...",
  },
  {
    image: "/hotel3.jpg",
    name: "Standard Hotel Name 3",
    rating: 4,
    description: "Fusce pellentesque velit ...",
  },
  {
    image: "/hotel4.jpg",
    name: "Standard Hotel Name 4",
    rating: 5,
    description: "Fusce pellentesque velit ...",
  },
];

export default function HotelsSection() {
  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <span className="bg-red-600 text-white px-2 py-1 rounded">H</span> HOTELS
        </h2>
        <p className="text-gray-500 dark:text-gray-300">dont forget book your room</p>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {hotels.map((hotel, index) => (
          <HotelCard key={index} {...hotel} />
        ))}
      </div>
    </section>
  );
}
