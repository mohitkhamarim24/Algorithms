"use client";
import { useEffect, useState } from "react";

interface LeaderboardUser {
  username: string;
  solvedProblems: string[];
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🏆 Leaderboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black rounded-xl border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Solved Problems</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.username}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.solvedProblems?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
