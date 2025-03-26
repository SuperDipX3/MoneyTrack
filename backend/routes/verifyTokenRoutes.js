import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/token", verifyToken, (req, res) => {
    res.json({ message: "Token verified successfully", user: req.user });
});

export default router;
