import React, { useState } from "react";

// Icon components
const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Table = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Trash = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Edit = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const BookOpen = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    table: "",
    time: "",
    guests: "",
  });
  const [created, setCreated] = useState(null);
  const [editingId, setEditingId] = useState(null);

  function createReservation() {
    const { name, table, time, guests } = form;

    if (!name || !table || !time || !guests) {
      alert("All fields are required!");
      return;
    }

    if (editingId) {
      // Update existing reservation
      const updated = reservations.map(r => 
        r.id === editingId 
          ? { ...r, name, table: Number(table), time, guests: Number(guests) }
          : r
      );
      setReservations(updated);
      setEditingId(null);
      setCreated({ id: editingId, name, table: Number(table), time, guests: Number(guests), updated: true });
    } else {
      // Create new reservation
      const newRes = {
        id: Date.now(),
        name,
        table: Number(table),
        time,
        guests: Number(guests),
        createdAt: new Date().toISOString(),
      };

      const updated = [...reservations, newRes];
      setReservations(updated);
      setCreated(newRes);
    }

    // Reset form
    setForm({ name: "", table: "", time: "", guests: "" });
    
    // Clear success message after 3 seconds
    setTimeout(() => setCreated(null), 3000);
  }

  function deleteReservation(id) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  }

  function editReservation(reservation) {
    setForm({
      name: reservation.name,
      table: reservation.table.toString(),
      time: reservation.time,
      guests: reservation.guests.toString(),
    });
    setEditingId(reservation.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setForm({ name: "", table: "", time: "", guests: "" });
    setEditingId(null);
  }

  // Group reservations by table
  const groupedByTable = reservations.reduce((acc, res) => {
    if (!acc[res.table]) acc[res.table] = [];
    acc[res.table].push(res);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="w-12 h-12" />
            Table Reservations
          </h1>
          <p className="text-xl text-purple-100">Manage your restaurant bookings with ease</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Create/Edit Reservation Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              {editingId ? (
                <>
                  <Edit className="w-7 h-7" />
                  Edit Reservation
                </>
              ) : (
                <>
                  <Plus className="w-7 h-7" />
                  New Reservation
                </>
              )}
            </h3>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Table Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Table className="w-4 h-4 text-purple-600" />
                  Table Number
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.table}
                  onChange={(e) => setForm({ ...form, table: e.target.value })}
                >
                  <option value="">Select table</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                    <option key={num} value={num}>Table {num}</option>
                  ))}
                </select>
              </div>

              {/* Reservation Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  Number of Guests
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                >
                  <option value="">Select guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={createReservation}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 font-bold text-lg"
              >
                {editingId ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Update Reservation
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    Create Reservation
                  </>
                )}
              </button>

              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Success Message */}
            {created && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                      {created.updated ? 'Reservation Updated!' : 'Reservation Confirmed!'}
                      <Sparkles className="w-5 h-5" />
                    </h4>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-600">Guest:</span>
                          <span className="ml-2 font-bold text-gray-900">{created.name}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Table:</span>
                          <span className="ml-2 font-bold text-gray-900">{created.table}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Time:</span>
                          <span className="ml-2 font-bold text-gray-900">{created.time}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Guests:</span>
                          <span className="ml-2 font-bold text-gray-900">{created.guests}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Current Reservations */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Calendar className="w-7 h-7" />
                Today's Reservations
              </h3>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-white font-bold">{reservations.length} Bookings</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {reservations.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <p className="text-xl text-gray-400 font-medium">No reservations yet</p>
                <p className="text-gray-400 mt-2">Create your first reservation above</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((reservation) => (
                    <div
                      key={reservation.id}
                      className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{reservation.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <Table className="w-4 h-4" />
                                  Table {reservation.table}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {reservation.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => editReservation(reservation)}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all flex items-center gap-2 font-semibold"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteReservation(reservation.id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all flex items-center gap-2 font-semibold"
                          >
                            <Trash className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Overview */}
        {Object.keys(groupedByTable).length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Table className="w-7 h-7" />
                Table Overview
              </h3>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(groupedByTable)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([table, bookings]) => (
                    <div
                      key={table}
                      className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-indigo-700">Table {table}</span>
                        <div className="px-2 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold">
                          {bookings.length}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {bookings.map(b => b.time).join(', ')}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}