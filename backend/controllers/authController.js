import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { getUser, createUser } from "../models/userModel.js";

dotenv.config();

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (await getUser(email)) {
            return res.json({ success: false, message: "อีเมลนี้ได้ลงทะเบียนไว้แล้ว" });
        } else {
            await createUser(email, password);
            return res.json({ success: true, message: "ลงทะเบียนผู้ใช้สำเร็จ" });
        }
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUser(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({ success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, message: "เข้าสู่ระบบสำเร็จ", token:token });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};
