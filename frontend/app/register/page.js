"use client"; // เพื่อให้คอมโพเนนต์ทำงานในฝั่ง Client

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const response = await axios.post("http://localhost:1410/api/auth/register", {
        email, password,
      });

      if (response.data.success) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        setSuccessMsg(response.data.message);
        setErrMsg("");
      } else {
        setErrMsg(response.data.message || "Invalid credentials");
        setSuccessMsg("");
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrMsg("เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-500">ลงทะเบียน</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-1">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200"
            placeholder="Enter password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-500 mb-1">Confirm Password :</label>
          <input
            type="password"
            id="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-9 px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200"
            placeholder="Confirm password"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 cursor-pointer">
          Sign up
        </button>
        <hr className="border-gray-300 my-4" />
        <Link href="/login">
          <button type="button" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-1 cursor-pointer">
          Already have an account ?
          </button>
        </Link>

        {ErrMsg && <p className="text-red-500 text-sm mt-4">{ErrMsg}</p>}
        {SuccessMsg && <p className="text-green-500 text-sm mt-4">{SuccessMsg}</p>}
      </form>
    </div>
  );
}
