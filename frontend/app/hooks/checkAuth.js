'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function checkAuth({ setUser }) {
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const response = await axios.get("http://localhost:1410/api/verify/token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.user) {
                    setUser(response.data.user); 
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            }
        };

        fetchUserData();
    }, [router]);
}