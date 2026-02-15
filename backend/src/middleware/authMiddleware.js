import supabase from "../config/supabase.js"

export const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Token required" })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    return res.status(401).json({ message: "Invalid token" })
  }

  req.user = data.user
  next()
}
