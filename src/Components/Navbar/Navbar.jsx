"use client";

import React, { useState } from "react";
import { Menu, X, User, ChevronDown, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [userName] = useState("John Doe");

  // Mock user object - replace with your actual auth context
  const { user,logOut } = useAuth(); // Change to your useAuth() hook

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log("after logout");
    setIsLoggedIn(false);
    setShowDropdown(false);
    logOut()
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // Add your logout logic here
  };

  const closeMenu = () => setIsOpen(false);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl shadow-2xl border-b border-white/10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen animate-pulse"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-linear(circle, ${
                ["rgba(139, 92, 246, 0.5)", "rgba(236, 72, 153, 0.5)"][i % 2]
              } 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex gap-3 items-center group">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                <Sparkles className="w-6 h-6 text-white" />
                <Image
                  src="https://i.ibb.co/DfktLPRk/807fe937059366c85875f39ca3699f6b.jpg"
                  width={100}
                  height={100}
                  alt="Banner"
                  className="rounded-full "
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl tracking-tight">
                E-
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                  Management
                </span>
              </span>
              <span className="text-xs text-gray-400 -mt-1">
                Event Solutions
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { href: "/", label: "Home" },
              { href: "/add-event", label: "Add Event" },
              { href: "/manage-event", label: "Manage Event" },
              { href: "/events", label: "Events" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="relative px-5 py-2.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
              </a>
            ))}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <div className="flex gap-3">
                <a
                  href="/Register"
                  onClick={handleLogin}
                  className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold hover:scale-105"
                >
                  Sign In
                </a>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20 hover:border-white/40"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span>{user.displayName}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 border border-white/20 animate-in fade-in zoom-in duration-200">
                    <div className="px-5 py-4 border-b border-white/10">
                      <p className="text-xs text-gray-400 mb-1">Signed in as</p>
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        {user.displayName}
                      </p>
                    </div>
                    <a
                      href="/add-event"
                      className="block px-5 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 font-medium"
                      onClick={closeDropdown}
                    >
                      Add Event
                    </a>
                    <a
                      href="/manage-event"
                      className="block px-5 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 font-medium"
                      onClick={closeDropdown}
                    >
                      Manage Event
                    </a>
                    <div className="border-t border-white/10 mt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/20 transition-all duration-200 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 hover:scale-110"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/add-event", label: "Add Event" },
              { href: "/manage-event", label: "Manage Event" },
              { href: "/events", label: "Events" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-semibold"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-white/10 pt-4 mt-4">
              {!isLoggedIn ? (
                <div className="space-y-2 px-2">
                  <a
                    href="/Register"
                    onClick={handleLogin}
                    className="block w-full text-center px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold"
                  >
                    Sign In
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 py-3 text-white font-semibold bg-white/5 rounded-xl mb-3 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold">{user.displayName}</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/add-event"
                    className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    Add Event
                  </a>
                  <a
                    href="/manage-event"
                    className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    Manage Event
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 font-medium mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600"></div>
    </nav>
  );
}
