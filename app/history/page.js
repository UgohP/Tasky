"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function HistoryPage() {
  const taskSound =
    typeof window !== "undefined" ? new Audio("/sounds/delete.mp3") : null;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("/api/history");
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const groupedTasks = tasks.reduce((acc, task) => {
    const dateKey = new Date(task.createdAt).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const deleteTask = async (id) => {
    const response = await axios.delete(`/api/task/${id}`);
    toast.error(response.data.msg);
    fetchHistory();
  };

  return (
    <section className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Task History</h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : sortedDates.length === 0 ? (
          <p className="text-center text-gray-400">No task history yet.</p>
        ) : (
          sortedDates.map((date) => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {date}
              </h3>
              <ul className="space-y-2">
                {groupedTasks[date].map((task) => (
                  <li
                    key={task._id}
                    className="bg-gray-100 p-3 rounded text-gray-800 flex items-center justify-between gap-3"
                  >
                    <span
                      className={`flex-1 text-sm ${
                        task.completed
                          ? "line-through text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Undone"}
                    </span>
                    <button
                      onClick={() => deleteTask(task._id, taskSound.play())}
                      className="text-white text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
