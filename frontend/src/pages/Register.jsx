import { useState } from "react"
import { supabase } from "../services/supabase"
import toast from "react-hot-toast"

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"" })

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { role: "customer" }
      }
    })

    if (error) return toast.error(error.message)
    toast.success("Registration successful")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow rounded w-96 space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        <input className="w-full border p-2"
          placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />
        <input className="w-full border p-2"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />
        <input type="password"
          className="w-full border p-2"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  )
}
