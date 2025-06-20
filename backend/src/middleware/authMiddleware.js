const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);
  console.log("JWT_SECRET being used:", process.env.JWT_SECRET);


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token received:", token);
  console.log("JWT_SECRET being used:", process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;