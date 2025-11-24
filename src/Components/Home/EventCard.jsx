"use client";

import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Heart,
  Share2,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";

import { useState } from "react";

export default function EventCard({ event }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Conference: "from-blue-500 to-cyan-500",
    Wedding: "from-pink-500 to-rose-500",
    Exhibition: "from-purple-500 to-indigo-500",
    Party: "from-orange-500 to-red-500",
    Concert: "from-green-500 to-emerald-500",
    Fundraiser: "from-yellow-500 to-amber-500",
    Corporate: "from-slate-500 to-gray-500",
    Sports: "from-teal-500 to-cyan-500",
  };

  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <Image
          width={200}
          height={200}
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {event.trending && (
            <div className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              <TrendingUp size={14} />
              Trending
            </div>
          )}
          {event.featured && (
            <div className="flex items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              <Award size={14} />
              Featured
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div
          className={`absolute top-4 right-4 bg-linear-to-r ${
            categoryColors[event.category]
          } text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}
        >
          {event.category}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-20 group-hover:translate-x-0">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-md transition-all transform hover:scale-110 ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all transform hover:scale-110">
            <Share2 size={18} />
          </button>
        </div>

        {/* Price & Rating at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-xl font-bold text-gray-900">
              {event.price}
            </span>
            <span className="text-sm text-gray-600">/event</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{event.rating}</span>
          </div>
        </div>

        {/* Sparkle Effects */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-white/40 animate-ping"
                size={16}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Calendar size={16} className="text-purple-600" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Clock size={16} className="text-blue-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <MapPin size={16} className="text-red-600" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Users size={16} className="text-green-600" />
            <span>{event.attendees}+ Attendees</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn shadow-lg">
          View Details
          <ArrowRight
            size={18}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Decorative Corner */}
      <div
        className={`absolute -bottom-16 -right-16 w-40 h-40 bg-linear-to-br ${
          categoryColors[event.category]
        } rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-700`}
      ></div>
    </div>
  );
}
