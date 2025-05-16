import { expressjwt } from "express-jwt";
import { adminModel } from "../models/adminmodels.js";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET_KEY, // Corrected to match .env
  algorithms: ["HS256"],
  requestProperty: "auth", // Ensure req.auth is populated
  credentialsRequired: true, // Token is required
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await adminModel.findById(req.auth.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      if (!user.role) {
        return res.status(400).json("User role is not defined");
      }
      if (roles?.includes(user.role)) {
        next();
      } else {
        res.status(403).json("You are not authorized");
      }
    } catch (err) {
      console.error("Authorization Error:", err);
      res.status(500).json("Internal Server Error");
    }
  };
};
