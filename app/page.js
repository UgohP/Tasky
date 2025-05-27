"use client";
import React, { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask() {
    if (input.trim() !== "") {
      setTasks((t) => [...t, input]);
      setInput("");
    }
  }
  return (
    <>
      <section className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
            className="flex mb-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="Add a new task"
              className="flex-1 p-2 border border-gray-300 rounded-l"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r cursor-pointer"
            >
              Add Task
            </button>
          </form>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded text-gray-800">
                {task}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
