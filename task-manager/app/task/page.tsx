"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  category: string;
  startDate: string;
  deadline: string;
  notes: string;
  url: string;
  status: string;
  additionalDetails: string;
}

export default function EditTask() {
  const router = useRouter();
  const params = useParams();
  const categoryParam = params?.category ? String(params.category) : "";

  const [task, setTask] = useState<Task>({
    id: uuidv4(), // Always generate an ID
    category: categoryParam,
    startDate: "",
    deadline: "",
    notes: "",
    url: "",
    status: "",
    additionalDetails: ""
  });

  useEffect(() => {
    // Try to load existing task from localStorage
    const loadTask = () => {
      try {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          const tasks: Task[] = JSON.parse(savedTasks);
          const foundTask = tasks.find(t => t.category === categoryParam);
          
          if (foundTask) {
            setTask(foundTask);
          } else {
            // If no task found, keep the generated ID
            setTask(prev => ({
              ...prev,
              id: uuidv4() // Regenerate ID if no task found
            }));
          }
        }
      } catch (error) {
        console.error("Error loading task:", error);
        // Fallback to regenerating ID
        setTask(prev => ({
          ...prev,
          id: uuidv4()
        }));
      }
    };

    loadTask();
  }, [categoryParam]);

  const handleChange = (field: keyof Task, value: string) => {
    setTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Ensure we always have a task ID
    const currentTaskId = task.id || uuidv4();

    // Validate required fields
    if (!task.category || !task.startDate || !task.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    const taskToSave: Task = {
      ...task,
      id: currentTaskId
    };

    try {
      // Retrieve existing tasks
      const savedTasks = localStorage.getItem("tasks");
      let tasks: Task[] = savedTasks ? JSON.parse(savedTasks) : [];

      // Find index of existing task
      const existingTaskIndex = tasks.findIndex(t => t.id === currentTaskId);
      
      if (existingTaskIndex > -1) {
        // Update existing task
        tasks[existingTaskIndex] = taskToSave;
      } else {
        // Add new task
        tasks.push(taskToSave);
      }

      // Save to localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Redirect to tasks page
      router.push("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleDelete = () => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      let tasks: Task[] = savedTasks ? JSON.parse(savedTasks) : [];
      
      // Remove the task
      tasks = tasks.filter(t => t.id !== task.id);
      
      // Update localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Redirect to tasks page
      router.push("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Category"
          value={task.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={task.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Deadline"
          value={task.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Notes"
          value={task.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL"
          value={task.url}
          onChange={(e) => handleChange('url', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={task.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <textarea
          placeholder="Additional Details"
          value={task.additionalDetails}
          onChange={(e) => handleChange('additionalDetails', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button 
          onClick={handleSave}
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Save Task
        </button>
        <button 
          onClick={handleDelete}
          className="w-full p-2 bg-red-500 text-white rounded mt-2"
        >
          Delete Task
        </button>
        <button 
          onClick={() => router.push("/tasks")}
          className="w-full p-2 bg-gray-500 text-white rounded mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}