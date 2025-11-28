import React, { useState, useEffect } from "react";
import axios from "axios";

// Icon components
const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const DollarSign = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const Receipt = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShoppingBag = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const API = "http://127.0.0.1:8080";

export default function Payments() {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [fetchId, setFetchId] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items for displaying names
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

  const getItemName = (itemId) => {
    const item = menuItems.find(m => m.id === Number(itemId));
    return item ? item.name : `Item ${itemId}`;
  };

  const getItemPrice = (itemId) => {
    const item = menuItems.find(m => m.id === Number(itemId));
    return item ? item.price : 0;
  };

  async function fetchOrderTotal(id) {
    if (!id) {
      setOrderDetails(null);
      setAmount("");
      return;
    }

    setOrderLoading(true);
    try {
      const res = await axios.get(`${API}/orders/${id}`);
      setOrderDetails(res.data);
      
      // Calculate total from items
      const total = res.data.items?.reduce((sum, item) => {
        return sum + (getItemPrice(item.id) * item.qty);
      }, 0) || 0;
      
      setAmount(total.toFixed(2));
    } catch (err) {
      setOrderDetails(null);
      setAmount("");
      console.error("Order fetch failed");
    }
    setOrderLoading(false);
  }

  async function createPayment() {
    if (!orderId || !amount) {
      return alert("Order ID is invalid or amount missing.");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/payments/`, {
        orderId: Number(orderId),
        amount: Number(amount),
      });
      setPaymentResponse(res.data);
      
      // Reset form after success
      setTimeout(() => {
        setOrderId("");
        setOrderDetails(null);
        setAmount("");
      }, 3000);
    } catch (err) {
      alert("Payment creation failed!");
      console.error(err);
    }
    setLoading(false);
  }

  async function fetchPayment() {
    if (!fetchId) return alert("Enter Payment ID");
    
    setLoading(true);
    try {
      const res = await axios.get(`${API}/payments/${fetchId}`);
      setPaymentData(res.data);
    } catch (err) {
      alert("Payment not found!");
      setPaymentData(null);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <CreditCard className="w-12 h-12" />
            Payment Processing
          </h1>
          <p className="text-xl text-emerald-100">Secure and seamless payment management</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Create Payment Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <DollarSign className="w-7 h-7" />
              Process Payment
            </h3>
          </div>

          <div className="p-8">
            {/* Order ID Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                Enter Order ID
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={orderId}
                  onChange={(e) => {
                    setOrderId(e.target.value);
                    fetchOrderTotal(e.target.value);
                  }}
                  placeholder="e.g., 12345"
                  className="w-full md:w-96 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                />
                {orderLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Card */}
            {orderDetails && (
              <div className="mb-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-xl font-bold text-gray-800">Order Summary</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-1">Order ID</div>
                    <div className="text-2xl font-bold text-gray-900">#{orderDetails.id}</div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-1">Table Number</div>
                    <div className="text-2xl font-bold text-gray-900">Table {orderDetails.tableId}</div>
                  </div>
                </div>

                {orderDetails.items && orderDetails.items.length > 0 && (
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h5 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-emerald-600" />
                      Order Items
                    </h5>
                    <div className="space-y-2">
                      {orderDetails.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{getItemName(item.id)}</div>
                            <div className="text-sm text-gray-500">Qty: {item.qty} × ${getItemPrice(item.id)}</div>
                          </div>
                          <div className="font-bold text-emerald-600">
                            ${(getItemPrice(item.id) * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Amount Display */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Total Amount
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-emerald-600">
                  $
                </div>
                <input
                  type="text"
                  value={amount}
                  disabled
                  className="w-full md:w-96 pl-12 pr-4 py-4 text-3xl font-bold border-2 border-emerald-200 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700"
                />
              </div>
              {!orderDetails && orderId && (
                <div className="mt-2 flex items-center gap-2 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Order not found. Please check the Order ID.</span>
                </div>
              )}
            </div>

            {/* Payment Button */}
            <button
              onClick={createPayment}
              disabled={loading || !orderDetails || !amount}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Process Payment
                </>
              )}
            </button>

            {/* Success Response */}
            {paymentResponse && (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      Payment Successful! 
                      <Sparkles className="w-6 h-6" />
                    </h4>
                    <div className="bg-white rounded-lg p-5 shadow-sm">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm font-semibold text-gray-500 mb-1">Payment ID</div>
                          <div className="text-lg font-bold text-gray-900">{paymentResponse.id}</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-500 mb-1">Order ID</div>
                          <div className="text-lg font-bold text-gray-900">#{paymentResponse.orderId}</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-500 mb-1">Amount Paid</div>
                          <div className="text-lg font-bold text-green-600">${paymentResponse.amount}</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-500 mb-1">Status</div>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            {paymentResponse.status || 'Completed'}
                          </span>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-sm font-semibold text-gray-500 mb-1">Timestamp</div>
                          <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            {paymentResponse.timestamp ? new Date(paymentResponse.timestamp).toLocaleString() : new Date().toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Track Payment Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Search className="w-7 h-7" />
              Track Payment
            </h3>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Payment ID
                </label>
                <input
                  type="number"
                  value={fetchId}
                  onChange={(e) => setFetchId(e.target.value)}
                  placeholder="Enter payment ID..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={fetchPayment}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Payment Details */}
            {paymentData && (
              <div className="p-6 bg-gradient-to-br from-gray-50 to-teal-50 border-2 border-teal-200 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-teal-100 rounded-full">
                    <Receipt className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800">Payment Details</h4>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-5 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Payment ID</div>
                    <div className="text-2xl font-bold text-gray-900">#{paymentData.id}</div>
                  </div>

                  <div className="p-5 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Order ID</div>
                    <div className="text-2xl font-bold text-gray-900">#{paymentData.orderId}</div>
                  </div>

                  <div className="p-5 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Amount</div>
                    <div className="text-2xl font-bold text-emerald-600">${paymentData.amount}</div>
                  </div>

                  <div className="p-5 bg-white rounded-lg shadow-sm">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Status</div>
                    <div className="mt-2">
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold">
                        {paymentData.status || 'Completed'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-lg shadow-sm md:col-span-2">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Payment Date</div>
                    <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      {paymentData.timestamp ? new Date(paymentData.timestamp).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}