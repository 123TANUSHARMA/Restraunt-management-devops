import React, { useState, useEffect } from "react";
import axios from "axios";

// Icon components
const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Trash = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Receipt = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Table = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ChefHat = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.5 1.5c-1.5 0-2.8.7-3.6 1.8C7.3 3.1 6 3 4.8 3.6 3.1 4.5 2 6.3 2 8.3c0 1.2.5 2.3 1.2 3.1v9.1c0 1.4 1.1 2.5 2.5 2.5h12.6c1.4 0 2.5-1.1 2.5-2.5v-9.1c.7-.8 1.2-1.9 1.2-3.1 0-2-1.1-3.8-2.8-4.7-1.2-.6-2.5-.5-3.6-.3-.8-1.1-2.1-1.8-3.6-1.8zM6 20.5v-7h12v7H6z" />
  </svg>
);

const API = "http://127.0.0.1:8080";

export default function Orders() {
  const [items, setItems] = useState([{ id: 1, qty: 1 }]);
  const [tableId, setTableId] = useState("1");
  const [orderResponse, setOrderResponse] = useState(null);
  const [fetchId, setFetchId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch menu items for the dropdown
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/menu/`);
        setMenuItems(res.data);
      } catch (e) {
        console.error("Failed to load menu", e);
      }
    })();
  }, []);

  function addItemRow() {
    setItems([...items, { id: menuItems[0]?.id || 1, qty: 1 }]);
  }

  function updateItem(index, field, value) {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function createOrder() {
    setLoading(true);
    try {
      const body = { items, tableId: Number(tableId) };
      const res = await axios.post(`${API}/orders/`, body);
      setOrderResponse(res.data);
      // Reset form
      setItems([{ id: 1, qty: 1 }]);
      setTableId("1");
    } catch (err) {
      alert("Order creation failed!");
      console.error(err);
    }
    setLoading(false);
  }

  async function fetchOrder() {
    if (!fetchId) return alert("Enter Order ID");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/orders/${fetchId}`);
      setOrderData(res.data);
    } catch (err) {
      alert("Order not found!");
      setOrderData(null);
    }
    setLoading(false);
  }

  const getItemName = (itemId) => {
    const item = menuItems.find(m => m.id === Number(itemId));
    return item ? item.name : `Item ${itemId}`;
  };

  const getItemPrice = (itemId) => {
    const item = menuItems.find(m => m.id === Number(itemId));
    return item ? item.price : 0;
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (getItemPrice(item.id) * item.qty);
    }, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <ChefHat className="w-12 h-12" />
            Order Management
          </h1>
          <p className="text-xl text-blue-100">Create and track your restaurant orders</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Create Order Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Plus className="w-7 h-7" />
              Create New Order
            </h3>
          </div>

          <div className="p-8">
            {/* Table Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Table className="w-5 h-5 text-blue-600" />
                Table Number
              </label>
              <select
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                className="w-full md:w-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg font-semibold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>Table {num}</option>
                ))}
              </select>
            </div>

            {/* Items List */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                Order Items
              </h4>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Dish
                      </label>
                      <select
                        value={item.id}
                        onChange={(e) => updateItem(index, "id", Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        {menuItems.map(menuItem => (
                          <option key={menuItem.id} value={menuItem.id}>
                            {menuItem.name} - ${menuItem.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full md:w-32">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(index, "qty", Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-center font-semibold"
                      />
                    </div>

                    <div className="w-full md:w-32">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Subtotal
                      </label>
                      <div className="px-4 py-3 bg-blue-100 rounded-lg text-center font-bold text-blue-700">
                        ${(getItemPrice(item.id) * item.qty).toFixed(2)}
                      </div>
                    </div>

                    {items.length > 1 && (
                      <div className="flex items-end">
                        <button
                          onClick={() => removeItem(index)}
                          className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                          title="Remove item"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mb-6 p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Order Total:</span>
                <span className="text-3xl font-bold text-blue-700">${calculateTotal()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={addItemRow}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>

              <button
                onClick={createOrder}
                disabled={loading}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Create Order
                  </>
                )}
              </button>
            </div>

            {/* Success Response */}
            {orderResponse && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl animate-fadeIn">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-green-800 mb-3">
                      Order Created Successfully! 🎉
                    </h4>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-600">Order ID:</span>
                          <span className="ml-2 font-bold text-gray-900">{orderResponse.id}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Table:</span>
                          <span className="ml-2 font-bold text-gray-900">{orderResponse.tableId}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Status:</span>
                          <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                            {orderResponse.status || 'Pending'}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Items:</span>
                          <span className="ml-2 font-bold text-gray-900">{orderResponse.items?.length || items.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fetch Order Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Search className="w-7 h-7" />
              Track Order
            </h3>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Order ID
                </label>
                <input
                  type="number"
                  value={fetchId}
                  onChange={(e) => setFetchId(e.target.value)}
                  placeholder="Enter order ID..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={fetchOrder}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  Search
                </button>
              </div>
            </div>

            {/* Order Details */}
            {orderData && (
              <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 border-2 border-indigo-200 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Receipt className="w-8 h-8 text-indigo-600" />
                  <h4 className="text-2xl font-bold text-gray-800">Order Details</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-1">Order ID</div>
                    <div className="text-2xl font-bold text-gray-900">#{orderData.id}</div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-1">Table Number</div>
                    <div className="text-2xl font-bold text-gray-900">Table {orderData.tableId}</div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-1">Status</div>
                    <div className="mt-2">
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                        {orderData.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-1">Created At</div>
                    <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      {orderData.createdAt ? new Date(orderData.createdAt).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                </div>

                {orderData.items && orderData.items.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h5 className="font-bold text-gray-800 mb-4 text-lg">Order Items</h5>
                    <div className="space-y-3">
                      {orderData.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{getItemName(item.id)}</div>
                            <div className="text-sm text-gray-500">Quantity: {item.qty}</div>
                          </div>
                          <div className="font-bold text-indigo-600">
                            ${(getItemPrice(item.id) * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}