import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loader from "./Loader"

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth()

  if (loading) return <Loader />

  if (!user) return <Navigate to="/login" />

  if (allowedRoles && !allowedRoles.includes(role))
    return <Navigate to="/" />

  return children
}
