import jwt from "jsonwebtoken";

function admin(req, res, next) {
  const token = req.header("x-auth-header");
  if (!token) return res.status(401).send("Access denied .No token provided");

  try {
    const decoded = jwt.verify(token, process.env.AUTH_PRIVATE_KEY);
    if (decoded.isAdmin) {
      next();
    }
  } catch (er) {
    res.status(400).send("Invalid token");
  }
}

export default admin;
