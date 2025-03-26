"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import checkAuth from '../hooks/checkAuth';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
    const [user, setUser] = useState(null); 
    const router = useRouter();

    checkAuth({ setUser });

    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
        <Navbar />
        <Sidebar />
     
        <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
            <h1 className="text-2xl mb-4">Welcome to your Dashboard</h1>
            <p className="mb-4">Hello, {user.email}</p>  
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
        </>
    );
}
