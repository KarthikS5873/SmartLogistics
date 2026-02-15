import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tracking from "./pages/Tracking"
import Booking from "./pages/Booking"
import AdminDashboard from "./pages/AdminDashboard"
import CustomerDashboard from "./pages/CustomerDashboard"
import LogisticsDashboard from "./pages/LogisticsDashboard"

import { Toaster } from "react-hot-toast"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
         <Navbar />
        <Routes>

          <Route path="/" element={<Tracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logistics"
            element={
              <ProtectedRoute allowedRoles={["logistics"]}>
                <LogisticsDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Booking />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
