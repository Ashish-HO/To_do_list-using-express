import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("x-auth-header");
  if (!token) return res.status(401).send("Access denied. NO token provided.");

  try {
    const decoded = jwt.verify(token, process.env.AUTH_PRIVATE_KEY); 
    req.user = decoded;
    next();
  } catch (er) {
    res.status(400).send("Invalid token");
  }
}

export default auth;
