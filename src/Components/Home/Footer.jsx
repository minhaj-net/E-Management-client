"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
  Heart,
} from "lucide-react";
import Image from "next/image";

export default function EventFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const footerLinks = {
    Services: [
      "Corporate Events",
      "Weddings & Celebrations",
      "Conferences & Summits",
      "Product Launches",
      "Virtual Events",
      "Festival Management",
    ],
    Company: [
      "About Us",
      "Our Portfolio",
      "Success Stories",
      "Career Opportunities",
      "Press & Media",
      "Partner With Us",
    ],
    Resources: [
      "Event Planning Guide",
      "Budget Calculator",
      "Venue Finder",
      "Vendor Directory",
      "Blog & Insights",
      "FAQs",
    ],
    Support: [
      "Contact Us",
      "Help Center",
      "Live Chat",
      "Event Support",
      "Terms of Service",
      "Privacy Policy",
    ],
  };

  const socialLinks = [
    { icon: Facebook, name: "Facebook", color: "hover:bg-blue-600", link: "#" },
    { icon: Twitter, name: "Twitter", color: "hover:bg-sky-500", link: "#" },
    {
      icon: Instagram,
      name: "Instagram",
      color: "hover:bg-pink-600",
      link: "#",
    },
    { icon: Linkedin, name: "LinkedIn", color: "hover:bg-blue-700", link: "#" },
    { icon: Youtube, name: "YouTube", color: "hover:bg-red-600", link: "#" },
  ];

  const stats = [
    { icon: Calendar, value: "10K+", label: "Events" },
    { icon: Award, value: "50+", label: "Awards" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(80px)",
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 8 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-4">
                Stay in the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Loop
                </span>
              </h3>
              <p className="text-gray-400 text-lg">
                Subscribe to get exclusive event planning tips, industry
                insights, and special offers delivered to your inbox.
              </p>

              {/* Stats Mini */}
              <div className="flex gap-8 mt-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                      <stat.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Join 50,000+ event professionals. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Image
                    src="https://i.ibb.co/DfktLPRk/807fe937059366c85875f39ca3699f6b.jpg"
                    width={100}
                    height={100}
                    alt="Banner"
                    className="rounded-full "
                  />
                </div>
                <span className="text-2xl font-bold">Managment</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Crafting unforgettable experiences and bringing your vision to
                life with passion and precision.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+88 (018) 7056-7842</span>
                </a>
                <a
                  href="mailto:hello@eventpro.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">infoglb.net@.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="p-2 bg-white/5 rounded-lg mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">
                    123 Event Plaza, Suite 500
                    <br />
                    Bangladesh,12/13
                  </span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-bold mb-6 text-white">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                        <span className="text-sm">{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 Event- Management. All rights reserved.</span>
              <span className="hidden lg:inline">|</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
                for amazing events
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  onMouseEnter={() => setHoveredSocial(idx)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className={`p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 ${social.color} group`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600" />

      {/* Floating Badge */}
      <div className="absolute top-8 right-8 hidden xl:block">
        <div className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 animate-pulse">
          <Award className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold">Award Winning Service</span>
        </div>
      </div>
    </footer>
  );
}
