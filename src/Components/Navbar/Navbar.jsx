/*

my-nextjs-app/
├── app/
│   ├── layout.tsx              # Root layout (add Navbar here)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── products/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── deals/
│   │   └── page.tsx
│   ├── add-product/
│   │   └── page.tsx
│   └── manage-products/
│       └── page.tsx
├── components/
│   └── Navbar.tsx              # Paste component code here
├── package.json
├── tailwind.config.ts
└── tsconfig.json

=====================================================
FILE 1: components/Navbar.tsx
=====================================================
*/

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { useAuth } from "@/context/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName] = useState("John Doe");

  const { user, logOut } = useAuth();
  console.log(user);
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
  };

  const closeMenu = () => setIsOpen(false);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex gap-2 items-center">
            <div className="text-white font-bold text-2xl flex items-center gap-5">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span>
                  <Image
                    src="https://i.ibb.co/DfktLPRk/807fe937059366c85875f39ca3699f6b.jpg"
                    width={100}
                    height={100}
                    alt="Banner"
                    className="rounded-full "
                  />
                </span>
              </div>
              <span className="hidden text-black font-bold sm:block">
                E- <span className="text-[#ed4a43]">Management</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className=" text-black font-bold">
              Home
            </Link>
            <Link href="/add-event" className=" text-black font-bold">
              Add Event
            </Link>
            <Link href="/manage-event" className=" text-black font-bold">
              Manage Event
            </Link>
            <Link href="/events" className=" text-black font-bold">
               Events
            </Link>
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center">
            {!user ? (
              <div className="flex gap-3">
                <Link
                  href={"/Register"}
                  onClick={handleLogin}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
                >
                  <div>
                    <Image
                      src={user.photoURL}
                      alt="My Picture"
                      width={35}
                      height={35}
                    />
                  </div>
                  <span>{user.displayName}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {user.displayName}
                      </p>
                    </div>
                    <Link
                      href="/add-product"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={closeDropdown}
                    >
                      Add Event
                    </Link>
                    <Link
                      href="/manage-products"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={closeDropdown}
                    >
                      Manage Event
                    </Link>
                    <div className="border-t border-gray-100 mt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
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
              className="text-white hover:text-blue-200 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              Add Event
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              Manage Event
            </Link>

            {/* Mobile Auth Section */}
            <div className="border-t border-blue-600 pt-3 mt-3">
              {!isLoggedIn ? (
                <div className="space-y-2 px-3">
                  <Link
                    href={"/Register"}
                    onClick={handleLogin}
                    className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-white font-medium border-b border-blue-600 mb-2">
                    <div className="flex items-center gap-2">
                      <User size={20} />
                      <span>{userName}</span>
                    </div>
                  </div>
                  <Link
                    href="/add-product"
                    className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    Add Event
                  </Link>
                  <Link
                    href="/manage-event"
                    className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    Manage Event
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-200 hover:bg-red-600 rounded-md transition-colors mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
