"use client"

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp, CheckCircle } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO",
      company: "TechVision Corp",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      text: "Absolutely phenomenal experience! Our annual tech conference had over 5,000 attendees, and everything ran like clockwork. The attention to detail and seamless coordination exceeded all expectations.",
      event: "Tech Innovation Summit 2024",
      attendees: "5,000+",
      highlight: "Flawless Execution"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Global Brands Inc",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      text: "From concept to execution, the team transformed our product launch into an unforgettable experience. The creative approach and professional handling made our brand shine in front of industry leaders.",
      event: "Product Launch Gala",
      attendees: "1,200+",
      highlight: "Creative Excellence"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder",
      company: "StartUp Hub",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 5,
      text: "Managing a 3-day startup festival seemed daunting, but they made it effortless. Real-time problem solving, vendor coordination, and attendee engagement were all handled brilliantly.",
      event: "Startup Festival 2024",
      attendees: "8,000+",
      highlight: "Outstanding Support"
    },
    {
      name: "David Park",
      role: "Event Coordinator",
      company: "Metropolitan Arts",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 5,
      text: "The team's expertise in handling large-scale cultural events is unmatched. Our music festival was a massive success thanks to their meticulous planning and crisis management skills.",
      event: "Summer Music Festival",
      attendees: "15,000+",
      highlight: "Crisis Management Pro"
    },
    {
      name: "Jennifer Taylor",
      role: "HR Director",
      company: "Fortune Global",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      rating: 5,
      text: "Our corporate retreat was transformed into an incredible team-building experience. The blend of professionalism and creativity created memories that our employees still talk about.",
      event: "Annual Corporate Retreat",
      attendees: "500+",
      highlight: "Team Building Master"
    },
    {
      name: "Robert Williams",
      role: "President",
      company: "Education Alliance",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      rating: 5,
      text: "Organizing an international conference with speakers from 40 countries required precision and expertise. They delivered beyond expectations with flawless logistics and attendee satisfaction.",
      event: "Global Education Summit",
      attendees: "3,500+",
      highlight: "International Expertise"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
          <Award className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white font-medium">Trusted by Industry Leaders</span>
        </div>

        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
          Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Stories</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Don't just take our word for it — hear from the clients who've experienced event excellence
        </p>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { icon: Star, value: "4.9/5", label: "Average Rating" },
            { icon: CheckCircle, value: "10K+", label: "Events Delivered" },
            { icon: TrendingUp, value: "98%", label: "Client Retention" }
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 text-white">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="relative h-[600px] flex items-center justify-center">
          {getVisibleTestimonials().map((testimonial, idx) => {
            const isActive = testimonial.position === 0;
            const isLeft = testimonial.position === -1;
            const isRight = testimonial.position === 1;

            return (
              <div
                key={`${activeIndex}-${idx}`}
                className={`absolute transition-all duration-700 ease-out ${
                  isActive
                    ? 'z-30 scale-100 opacity-100'
                    : 'z-10 scale-75 opacity-40 blur-sm'
                }`}
                style={{
                  transform: `translateX(${testimonial.position * 450}px) ${
                    !isActive ? 'translateY(20px)' : ''
                  }`,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
                onMouseEnter={() => isActive && setHoveredCard(activeIndex)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-[450px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                  {/* Card Header */}
                  <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <Quote className="absolute top-4 right-4 w-16 h-16 text-white/30" />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <span className="text-white text-sm font-semibold">{testimonial.highlight}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 relative">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mb-6 -mt-16">
                      <div className="w-24 h-24 rounded-2xl border-4 border-white/20 overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 mt-12">
                        <h3 className="text-2xl font-bold text-white">{testimonial.name}</h3>
                        <p className="text-purple-300">{testimonial.role}</p>
                        <p className="text-gray-400 text-sm">{testimonial.company}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-200 text-lg leading-relaxed mb-6">
                      "{testimonial.text}"
                    </p>

                    {/* Event Info */}
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">Event</p>
                        <p className="text-white font-semibold">{testimonial.event}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Attendees</p>
                        <p className="text-white font-semibold">{testimonial.attendees}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 px-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-purple-500' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Auto-play Indicator */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {isAutoPlaying ? '⏸ Pause' : '▶ Play'} Auto-scroll
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 max-w-4xl mx-auto mt-20 text-center">
        <div className="p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Success Story?
          </h3>
          <p className="text-gray-300 mb-8">
            Join thousands of satisfied clients who trusted us with their events
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Start Your Event Journey
          </button>
        </div>
      </div>
    </div>
  );
}