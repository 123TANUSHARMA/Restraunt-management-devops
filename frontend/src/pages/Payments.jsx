import React, {useState} from 'react'
import axios from 'axios'
const API = 'http://127.0.0.1:8080'


export default function Payments(){
const [orderId,setOrderId]=useState('1')
const [amount,setAmount]=useState('10')
const [created,setCreated]=useState(null)
const [fetchId,setFetchId]=useState('1')
const [fetched,setFetched]=useState(null)


async function createPayment(){
try{ const r=await axios.post(`${API}/payments/`, {orderId: Number(orderId), amount: Number(amount)}); setCreated(r.data) }
catch(e){ alert('Create payment failed: '+(e?.response?.data?.error||e.message)) }
}


async function getPayment(){
try{ const r=await axios.get(`${API}/payments/${fetchId}`); setFetched(r.data) }
catch(e){ alert('Fetch failed: '+(e?.response?.data?.error||e.message)) }
}


return (
<div>
<h2 className="text-2xl font-semibold mb-4">Payments</h2>
<div className="grid grid-cols-2 gap-6">
<div className="p-4 bg-white rounded shadow-sm">
<h3 className="font-semibold mb-2">Create Payment</h3>
<label className="block text-sm text-gray-600">Order ID</label>
<input value={orderId} onChange={e=>setOrderId(e.target.value)} className="w-32 p-2 border rounded mt-1" />
<label className="block text-sm text-gray-600 mt-2">Amount</label>
<input value={amount} onChange={e=>setAmount(e.target.value)} className="w-32 p-2 border rounded mt-1" />
<button onClick={createPayment} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Create</button>
{created && <pre className="mt-3 p-2 bg-gray-50">{JSON.stringify(created,null,2)}</pre>}
</div>


<div className="p-4 bg-white rounded shadow-sm">
<h3 className="font-semibold mb-2">Fetch Payment</h3>
<label className="block text-sm text-gray-600">Payment ID</label>
<input value={fetchId} onChange={e=>setFetchId(e.target.value)} className="w-32 p-2 border rounded mt-1" />
<button onClick={getPayment} className="mt-3 px-4 py-2 bg-green-600 text-white rounded">Get</button>
{fetched && <pre className="mt-3 p-2 bg-gray-50">{JSON.stringify(fetched,null,2)}</pre>}
</div>
</div>
</div>
)
}