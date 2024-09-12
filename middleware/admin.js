const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../config")

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET_KEY);
        if (decodedValue.username) {
            req.user = decodedValue;
            next()
        }
        else {
            response.status(403).json({
                message: "You're not Authenticated"
            })
        }
    } catch (err) {
        res.status(403).json({
            message: "Invalid or expired token",
            error: err.message
        });
    }
}

module.exports = adminMiddleware;
