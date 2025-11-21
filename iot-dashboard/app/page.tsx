"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";

const slides = [
    {
        src: "/images/1.jpg",
        alt: "Smart Home",
        title: "Smart Home",
        desc: "Giải pháp nhà thông minh: Giám sát, điều khiển thiết bị và an ninh cho ngôi nhà của bạn mọi lúc mọi nơi."
    },
    {
        src: "/images/2.jpg",
        alt: "Smart Farm",
        title: "Smart Farm",
        desc: "Nông trại thông minh: Theo dõi môi trường, tự động hóa tưới tiêu và quản lý sản xuất nông nghiệp hiệu quả."
    },
    {
        src: "/images/3.jpg",
        alt: "Giám sát giao thông",
        title: "Giám sát giao thông",
        desc: "Hệ thống giám sát giao thông: Thu thập dữ liệu, cảnh báo và tối ưu hóa lưu lượng phương tiện."
    }
];

export default function Home() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-black">
            <Navbar />
            <main className="flex-1 flex flex-row items-center justify-center pt-20 gap-12 w-full max-w-7xl mx-auto">
                {/* Left: Text content */}
                <div className="flex-1 flex flex-col items-start justify-center">
                    <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-6 text-left">
                        Dịch vụ hỗ trợ quan trắc IoT
                    </h1>
                    <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400 mb-10 text-left">
                        Chào mừng bạn đến với nền tảng hỗ trợ quan trắc IoT!<br />
                        Hệ thống giúp thu thập, giám sát và phân tích dữ liệu từ các thiết bị IoT một cách dễ dàng và hiệu quả.<br />
                        Bạn có thể quản lý thiết bị, xem dữ liệu thời gian thực, và nhận cảnh báo khi có sự cố xảy ra.
                    </p>
                </div>
                {/* Right: Carousel */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="relative w-full max-w-xl flex flex-col items-center">
                        <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Image
                                src={slides[current].src}
                                alt={slides[current].alt}
                                width={600}
                                height={300}
                                className="object-cover w-full h-full transition-all duration-700"
                                priority
                            />
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {slides.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`w-3 h-3 rounded-full ${idx === current ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"} transition`}
                                />
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{slides[current].title}</h2>
                            <p className="text-base text-zinc-700 dark:text-zinc-200">{slides[current].desc}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
