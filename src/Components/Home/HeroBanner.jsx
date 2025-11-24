"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      title: "Create Unforgettable Events",
      subtitle:
        "Transform your vision into reality with our comprehensive event management platform",
      cta: "Start Planning",
      background: "from-blue-600 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    },
    {
      title: "Seamless Event Coordination",
      subtitle:
        "Manage guests, vendors, and schedules all in one powerful dashboard",
      cta: "Explore Features",
      background: "from-purple-600 to-pink-600",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    },
    {
      title: "Elevate Every Experience",
      subtitle:
        "From corporate conferences to intimate gatherings, we've got you covered",
      cta: "Get Started",
      background: "from-pink-600 to-red-600",
      image:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              width={200} 
              height={200}
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.background} opacity-80`}
            ></div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* Animated Title */}
              <div
                className={`transform transition-all duration-700 delay-100 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
              </div>

              {/* Animated Subtitle */}
              <div
                className={`transform transition-all duration-700 delay-300 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {slide.subtitle}
                </p>
              </div>

              {/* Animated CTA Button */}
              <div
                className={`transform transition-all duration-700 delay-500 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto">
                  {slide.cta}
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>
              </div>

              {/* Feature Icons */}
              <div
                className={`mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transform transition-all duration-700 delay-700 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <span className="text-white text-sm font-medium">
                    Easy Managment
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                    <Users className="text-white" size={24} />
                  </div>
                  <span className="text-white text-sm font-medium">
                    Guest Management
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <span className="text-white text-sm font-medium">
                    Perfect Execution
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all z-10 group"
      >
        <ChevronLeft
          size={24}
          className="group-hover:-translate-x-1 transition-transform"
        />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all z-10 group"
      >
        <ChevronRight
          size={24}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? "bg-white w-12 h-3"
                : "bg-white/50 w-3 h-3 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
