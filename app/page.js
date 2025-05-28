"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({
    title: "",
    completed: false,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/task", data);
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
    console.log(response.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <section className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
          <form onSubmit={onSubmitHandler} className="flex mb-4">
            <input
              type="text"
              name="title"
              required
              value={data.title}
              onChange={onChangeHandler}
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
              <li
                key={index}
                id={task._id}
                className="bg-gray-100 p-2 rounded text-gray-800"
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
