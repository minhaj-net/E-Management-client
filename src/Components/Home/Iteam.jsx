"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
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
  Award
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import AOS from "aos";
import "aos/dist/aos.css";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    title: "Corporate Business Summit 2024",
    category: "Conference",
    date: "Dec 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Grand Convention Center",
    attendees: 500,
    price: "$299",
    rating: 4.8,
    trending: true,
    featured: true,
    description: "Annual business summit featuring industry leaders and networking opportunities."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8fd86?w=800&q=80",
    title: "Dream Wedding Ceremony",
    category: "Wedding",
    date: "Jan 20, 2025",
    time: "4:00 PM - 11:00 PM",
    location: "Sunset Garden Resort",
    attendees: 200,
    price: "$5,999",
    rating: 5.0,
    trending: false,
    featured: true,
    description: "Elegant wedding celebration with premium services and stunning venue."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    title: "Tech Innovation Expo",
    category: "Exhibition",
    date: "Feb 5, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "City Tech Hub",
    attendees: 1000,
    price: "$149",
    rating: 4.6,
    trending: true,
    featured: false,
    description: "Discover the latest in technology with live demos and expert talks."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    title: "Birthday Bash Celebration",
    category: "Party",
    date: "Dec 25, 2024",
    time: "6:00 PM - 12:00 AM",
    location: "Royal Ballroom",
    attendees: 150,
    price: "$1,299",
    rating: 4.9,
    trending: false,
    featured: true,
    description: "Unforgettable birthday party with DJ, catering, and entertainment."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    title: "Music Festival Live",
    category: "Concert",
    date: "Mar 10, 2025",
    time: "5:00 PM - 2:00 AM",
    location: "Open Air Stadium",
    attendees: 5000,
    price: "$89",
    rating: 4.7,
    trending: true,
    featured: false,
    description: "Epic music festival featuring top artists and multiple stages."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    title: "Charity Gala Dinner",
    category: "Fundraiser",
    date: "Jan 30, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Luxury Hotel Ballroom",
    attendees: 300,
    price: "$499",
    rating: 4.9,
    trending: false,
    featured: true,
    description: "Elegant charity dinner supporting education for underprivileged children."
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    title: "Product Launch Event",
    category: "Corporate",
    date: "Feb 14, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "Innovation Center",
    attendees: 250,
    price: "$199",
    rating: 4.5,
    trending: true,
    featured: false,
    description: "Exclusive product reveal with press coverage and influencer meet."
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    title: "Adventure Sports Fest",
    category: "Sports",
    date: "Mar 20, 2025",
    time: "8:00 AM - 6:00 PM",
    location: "Mountain Base Camp",
    attendees: 800,
    price: "$129",
    rating: 4.8,
    trending: true,
    featured: true,
    description: "Thrilling sports festival with paragliding, rock climbing, and more."
  }
];

// function EventCard({ event }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const categoryColors = {
//     Conference: "from-blue-500 to-cyan-500",
//     Wedding: "from-pink-500 to-rose-500",
//     Exhibition: "from-purple-500 to-indigo-500",
//     Party: "from-orange-500 to-red-500",
//     Concert: "from-green-500 to-emerald-500",
//     Fundraiser: "from-yellow-500 to-amber-500",
//     Corporate: "from-slate-500 to-gray-500",
//     Sports: "from-teal-500 to-cyan-500"
//   };

//   return (
//     <div
//       className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 h-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Container */}
//       <div className="relative h-72 overflow-hidden">
//         <img
//           src={event.image}
//           alt={event.title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

//         {/* Badges */}
//         <div className="absolute top-4 left-4 flex flex-col gap-2">
//           {event.trending && (
//             <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
//               <TrendingUp size={14} />
//               Trending
//             </div>
//           )}
//           {event.featured && (
//             <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//               <Award size={14} />
//               Featured
//             </div>
//           )}
//         </div>

//         {/* Category Badge */}
//         <div className={`absolute top-4 right-4 bg-gradient-to-r ${categoryColors[event.category]} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
//           {event.category}
//         </div>

//         {/* Action Buttons */}
//         <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-20 group-hover:translate-x-0">
//           <button
//             onClick={() => setIsLiked(!isLiked)}
//             className={`p-2 rounded-full backdrop-blur-md transition-all transform hover:scale-110 ${
//               isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
//             }`}
//           >
//             <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
//           </button>
//           <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all transform hover:scale-110">
//             <Share2 size={18} />
//           </button>
//         </div>

//         {/* Price & Rating at bottom of image */}
//         <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
//           <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
//             <span className="text-xl font-bold text-gray-900">{event.price}</span>
//             <span className="text-sm text-gray-600">/event</span>
//           </div>
//           <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full">
//             <Star size={16} className="fill-yellow-400 text-yellow-400" />
//             <span className="font-bold text-gray-900">{event.rating}</span>
//           </div>
//         </div>

//         {/* Sparkle Effects */}
//         {isHovered && (
//           <div className="absolute inset-0 pointer-events-none">
//             {[...Array(12)].map((_, i) => (
//               <Sparkles
//                 key={i}
//                 className="absolute text-white/40 animate-ping"
//                 size={16}
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 2}s`,
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
//           {event.title}
//         </h3>

//         <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
//           {event.description}
//         </p>

//         {/* Event Details */}
//         <div className="space-y-2 mb-6">
//           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
//             <Calendar size={16} className="text-purple-600" />
//             <span>{event.date}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
//             <Clock size={16} className="text-blue-600" />
//             <span>{event.time}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
//             <MapPin size={16} className="text-red-600" />
//             <span>{event.location}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
//             <Users size={16} className="text-green-600" />
//             <span>{event.attendees}+ Attendees</span>
//           </div>
//         </div>

//         {/* CTA Button */}
//         <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn shadow-lg">
//           View Details
//           <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
//         </button>
//       </div>

//       {/* Decorative Corner */}
//       <div className={`absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br ${categoryColors[event.category]} rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-700`}></div>
//     </div>
//   );
// }

export default function EventsSection() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const categories = ["All", "Conference", "Wedding", "Exhibition", "Party", "Concert", "Fundraiser", "Corporate", "Sports"];
  
  const filteredEvents = filter === "All" 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
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
            <span className="font-semibold">Popular Events</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
            Discover Amazing
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Browse through our curated collection of events and find the perfect one for you
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid for Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-12" data-aos="fade-up">
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
          <button className="group bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3">
            View All Events
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(30px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-40px) translateX(-40px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
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
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}