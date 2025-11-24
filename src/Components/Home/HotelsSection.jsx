"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Star, MapPin, Sparkles, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const hotels = [
  {
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
    name: "Grand Palace Hotel",
    rating: 5,
    location: "Downtown",
    price: "$299",
    description:
      "Luxurious stay with world-class amenities in the heart of the city.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    name: "Sunset Resort",
    rating: 4,
    location: "Beachfront",
    price: "$249",
    description:
      "Relax by the beach and enjoy stunning sunset views every evening.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    name: "Mountain View Inn",
    rating: 4,
    location: "Mountain",
    price: "$199",
    description:
      "Cozy inn nestled in the mountains, perfect for nature lovers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    name: "City Lights Boutique",
    rating: 5,
    location: "City Center",
    price: "$349",
    description:
      "Modern boutique hotel with elegant rooms and city skyline views.",
  },
];

function HotelCard({ image, name, rating, location, price, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          width={200}
          height={200}
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
          {price}
          <span className="text-sm">/night</span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Sparkle Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-white/50 animate-ping"
                size={20}
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
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
          <MapPin size={16} />
          <span className="text-sm">{location}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn">
          Book Now
          <ChevronRight
            size={18}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Decorative Corner */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
}

export default function HotelsSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950"></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 animate-gradient"></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row items-center justify-between mb-12"
          data-aos="fade-down"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <h2 className="relative text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent flex items-center gap-3">
                <span className="bg-gradient-to-br from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg animate-bounce">
                  H
                </span>
                HOTELS
              </h2>
            </div>
          </div>

          <div
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
            data-aos="fade-left"
          >
            <Sparkles className="text-yellow-400 animate-spin-slow" size={20} />
            <p className="text-white font-medium">
              Don't forget to book your room
            </p>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1, effect: "slide" },
              768: { slidesPerView: 2, effect: "slide" },
              1024: { slidesPerView: 3, effect: "coverflow" },
            }}
            className="pb-12"
          >
            {hotels.map((hotel, index) => (
              <SwiperSlide key={index}>
                <HotelCard {...hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
          }
          50% {
            transform: translateX(-50%) translateY(-50%) rotate(180deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(-30px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(15px);
          }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
