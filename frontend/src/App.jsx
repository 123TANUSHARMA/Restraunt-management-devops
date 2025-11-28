import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import Payments from './pages/Payments'
import Reservations from './pages/Reservations'

export default function App(){
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4">
        <h1 className="text-xl font-bold mb-6">Restaurant </h1>
        <nav className="space-y-2">
          <Link className="block p-2 rounded hover:bg-gray-100" to="/">Menu</Link>
          <Link className="block p-2 rounded hover:bg-gray-100" to="/orders">Orders</Link>
          <Link className="block p-2 rounded hover:bg-gray-100" to="/payments">Payments</Link>
          <Link className="block p-2 rounded hover:bg-gray-100" to="/reservations">Reservations</Link>
        </nav>
        <div className="mt-6 text-sm text-gray-500">
          Backend: <span className="font-mono">http://127.0.0.1:8080</span>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Menu/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/payments" element={<Payments/>} />
          <Route path="/reservations" element={<Reservations/>} />
        </Routes>
      </main>
    </div>
  )
}
