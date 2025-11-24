"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Bell, 
  CreditCard, 
  BarChart3,
  Clock,
  Shield,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    icon: Calendar,
    title: "Event Planning",
    description: "Create and manage multiple events with our intuitive calendar system. Schedule, organize, and track all your events in one place.",
    color: "from-blue-500 to-cyan-500",
    benefits: ["Drag & Drop Calendar", "Recurring Events", "Multi-Event Management"]
  },
  {
    icon: Users,
    title: "Guest Management",
    description: "Effortlessly manage your guest list with RSVP tracking, seating arrangements, and automated invitations.",
    color: "from-purple-500 to-pink-500",
    benefits: ["RSVP Tracking", "Guest Categories", "Check-in System"]
  },
  {
    icon: MapPin,
    title: "Venue Selection",
    description: "Browse and book from thousands of verified venues. Compare prices, view 360° tours, and read authentic reviews.",
    color: "from-green-500 to-emerald-500",
    benefits: ["Virtual Tours", "Price Comparison", "Instant Booking"]
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with real-time notifications for RSVPs, payments, and event reminders via email and SMS.",
    color: "from-orange-500 to-red-500",
    benefits: ["Email Alerts", "SMS Reminders", "Push Notifications"]
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Secure payment gateway with multiple payment options. Track invoices, refunds, and financial reports.",
    color: "from-indigo-500 to-blue-500",
    benefits: ["Multiple Gateways", "Auto Invoicing", "Refund Management"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get detailed insights with comprehensive analytics. Track attendance, revenue, and engagement metrics.",
    color: "from-pink-500 to-rose-500",
    benefits: ["Real-time Analytics", "Custom Reports", "Performance Metrics"]
  }
];

function FeatureCard({ icon: Icon, title, description, color, benefits }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl transition-all duration-500 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative p-8 h-full flex flex-col">
        {/* Icon */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse`}></div>
          <div className={`relative bg-gradient-to-br ${color} p-4 rounded-2xl w-fit`}>
            <Icon className="text-white" size={32} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
          {description}
        </p>

        {/* Benefits */}
        <div className="space-y-2 mb-6">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <CheckCircle2 size={16} className={`bg-gradient-to-br ${color} bg-clip-text text-transparent`} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className={`w-full bg-gradient-to-r ${color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn`}>
          Learn More
          <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>

        {/* Sparkle Effects */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-purple-400/30 animate-ping"
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
    </div>
  );
}

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-pink-950"></div>
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles size={20} className="animate-spin-slow" />
            <span className="font-semibold">Premium Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              To Create Perfect Events
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful tools and features designed to make event management effortless and enjoyable
          </p>
        </div>

        {/* Features Grid for Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12" data-aos="fade-up">
          {features.map((feature, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Swiper for Mobile/Tablet */}
        <div className="lg:hidden" data-aos="fade-up">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
            className="pb-12"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <FeatureCard {...feature} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="400">
          {[
            { icon: Clock, value: "24/7", label: "Support" },
            { icon: Shield, value: "100%", label: "Secure" },
            { icon: Users, value: "50K+", label: "Happy Clients" },
            { icon: Calendar, value: "100K+", label: "Events Created" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(-30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(15px); }
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
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}