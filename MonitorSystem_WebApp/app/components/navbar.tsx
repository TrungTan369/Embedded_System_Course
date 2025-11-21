"use client";
import { useState, useRef, useEffect } from "react";
import { FiHome, FiUser, FiGrid, FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function Navbar() {
    const router = useRouter();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setUserMenuOpen(false);
            }
        }
        if (userMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuOpen]);

    // Theme state sync
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme === "dark") {
                setTheme("dark");
                document.documentElement.classList.add("dark");
            } else {
                setTheme("light");
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            alert("Đăng xuất thất bại!");
        }
    };

    return (
        <nav
            className="fixed top-0 left-0 w-full z-30 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800
                flex flex-row items-center px-4 py-2 shadow transition-all duration-200"
        >
            {/* Trang chủ bên trái */}
            <div className="flex flex-row items-center flex-1">
                <a
                    href="/"
                    className="group flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition font-medium"
                >
                    <FiHome size={22} />

                </a>
            </div>
            {/* Các icon bên phải */}
            <div className="flex flex-row items-center space-x-4">
                <a
                    href="/dashboard"
                    className="group flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition font-medium relative"
                >
                    <FiGrid size={22} />
                    <span className="text-xs absolute top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition">
                        Dashboard
                    </span>
                </a>
                <a
                    href="/notifications"
                    className="group flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition font-medium relative"
                >
                    <FiBell size={22} />
                    <span className="text-xs absolute top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition">
                        Thông báo
                    </span>
                </a>
                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setUserMenuOpen((v) => !v)}
                        className="group flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition font-medium relative"
                    >
                        <FiUser size={22} />
                        <span className="text-xs absolute top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition">
                            Thông tin
                        </span>
                    </button>
                    {/* Dropdown menu */}
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded shadow-lg py-2 z-40 animate-fade-in">
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 text-sm"
                            >
                                {theme === "dark" ? <FiSun /> : <FiMoon />}
                                {theme === "dark" ? "Chế độ sáng" : "Chế độ tối"}
                            </button>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                            <button
                                onClick={() => {
                                    setUserMenuOpen(false);
                                    router.push("/user");
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 text-sm"
                            >
                                Thông tin người dùng
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 text-sm"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}