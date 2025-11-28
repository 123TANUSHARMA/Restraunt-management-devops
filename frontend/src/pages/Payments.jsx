import React, { useState } from "react";
import axios from "axios";

// Icons
const Wallet = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M7 9h6" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2z" />
  </svg>
);

const Cash = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7H3v10h14v-2m4-4h-6m0 0l3-3m-3 3l3 3" />
  </svg>
);

const API = "http://127.0.0.1:8080";

export default function Payment() {
  const [orderId, setOrderId] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Card");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Order Details (Auto-total)
  async function fetchOrderDetails() {
    if (!orderId) return alert("Enter Order ID");

    setLoading(true);
    try {
      const res = await axios.get(`${API}/orders/${orderId}`);
      setOrderInfo(res.data);
      setAmount(res.data.total.toFixed(2)); // Auto-fill amount
    } catch (err) {
      alert("Order not found!");
      setOrderInfo(null);
      setAmount("");
    }
    setLoading(false);
  }

  // Make Payment
  async function makePayment() {
    if (!orderId || !amount) return alert("Fill all details");

    setLoading(true);
    try {
      const body = { orderId: Number(orderId), amount: Number(amount), method };
      const res = await axios.post(`${API}/payments/`, body);
      setPaymentResponse(res.data);
    } catch (err) {
      alert("Payment failed!");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-6 shadow-xl">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-4">
            <Wallet className="w-12 h-12" /> Payment Portal
          </h1>
          <p className="text-xl text-green-100">Secure your restaurant payments easily</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        
        {/* Fetch Order Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <CreditCard className="w-7 h-7" /> Retrieve Order Details
            </h3>
          </div>

          <div className="p-8 space-y-6">
            
            {/* Order ID Input */}
            <div>
              <label className="font-semibold text-gray-700">Order ID</label>
              <input
                type="number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500"
                placeholder="Enter order ID"
              />
            </div>

            <button
              onClick={fetchOrderDetails}
              className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold"
            >
              Fetch Order
            </button>

            {/* Order Details Card */}
            {orderInfo && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-4">Order Summary</h4>

                <div className="space-y-2 text-gray-700">
                  <p><strong>Order ID:</strong> {orderInfo.id}</p>
                  <p><strong>Table:</strong> {orderInfo.data.tableId}</p>
                  <p><strong>Total Amount:</strong> ₹{orderInfo.total.toFixed(2)}</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Cash className="w-7 h-7" /> Make Payment
            </h3>
          </div>

          <div className="p-8 space-y-6">

            {/* Amount Field (Auto-filled) */}
            <div>
              <label className="font-semibold text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                readOnly
                className="w-full mt-2 px-4 py-3 border-2 bg-gray-100 border-gray-200 rounded-xl cursor-not-allowed"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="font-semibold text-gray-700">Payment Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl"
              >
                <option>Card</option>
                <option>UPI</option>
                <option>Cash</option>
              </select>
            </div>

            <button
              onClick={makePayment}
              className="px-10 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold w-full"
            >
              Pay Now
            </button>

            {/* Payment Result */}
            {paymentResponse && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-emerald-300 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="text-xl font-bold text-green-800">Payment Completed!</h4>

                <p className="mt-3 text-gray-700">
                  <strong>Status:</strong> {paymentResponse.status}
                </p>
                <p className="text-gray-700">
                  <strong>Transaction ID:</strong> {paymentResponse.paymentId}
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
