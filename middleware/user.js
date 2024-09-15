const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const { User } = require("../db"); // Import the User model

async function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];

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
