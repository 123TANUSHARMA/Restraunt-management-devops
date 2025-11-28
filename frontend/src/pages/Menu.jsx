import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default function Menu(){
const [items, setItems] = useState([])
const [loading,setLoading]=useState(true)
const API = 'http://127.0.0.1:8080'


useEffect(()=>{(async ()=>{
try{ const r = await axios.get(`${API}/menu/`); setItems(r.data) }
catch(e){ console.error(e); }
setLoading(false)
})()},[])


return (
<div>
<h2 className="text-2xl font-semibold mb-4">Menu</h2>
{loading? <div>Loading...</div> : (
<div className="grid grid-cols-2 gap-4">
{items.map(it => (
<div key={it.id} className="p-4 bg-white rounded shadow-sm">
<div className="font-semibold">{it.name}</div>
<div className="text-sm text-gray-500">{it.category}</div>
<div className="mt-2 font-medium">${it.price}</div>
</div>
))}
</div>
)}
</div>
)
}