import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Reservations(){
const [list,setList]=useState([])
useEffect(()=>{(async ()=>{
try{ const r = await axios.get('http://127.0.0.1:8080/reservations/'); setList(r.data) }
catch(e){ console.error(e) }
})()},[])


return (
<div>
<h2 className="text-2xl font-semibold mb-4">Reservations</h2>
<div className="space-y-2">
{list.length===0? <div className="text-gray-500">No reservations</div> : list.map(r=> (
<div key={r.id} className="p-3 bg-white rounded shadow-sm">Table {r.table} — {r.time}</div>
))}
</div>
</div>
)
}