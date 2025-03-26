"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1410/api/auth/login", {
        email,
        password,
      });


      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        setSuccessMsg(response.data.message);
        setErrMsg("");

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        setErrMsg(response.data.message || "Invalid credentials");
        setSuccessMsg("");
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrMsg("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    //   <div
    //   className={`flex justify-center items-center min-h-screen bg-gray-200 transition-all duration-300 pt-16 ${
    //     isOpen ? "ml-[15rem]" : "ml-[5rem]"
    //   }`}
    // >
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">
          เข้าสู่ระบบ
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Sign in
        </button>

        {/* Divider */}
        <hr className="border-gray-300 my-4" />

        {/* Register Button */}
        <Link href="/register">
          <button
            type="button"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition mt-1 cursor-pointer"
          >
            Create a new account
          </button>
        </Link>

        {/* Error & Success Messages */}
        {ErrMsg && <p className="text-red-500 text-sm mt-4">{ErrMsg}</p>}
        {SuccessMsg && <p className="text-green-500 text-sm mt-4">{SuccessMsg}</p>}
      </form>
    </div>




  );
}
