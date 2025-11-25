"use client";

import { useEffect, useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  DollarSign,
  Star,
  Image,
  FileText,
  Tag,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  TrendingUp,
  Award
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AddEventForm() {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    attendees: "",
    price: "",
    rating: "",
    trending: false,
    featured: false,
    description: "",
    features: [""]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const categories = [
    "Conference",
    "Wedding",
    "Exhibition",
    "Party",
    "Concert",
    "Fundraiser",
    "Corporate",
    "Sports"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.attendees) newErrors.attendees = "Attendees count is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== "")
      };
      
      console.log("Form submitted:", cleanedData);
      alert("Event added successfully!");
      
      setFormData({
        image: "",
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        attendees: "",
        price: "",
        rating: "",
        trending: false,
        featured: false,
        description: "",
        features: [""]
      });
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 py-12 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles size={20} className="animate-spin-slow" />
            <span className="font-semibold">Create New Event</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Add Your Event
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Fill in the details below to create an amazing event
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            {/* Image URL */}
            <div className="group" data-aos="fade-up" data-aos-delay="100">
              <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <Image size={18} />
                Event Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                  errors.image ? 'border-red-500' : 'border-white/20'
                } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Title */}
            <div className="group" data-aos="fade-up" data-aos-delay="150">
              <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <FileText size={18} />
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                  errors.title ? 'border-red-500' : 'border-white/20'
                } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                placeholder="Enter event title"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="group" data-aos="fade-up" data-aos-delay="200">
              <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <Tag size={18} />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                  errors.category ? 'border-red-500' : 'border-white/20'
                } rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
              >
                <option value="" className="bg-gray-900">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="250">
              <div className="group">
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar size={18} />
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                    errors.date ? 'border-red-500' : 'border-white/20'
                  } rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                />
                {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
              </div>

              <div className="group">
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock size={18} />
                  Time *
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                    errors.time ? 'border-red-500' : 'border-white/20'
                  } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                  placeholder="9:00 AM - 5:00 PM"
                />
                {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="group" data-aos="fade-up" data-aos-delay="300">
              <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin size={18} />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                  errors.location ? 'border-red-500' : 'border-white/20'
                } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                placeholder="Grand Convention Center, New York"
              />
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Attendees, Price & Rating */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="350">
              <div className="group">
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <Users size={18} />
                  Attendees *
                </label>
                <input
                  type="number"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                    errors.attendees ? 'border-red-500' : 'border-white/20'
                  } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                  placeholder="500"
                />
                {errors.attendees && <p className="text-red-400 text-sm mt-1">{errors.attendees}</p>}
              </div>

              <div className="group">
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <DollarSign size={18} />
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                    errors.price ? 'border-red-500' : 'border-white/20'
                  } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                  placeholder="$299"
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              <div className="group">
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <Star size={18} />
                  Rating *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                    errors.rating ? 'border-red-500' : 'border-white/20'
                  } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all`}
                  placeholder="4.8"
                />
                {errors.rating && <p className="text-red-400 text-sm mt-1">{errors.rating}</p>}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6" data-aos="fade-up" data-aos-delay="400">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="trending"
                  checked={formData.trending}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/20 bg-white/10"
                />
                <span className="flex items-center gap-2 text-white/90 font-medium">
                  <TrendingUp size={18} className="text-orange-500" />
                  Trending Event
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/20 bg-white/10"
                />
                <span className="flex items-center gap-2 text-white/90 font-medium">
                  <Award size={18} className="text-yellow-500" />
                  Featured Event
                </span>
              </label>
            </div>

            {/* Description */}
            <div className="group" data-aos="fade-up" data-aos-delay="450">
              <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <FileText size={18} />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border ${
                  errors.description ? 'border-red-500' : 'border-white/20'
                } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all resize-none`}
                placeholder="Enter detailed event description..."
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Features */}
            <div className="group" data-aos="fade-up" data-aos-delay="500">
              <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} />
                Features / What's Included
              </label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                >
                  <Plus size={18} />  
                  Add Feature
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6" data-aos="fade-up" data-aos-delay="550">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={24} />
                Create Event
              </button>
            </div>
          </div>
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
    </div>
  );
}