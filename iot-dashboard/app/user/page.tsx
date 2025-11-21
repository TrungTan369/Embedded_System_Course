"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/app/components/navbar";

export default function UserPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ name: "", bird: "" });
    const [saving, setSaving] = useState(false);
    const [show, setShow] = useState<"info" | "system" | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const ref = doc(db, "users", firebaseUser.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setUser(snap.data());
                    setForm({
                        name: snap.data().name || "",
                        bird: snap.data().bird || "",
                    });
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                name: form.name,
                bird: form.bird,
            });
            setUser({ ...user, name: form.name, bird: form.bird });
            setEdit(false);
        } catch (e) {
            alert("Lưu thất bại!");
        }
        setSaving(false);
    };

    return (
        <div className="flex min-h-screen pt-[56px]">
            <Navbar />
            <aside className="w-64 fixed top-10 left-0 h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-8 flex flex-col gap-4">
                <button
                    onClick={() => setShow("info")}
                    className="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Thông tin cá nhân
                </button>
                <button
                    onClick={() => setShow("system")}
                    className="w-full px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                    Hệ thống của tôi
                </button>
            </aside>
            <main className="flex-1 flex flex-col items-center justify-center px-4 ml-64 pt-16">
                {show === "info" && (
                    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">Thông tin cá nhân</h2>
                            <button
                                onClick={() => {
                                    setShow(null);
                                    setEdit(false);
                                    setForm({ name: user?.name || "", bird: user?.bird || "" });
                                }}
                                className="text-gray-500 hover:text-red-500 text-lg font-bold"
                                title="Đóng"
                            >
                                X
                            </button>
                        </div>
                        {loading ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">Đang tải...</div>
                        ) : user ? (
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-sm">Email</span>
                                    <span className="block text-base font-semibold text-gray-900 dark:text-white">{user.email}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-sm">Họ tên</span>
                                    {edit ? (
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                                        />
                                    ) : (
                                        <span className="block text-base font-semibold text-gray-900 dark:text-white">{user.name}</span>
                                    )}
                                </div>
                                <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-sm">Ngày sinh</span>
                                    {edit ? (
                                        <input
                                            name="bird"
                                            value={form.bird}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                                        />
                                    ) : (
                                        <span className="block text-base font-semibold text-gray-900 dark:text-white">{user.bird}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {edit ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="px-4 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                            >
                                                {saving ? "Đang lưu..." : "Lưu"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEdit(false);
                                                    setForm({ name: user.name, bird: user.bird });
                                                }}
                                                className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                            >
                                                Hủy
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setEdit(true)}
                                            className="px-4 py-1 rounded bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                                        >
                                            Chỉnh sửa
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-500">Không tìm thấy thông tin người dùng.</div>
                        )}
                    </div>
                )}
                {show === "system" && (
                    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-green-700 dark:text-green-300">Hệ thống của tôi</h2>
                            <button
                                onClick={() => setShow(null)}
                                className="text-gray-500 hover:text-red-500 text-lg font-bold"
                                title="Đóng"
                            >
                                X
                            </button>
                        </div>
                        {loading ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">Đang tải...</div>
                        ) : user ? (
                            <div className="space-y-2">
                                <span className="block text-gray-500 dark:text-gray-400 text-sm">System ID</span>
                                <span className="block text-base font-semibold text-gray-900 dark:text-white">{user.system_id}</span>
                            </div>
                        ) : (
                            <div className="text-red-500">Không có dữ liệu hệ thống.</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}