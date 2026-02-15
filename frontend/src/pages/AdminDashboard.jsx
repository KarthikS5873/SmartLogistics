// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react"
import api from "../services/api"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export default function AdminDashboard() {
  const [data,setData]=useState([])

  useEffect(()=>{
    api.get("/admin/shipments").then(res=>setData(res.data))
  },[])

  const revenue=data.reduce((sum,s)=>sum+s.cost,0)

  return(
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 shadow">
          Total Shipments: {data.length}
        </div>
        <div className="bg-white p-4 shadow">
          Revenue: ₹{revenue}
        </div>
      </div>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="transport_type"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="cost"/>
      </BarChart>
    </div>
  )
}
