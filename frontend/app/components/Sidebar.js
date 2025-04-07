// components/Sidebar.js
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Home, Info, Briefcase, Mail } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div
        initial={{ width: "4rem" }}
        animate={{ width: isOpen ? "15rem" : "5rem" }}
        transition={{ duration: 0.3 }}
        className="fixed top-[4rem] left-0 h-full bg-gray-900 text-white p-5 shadow-lg flex flex-col"
      >
        <div className="flex items-center justify-between mb-5">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                width: isOpen ? "auto" : 0,
                marginLeft: isOpen ? "0.75rem" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap overflow-hidden text-xl font-bold"
            >
        
              เมนู
            </motion.div>
          ) : (
            <button
              className="p-2 flex items-center justify-center bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={24} />
            </button>
          )}
          {isOpen && (
            <button
              className="p-2 flex items-center justify-center bg-gray-800 text-white rounded-lg transition-colors duration-300 hover:bg-red-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* เมนู */}
        <ul className="space-y-3">
          {[
            { name: "หน้าแรก", icon: <Home size={24} /> },
            { name: "เกี่ยวกับ", icon: <Info size={24} /> },
            { name: "บริการ", icon: <Briefcase size={24} /> },
            { name: "ติดต่อ", icon: <Mail size={24} /> },
          ].map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="p-2 flex items-center hover:bg-gray-700 rounded transition-all"
              >
                {/* ไอคอนอยู่ในตำแหน่งคงที่ */}
                <div className="w-6 flex items-center justify-center">
                  {item.icon}
                </div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    width: isOpen ? "auto" : 0,
                    marginLeft: isOpen ? "0.75rem" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.name}
                </motion.div>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
