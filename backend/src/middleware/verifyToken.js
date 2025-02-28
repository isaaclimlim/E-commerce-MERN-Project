// Import required modules
const jwt = require('jsonwebtoken');

// Use an environment variable for the JWT secret key
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Middleware to verify token
const verifyToken = (req, res, next) => {
    try {
        // Extract the token from cookies
        const token = req.cookies.token;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded payload to the request object

        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        // Handle invalid or expired token errors
        res.status(401).json({ message: "Invalid or expired token." });
        
    }
};

module.exports = verifyToken;


