const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const { User } = require("../db"); // Import the User model

async function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(400).json({ message: "Malformed authorization header" });
  }

  const jwtToken = parts[1];

  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET_KEY);

    const user = await User.findOne({ username: decodedValue.username });

    if (user) {
      req.user = {
        id: user._id,
        username: user.username,
      };
      next(); 
    } else {
      res.status(403).json({
        message: "Authentication failed",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "Invalid token",
    });
  }
}

module.exports = userMiddleware;
