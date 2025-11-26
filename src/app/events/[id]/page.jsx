"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
const features = [
    "20+ Expert Speakers",
    "Interactive Workshops",
    "Networking Sessions",
    "Premium Lunch & Refreshments",
    "Digital Resource Kit",
    "Certificate of Attendance",
  ];

export default function EventDetailsPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [eventData, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const router = useRouter();
    
  // Fetch event data
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Event data loaded:", data);
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching event:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleBookNow = () => {
    console.log("Booking event:", eventData?.title);
    // Add your booking logic here
  };

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
 
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Event
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <p className="text-xl text-gray-600">Event not found</p>
          <button
            onClick={() => router.back()}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  const processFee = 5;
  const service = 10;
  const price = Number(eventData.price.replace(/[^0-9.]/g, '')) || 0;
  const finalTotal = price + service + processFee;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-pink-950">
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={eventData.image || "/placeholder-event.jpg"}
            alt={eventData.title || "Event"}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110 border border-white/20"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full backdrop-blur-md transition-all transform hover:scale-110 border ${
              isLiked
                ? "bg-red-500 text-white border-red-500"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all transform hover:scale-110 border border-white/20"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
          {eventData.trending && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
              <TrendingUp size={16} />
              Trending
            </div>
          )}
          {eventData.featured && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              <Award size={16} />
              Featured
            </div>
          )}
        </div>

        {/* Title & Category */}
        <div className="absolute bottom-8 left-8 right-8">
          <div
            className={`inline-block bg-gradient-to-r ${
              categoryColors[eventData.category] || categoryColors.Corporate
            } text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}
          >
            {eventData.category || "Event"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {eventData.title}
          </h1>
          {eventData.rating && (
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full w-fit">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900">
                {eventData.rating}
              </span>
              <span className="text-gray-600">Rating</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-800">
                <Calendar className="text-purple-600 mb-2" size={24} />
                <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {eventData.date || "TBA"}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-800">
                <Clock className="text-blue-600 mb-2" size={24} />
                <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {eventData.time || "TBA"}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-800">
                <Users className="text-green-600 mb-2" size={24} />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Attendees
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {eventData.attendees || 0}+
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-800">
                <DollarSign className="text-red-600 mb-2" size={24} />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Price
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {eventData.price || "Free"}
                </p>
              </div>
            </div>

            {/* Description */}
            {eventData.description && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="text-purple-600" size={28} />
                  About This Event
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                  {eventData.description.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">
                      {paragraph}
                      {paragraph}
                      {paragraph}
                      {paragraph}
                      {paragraph}
                      {paragraph}
                      {paragraph}
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
             
         
              
            {/* Features */}

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl"
                    >
                      <CheckCircle2
                        className="text-purple-600 flex-shrink-0"
                        size={24}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
     
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Price Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="text-center mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Event Price
                  </p>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {eventData.price || "Free"}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    per person
                  </p>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg mb-4"
                >
                  Book Now
                </button>

                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Service Fee
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${service}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Processing Fee
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${processFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-2xl text-purple-600">
                      $ {finalTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              {eventData.location && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="text-red-600" size={24} />
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {eventData.location}
                  </p>
                  <button className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                    View on Map
                  </button>
                </div>
              )}

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg text-white">
                <h3 className="text-xl font-bold mb-3">Need Help?</h3>
                <p className="mb-4 text-white/90">
                  Have questions about this event? Our team is here to help!
                </p>
                <button className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Share Event
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {["Facebook", "Twitter", "LinkedIn", "WhatsApp"].map(
                (platform) => (
                  <button
                    key={platform}
                    className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Share2 size={20} className="text-white" />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {platform}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
