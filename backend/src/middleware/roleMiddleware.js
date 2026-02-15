import supabase from "../config/supabase.js"

export const allowRoles = (...allowedRoles) => {
  return async (req, res, next) => {

    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", req.user.id)
      .single()

    if (error || !data) {
      return res.status(403).json({ message: "User role not found" })
    }

    if (!allowedRoles.includes(data.role)) {
      return res.status(403).json({ message: "Access Denied" })
    }

    req.role = data.role
    next()
  }
}
