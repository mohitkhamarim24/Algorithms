"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  _id: string;
  problem: string;
  verdict: string;
  language: string;
  createdAt: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const fetchSubmissions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/submissions/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Submissions</h1>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._id} className="p-4 bg-gray-800 rounded-xl shadow">
              <p><strong>Problem ID:</strong> {sub.problem}</p>
              <p><strong>Verdict:</strong> <span className={sub.verdict === "Accepted" ? "text-green-500" : sub.verdict === "Wrong Answer" ? "text-red-500" : "text-yellow-500"}>{sub.verdict}</span></p>
              <p><strong>Language:</strong> {sub.language}</p>
              <p><strong>Submitted:</strong> {new Date(sub.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
