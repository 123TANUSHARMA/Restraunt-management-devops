import React, {useState} from 'react'
import axios from 'axios'


const API = 'http://127.0.0.1:8080'


export default function Orders(){
const [itemsJson,setItemsJson] = useState('[{"id":1,"qty":1}]')
const [tableId,setTableId] = useState('1')
const [created,setCreated] = useState(null)
const [fetchId,setFetchId]=useState('1')
const [fetched,setFetched]=useState(null)


async function createOrder(){
try{
const body = { items: JSON.parse(itemsJson), tableId: Number(tableId) }
const r = await axios.post(`${API}/orders/`, body)
setCreated(r.data)
}catch(e){ alert('Create order failed: '+(e?.response?.data?.error||e.message)) }
}


async function getOrder(){
try{ const r=await axios.get(`${API}/orders/${fetchId}`); setFetched(r.data) }
catch(e){ alert('Fetch failed: '+(e?.response?.data?.error||e.message)) }
}


return (
<div>
<h2 className="text-2xl font-semibold mb-4">Orders</h2>


<div className="grid grid-cols-2 gap-6">
<div className="p-4 bg-white rounded shadow-sm">
<h3 className="font-semibold mb-2">Create Order</h3>
<label className="block text-sm text-gray-600">Items JSON</label>
<textarea value={itemsJson} onChange={e=>setItemsJson(e.target.value)} className="w-full h-28 p-2 border rounded mt-1" />
<label className="block text-sm text-gray-600 mt-2">Table ID</label>
<input value={tableId} onChange={e=>setTableId(e.target.value)} className="w-24 p-2 border rounded mt-1" />
<button onClick={createOrder} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Create</button>
{created && <pre className="mt-3 p-2 bg-gray-50">{JSON.stringify(created,null,2)}</pre>}
</div>


<div className="p-4 bg-white rounded shadow-sm">
<h3 className="font-semibold mb-2">Fetch Order</h3>
<label className="block text-sm text-gray-600">Order ID</label>
<input value={fetchId} onChange={e=>setFetchId(e.target.value)} className="w-32 p-2 border rounded mt-1" />
<button onClick={getOrder} className="mt-3 px-4 py-2 bg-green-600 text-white rounded">Get</button>
{fetched && <pre className="mt-3 p-2 bg-gray-50">{JSON.stringify(fetched,null,2)}</pre>}
</div>
</div>
</div>
)
}