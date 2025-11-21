import Navbar from "@/app/components/navbar"

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen">
            <Navbar />
            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-3xl">Dashboard IoT</h1>
            </main>
        </div>
    );
}
