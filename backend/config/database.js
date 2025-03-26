import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

// ตั้งค่าการเชื่อมต่อ
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("Database connection successful."))
  .catch((err) => console.error("Database connection error:", err));

export default pool;
