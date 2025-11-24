"use client";

import Image from "next/image";

export default function HotelCard({ image, name, rating, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
      <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{name}</h3>
      <div className="flex items-center mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">★</span>
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{description}</p>
      <button className="px-4 py-2 border rounded text-gray-700 dark:text-gray-200 dark:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        Book
      </button>
    </div>
  );
}
