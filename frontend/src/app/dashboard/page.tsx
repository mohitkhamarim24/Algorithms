"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  username: string;
  email: string;
};

export default function Dashboard() {
   const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.username}!</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => router.push("/problems")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
        >
          Problems
        </button>

        <button
          onClick={() => router.push("/leaderboard")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
        >
          Leaderboard
        </button>

        <button
          onClick={() => router.push("/submissions")}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
        >
          My Submissions
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}
