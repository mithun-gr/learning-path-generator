import React, { useState } from "react";
import { ClipboardCopy, RefreshCcw, Trash2, Moon, Sun } from "lucide-react";

export default function LearningPathGenerator() {
  const [topic, setTopic] = useState("");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(false);

  const suggestions = ["Web Development", "Machine Learning", "Cybersecurity", "UI/UX Design", "Cloud Computing"];

  const generateTimeEstimate = () => {
    const hours = Math.floor(Math.random() * 50) + 10;
    return `⏱ Estimated Time: ${hours} hours`;
  };

  const generatePath = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const time = generateTimeEstimate();
      const response = `Here's your personalized learning path for **${topic}**:\n\n1. Introduction to ${topic}\n2. Beginner Tutorials on YouTube\n3. Official Documentation\n4. Mini Projects\n5. Join relevant forums\n6. Build a Capstone Project\n7. Share your work on GitHub\n\n${time}`;
      setPath(response);
      setHistory([{ topic, path: response }, ...history]);
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const reset = () => {
    setTopic("");
    setPath("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] dark:from-gray-900 dark:to-gray-800 px-4 transition-colors">
      <div className={`${dark ? "bg-gray-800" : "bg-white"} p-8 rounded-2xl shadow-2xl w-full max-w-xl`}>
        <div className="flex justify-between items-center mb-4 relative">
          <h1 className="text-3xl font-bold text-center w-full">📚 AI-Powered Learning Path Generator</h1>
          <button onClick={toggleTheme} className="absolute right-0 top-0">
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>

        <div className="mb-2 text-sm text-gray-500 dark:text-gray-300">
          Try:{" "}
          {suggestions.map((s, i) => (
            <span key={i} onClick={() => setTopic(s)} className="cursor-pointer text-blue-600 hover:underline mr-2">
              {s}
            </span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Enter any topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl text-black"
        />

        <div className="flex gap-2">
          <button
            onClick={generatePath}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Path"}
          </button>
          <button
            onClick={reset}
            className="px-4 bg-gray-200 rounded-xl hover:bg-gray-300 flex items-center justify-center"
          >
            <RefreshCcw size={18} />
          </button>
        </div>

        {path && (
          <div className="mt-6 bg-gray-100 text-black p-4 rounded-xl whitespace-pre-wrap relative">
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 text-sm bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            {path}
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">📜 History</h3>
              <button
                onClick={clearHistory}
                className="text-red-500 text-sm flex items-center gap-1 hover:underline"
              >
                <Trash2 size={16} /> Clear All
              </button>
            </div>
            <ul className="space-y-2">
              {history.map((entry, idx) => (
                <li key={idx} className={`${dark ? "bg-gray-700" : "bg-white"} border p-3 rounded-xl`}>
                  <strong>{entry.topic}</strong>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{entry.path}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
