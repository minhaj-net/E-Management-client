"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import AOS from "aos";
import "aos/dist/aos.css";
import EventCard from "@/Components/Home/EventCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

const res = await fetch("http://localhost:5000/events", {
  cache: "no-store", // optional – always fresh data
});
const events = await res.json();
console.log(events)

export default function EventsSection() {
  const [filter, setFilter] = useState("All");
    const router = useRouter();






    // another work 

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const categories = [
    "All",
    "Conference",
    "Wedding",
    "Exhibition",
    "Party",
    "Concert",
    "Fundraiser",
    "Corporate",
    "Sports",
  ];

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950"></div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg animate-pulse">
            <Sparkles size={20} className="animate-spin-slow" />
            <span className="font-semibold"> Overs Events</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
            Discover Amazing
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Browse through our curated collection of events and find the perfect
            one for you
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          data-aos="fade-up"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                filter === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid for Desktop */}
        <div
          className="hidden lg:grid lg:grid-cols-4 gap-6 mb-12"
          data-aos="fade-up"
        >
          {filteredEvents.map((event, index) => (
            <div key={event.id} data-aos="fade-up" data-aos-delay={index * 50}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Swiper for Mobile/Tablet */}
        <div className="lg:hidden" data-aos="fade-up">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
            className="pb-12"
          >
            {filteredEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12" data-aos="fade-up">
          <button onClick={handleBack} className="group bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3">
          Go Back !
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(30px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-40px) translateX(-40px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 12s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 14s ease-in-out infinite;
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
