"use client";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl w-96 space-y-6 shadow-xl flex flex-col items-center"
            >
                <h2 className="text-3xl font-bold text-center mb-2 text-blue-700 dark:text-blue-200">Đăng nhập</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <input
                    type="email"
                    className="w-full p-3 rounded-lg bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-3 rounded-lg bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
                <div className="flex items-center w-full my-2">
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
                    <span className="mx-2 text-gray-400 text-sm">hoặc</span>
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
                </div>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 font-semibold text-gray-700 dark:text-gray-100 transition-colors disabled:opacity-60"
                    disabled={loading}
                >
                    <FcGoogle size={24} />
                    Đăng nhập với Google
                </button>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    Bạn chưa có tài khoản?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Đăng ký ngay
                    </a>
                </div>
            </form>

        </div>
    );
}
