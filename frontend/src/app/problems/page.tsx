"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface Problem {
  _id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/problems");
        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Problem List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Difficulty</th>
              <th className="py-2 px-4 border">Tags</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id} className="text-center hover:bg-gray-700">
                <td className="py-2 px-4 border">{problem.title}</td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 rounded ${
                      problem.difficulty === "Easy"
                        ? "bg-green-600"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-2 px-4 border">{problem.tags.join(", ")}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => router.push(`/problems/${problem._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Solve
                  </button>
                </td>
              </tr>
            ))}
            {problems.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
