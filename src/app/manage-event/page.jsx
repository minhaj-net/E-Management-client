"use client"
import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Edit, Calendar } from 'lucide-react';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from API
    fetch('http://localhost:5000/events')
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Events data:', data);
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        setLoading(false);
      });
  }, []);

  const handleView = (id) => {
    // Next.js routing
    window.location.href = `/events/${id}`;
  };

  const handleUpdate = (id) => {
    // Navigate to update page
    window.location.href = `/events/update/${id}`;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      fetch(`http://localhost:5000/events/${id}`, { 
        method: 'DELETE' 
      })
        .then(() => {
          setEvents(events.filter((e) => e.id !== id));
          alert('Event deleted successfully!');
        })
        .catch((err) => {
          console.error('Delete error:', err);
          alert('Failed to delete event');
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600 text-lg">Loading events...</div>
      </div>
    );
  }

  // if (!events || events.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 p-8">
  //       <div className="max-w-7xl mx-auto">
  //         <h1 className="text-3xl font-bold text-gray-900 mb-4">Manage Events</h1>
  //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
  //           <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
  //           <p className="text-gray-600 text-lg">No events found</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            Manage Events
          </h1>
          <p className="text-gray-600 mt-2">
            Total Events: {events.length}
          </p>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {event.title || event.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  📍 {event.location || 'Location not set'}
                </p>
                <p className="text-sm text-gray-600">
                  📅 {event.date || 'Date not set'}
                </p>
              </div>
              
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleView(event.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleUpdate(event.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {event.title || event.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.date || 'Not set'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.location || 'Not set'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {event.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(event.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleUpdate(event.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Update"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
    </div>
  );
}