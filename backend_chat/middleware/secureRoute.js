import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Authorization token is required" });
        }

        const token = authHeader.replace("Bearer ", "");

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified) {
            return res.status(403).json({ message: "Invalid token" });
        }

        // Find user by ID stored in token
        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to next middleware or route
        next();
    } catch (error) {
        console.error("Error in secureRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default secureRoute;
