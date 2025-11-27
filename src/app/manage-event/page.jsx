"use client";
import React, { useState, useEffect } from "react";
import { Eye, Trash2, Edit, Calendar, X, Sparkles, TrendingUp } from "lucide-react";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    fetch("https://e-managment-green.vercel.app/my-bookedEvent")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Events data:", data);
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        setLoading(false);
      });
  }, []);

  const handleView = (id) => {
    window.location.href = `/events/${id}`;
  };

  const handleUpdate = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || event.name || "",
      category: event.category || "",
      date: event.date || "",
      location: event.location || "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async () => {
    try {
      const response = await fetch(
        `https://e-managment-green.vercel.app/my-bookedEvent/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.message === "Event updated successfully") {
        setEvents(
          events.map((event) =>
            event._id === editingEvent._id
              ? { ...event, ...formData }
              : event
          )
        );

        // Toast success notification
        const toastEl = document.createElement('div');
        toastEl.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
        toastEl.textContent = '✅ Event updated successfully!';
        document.body.appendChild(toastEl);
        setTimeout(() => toastEl.remove(), 3000);

        setShowModal(false);
        setEditingEvent(null);
      }
    } catch (error) {
      console.error("Update error:", error);
      const toastEl = document.createElement('div');
      toastEl.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toastEl.textContent = '❌ Failed to update event!';
      document.body.appendChild(toastEl);
      setTimeout(() => toastEl.remove(), 3000);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`https://e-managment-green.vercel.app/my-bookedEvent/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message === "Event deleted successfully" ||
            data.message === "Course deleted successfully"
          ) {
            setEvents(events.filter((e) => e._id !== id));
            alert("✅ Event deleted successfully!");
          } else {
            alert("❌ Event not found!");
          }
        })
        .catch(() => {
          alert("❌ Failed to delete Event!");
        });
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-purple-400 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 92, 246, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(59, 130, 246, 0.4)'][i % 3]
              } 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Parallax Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                Manage Events
              </h1>
              <p className="text-gray-300 text-lg">Track and organize your events seamlessly</p>
            </div>
            
            <div className="flex gap-4">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-3xl font-bold text-white">{events.length}</div>
                    <div className="text-sm text-gray-400">Total Events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {events.map((event, idx) => (
            <div
              key={event._id}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-5 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${idx * 0.1}s`
              }}
            >
              <div className="mb-4">
                <h3 className="font-bold text-white text-xl mb-3">
                  {event.title || event.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {event.location || "Location not set"}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    {event.date || "Date not set"}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/30 text-purple-200 border border-purple-400/30">
                    {event.category || "General"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleView(event._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleUpdate(event)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-bold text-white">
                  Event Name
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-white">
                  Date
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-white">
                  Location
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-white">
                  Category
                </th>
                <th className="px-6 py-5 text-center text-sm font-bold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {events.map((event, idx) => (
                <tr 
                  key={event._id} 
                  className="hover:bg-white/5 transition-all duration-300"
                  style={{
                    animationDelay: `${idx * 0.05}s`
                  }}
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold text-white text-lg">
                      {event.title || event.name}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-300">
                    {event.date || "Not set"}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-300">
                    {event.location || "Not set"}
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                      {event.category || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(event._id)}
                        className="p-3 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all duration-300 hover:scale-110 border border-blue-400/30"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleUpdate(event)}
                        className="p-3 text-green-400 hover:bg-green-500/20 rounded-xl transition-all duration-300 hover:scale-110 border border-green-400/30"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="p-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-110 border border-red-400/30"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 animate-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Edit className="w-6 h-6 text-purple-400" />
                Update Event
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 p-2 hover:bg-white/10 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter category"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., Feb 5, 2025"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter location"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitUpdate}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Update Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}