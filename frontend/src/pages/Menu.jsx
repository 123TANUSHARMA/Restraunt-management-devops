import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Icon components
const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const ShoppingCart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Flame = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c1.2 3.6 2.4 6.2 4.5 8.5 2 2.2 3.5 4.5 3.5 7.5 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-3 1.5-5.3 3.5-7.5C9.6 8.2 10.8 5.6 12 2z" />
  </svg>
)

const Leaf = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const Minus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

export default function Menu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState({})
  const [showCart, setShowCart] = useState(false)
  const API = 'http://127.0.0.1:8080'

  useEffect(() => {
    (async () => {
      try {
        const r = await axios.get(`${API}/menu/`)
        setItems(r.data)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    })()
  }, [])

  const categories = ['All', ...new Set(items.map(item => item.category))]
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }))
  }

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = items.find(i => i.id === parseInt(id))
    return sum + (item?.price || 0) * qty
  }, 0)

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <Flame className="w-12 h-12" />
            Our Menu
          </h1>
          <p className="text-xl text-orange-100">Discover delicious dishes crafted with passion</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-4 z-10">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setShowCart(false)}>
            <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Your Cart</h3>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
                </div>
                
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = items.find(i => i.id === parseInt(id))
                        if (!item) return null
                        return (
                          <div key={id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                            <div className="flex-1">
                              <div className="font-semibold">{item.name}</div>
                              <div className="text-sm text-gray-500">${item.price} each</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{qty}</span>
                              <button
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="border-t-2 pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold">Total:</span>
                        <span className="text-3xl font-bold text-orange-600">${cartTotal.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-gray-500 text-lg">Loading delicious items...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-orange-200 to-amber-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame className="w-20 h-20 text-orange-400 opacity-20 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-600 shadow-lg">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex-1">{item.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">4.5</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Delicious {item.name.toLowerCase()} prepared with fresh ingredients and authentic flavors.
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>15-20 min</span>
                    <Leaf className="w-4 h-4 ml-2" />
                    <span>Fresh</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-orange-600">
                      ${item.price}
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 group-hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">No items found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}