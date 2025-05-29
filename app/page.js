"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({
    title: "",
    completed: false,
  });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/task/", data);
      if (response.data.success) {
        toast.success(response.data.msg);
        setTasks((d) => [response.data.data, ...d]);
        setData({ title: "", completed: false });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchTasks = async () => {
    const response = await axios.get("/api/task");
    setTasks(response.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const deleteTask = async (id) => {
    const response = await axios.delete(`/api/task/${id}`);
    toast.error(response.data.msg);
    fetchTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`/api/task/${id}`, {
        completed: !currentStatus,
      });

      if (response.data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? response.data.data : task))
        );
        toast.success(
          `${
            !currentStatus
              ? "Congrats on Completing the task! 🎉👏"
              : "Opps!! Thought task was done 😅"
          }`
        );
      } else {
        toast.error("Failed to update task");
      }
    } catch {
      toast.error("Error updating task");
    }
  };

  return (
    <section className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-1">My Day</h2>
        <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
        <form onSubmit={onSubmitHandler} className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l"
            name="title"
            required
            value={data.title}
            onChange={onChangeHandler}
            placeholder={
              isFocused ? 'try typing "20mins work out"' : "Add a task"
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-1 -mr-1 scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-black/50 focus-within:scrollbar-thumb-black/50 flex-grow">
          <ul className="space-y-2">
            {tasks.length === 0 && (
              <p className="text-center text-gray-400 select-none">
                No tasks yet.
              </p>
            )}
            {tasks.map((task) => (
              <li
                key={task._id}
                className="bg-gray-100 p-3 rounded text-gray-800 flex items-center justify-between gap-3"
              >
                <input
                  name="completed"
                  type="radio"
                  checked={task.completed}
                  onChange={() => toggleComplete(task._id)}
                  className="w-4 h-4 rounded-full border-gray-400 cursor-pointer accent-blue-600"
                />
                <span
                  className={`flex-1 text-sm ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => toggleComplete(task._id, task.completed)}
                  className={`text-white text-xs px-3 py-1 rounded ${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-white text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
