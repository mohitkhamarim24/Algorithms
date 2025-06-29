"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  testCases: TestCase[];
}

export default function ProblemPage() {
  const { id } = useParams();
  const router = useRouter();
  
const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/problems/${id}`);
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        console.error("Failed to fetch problem", err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      const res = await fetch("http://localhost:5000/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          problemId: id,
          language: "python",
          code: code
        })
      });

      const data = await res.json();
      console.log(data);
      alert(`Verdict: ${data.verdict}`);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  if (!problem) return <div className="text-white">Loading...</div>;

  
    return (
  <div className="min-h-screen p-6 bg-gray-900 text-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* LEFT COLUMN - Problem Details */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <p className="mb-2 text-gray-400">Difficulty: {problem.difficulty}</p>
        <p className="mb-4">{problem.description}</p>

        <h2 className="text-2xl font-semibold mb-3">Sample Test Cases:</h2>
        {problem.testCases.map((tc, index) => (
          <div key={index} className="bg-black p-4 mb-3 rounded-lg">
            <p className="text-gray-300">
              <span className="font-semibold">Input:</span> {tc.input}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Expected Output:</span> {tc.expectedOutput}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN - Code Editor & Submit */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col h-full">
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 p-4 bg-black text-white rounded-xl border border-gray-700 mb-4"
          placeholder="Write your code here..."
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl mb-4"
        >
          Submit
        </button>

        {/* Verdict Display */}

      </div>

    </div>
  </div>
);

}
