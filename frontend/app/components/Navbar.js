"use client"; // Ensure it works in the client-side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after logout
import axios from "axios";
export default function Navbar() {

    const [user, setUser] = useState(null);  // To store user data
    const router = useRouter();


    // Logout function
    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");  // Remove token from localStorage
        router.push("/login");  // Redirect to login page
    };

    // If user data is not yet loaded, show a loading state

    return (
        <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
        <div className="w-full flex justify-between items-center px-4 sm:px-2 lg:px-2">
            <div className="text-lg font-bold">MoneyTrack</div>
            <button
                className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-400"
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    </nav>


    );
}
