"use client";

import { useState } from "react";
import checkAuth from "../hooks/checkAuth";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [isOpen] = useState(false);
    checkAuth({ setUser });

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
            <div className="h-screen flex relative">
                <Sidebar isOpen={isOpen} />
                <div className={`flex flex-col justify-center items-center transition-all duration-300 bg-gray-700 p-4 w-full ${isOpen ? "ml-[15rem]" : "ml-[5rem]" }`} >
                    <h1 className="text-2xl mb-4 text-white text-center">
                        Welcome to your Dashboard
                    </h1>
                    <p className="mb-4 text-white text-center">Hello : {user.email}</p>
                </div>
            </div>
        </>
    );
}
