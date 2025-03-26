import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

// Middleware check JWT
export const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // รับ token จาก header Authorization

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET); // check JWT
      req.user = verified; // ใส่ข้อมูลของ user ไว้ใน req
      
      next(); // ถ้า token ถูกต้องก็ไปยัง route ถัดไป
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
};


