"use client";

import { useState, useEffect } from "react";
import { Card } from "../../components/card";
import { CardContent } from "../../components/CardContent";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { Textarea } from "../../components/textarea";
import { Select } from "../../components/select";
import { useRouter, useParams } from "next/navigation";

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
  const categoryParam = params.category as string;
  
  const [taskId, setTaskId] = useState("");
  const [category, setCategory] = useState(categoryParam || "");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  useEffect(() => {
    // Find the task with the matching category
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const tasks: Task[] = JSON.parse(savedTasks);
      // Find the latest task with the matching category
      const matchingTasks = tasks.filter(t => t.category === categoryParam);
      if (matchingTasks.length > 0) {
        // Sort by ID (assuming ID is a timestamp) to get the latest one
        const latestTask = matchingTasks.sort((a, b) => Number(b.id) - Number(a.id))[0];
        
        setTaskId(latestTask.id);
        setCategory(latestTask.category);
        setStartDate(latestTask.startDate);
        setDeadline(latestTask.deadline);
        setNotes(latestTask.notes);
        setUrl(latestTask.url);
        setStatus(latestTask.status);
        setAdditionalDetails(latestTask.additionalDetails);
      }
    }
  }, [categoryParam]);

  const handleSave = async () => {
    if (!category || !startDate || !deadline) return;

    if (!taskId) {
      console.error("No task ID found");
      return;
    }

    const updatedTask = {
      id: taskId,
      category,
      startDate,
      deadline,
      notes,
      url,
      status,
      additionalDetails
    };

    try {
      // Update the task in localStorage
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        let tasks: Task[] = JSON.parse(savedTasks);
        tasks = tasks.map(t => t.id === taskId ? updatedTask : t);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      // Optionally send to your API
      await fetch("/api/update-task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      console.log("Task updated successfully");
      router.push("/"); // Return to the task list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!taskId) {
      console.error("No task ID found");
      return;
    }

    try {
      // Delete the task from localStorage
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        let tasks: Task[] = JSON.parse(savedTasks);
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      // Optionally send to your API
      await fetch("/api/delete-task", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId }),
      });

      console.log("Task deleted successfully");
      router.push("/"); // Return to the task list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardContent className="p-6 space-y-4">
          {[{ label: "Category", value: category, setter: setCategory, type: "text", placeholder: "Enter category description" },
            { label: "Start Date", value: startDate, setter: setStartDate, type: "date" },
            { label: "Deadline", value: deadline, setter: setDeadline, type: "date" },
            { label: "Notes", value: notes, setter: setNotes, type: "textarea", placeholder: "Enter notes" },
            { label: "URL", value: url, setter: setUrl, type: "text", placeholder: "Enter related URL" },
            { label: "Status", value: status, setter: setStatus, type: "select", options: ["Pending", "In Progress", "Completed"] },
            { label: "Additional Details", value: additionalDetails, setter: setAdditionalDetails, type: "textarea", placeholder: "Enter additional details" }]
            .map(({ label, value, setter, type, placeholder, options }, index) => (
              <div key={index}>
                <Label className="text-lg font-semibold text-gray-700">{label}</Label>
                {type === "select" ? (
                  <Select value={value} onChange={(e) => setter(e.target.value)} options={options || []} />
                ) : type === "textarea" ? (
                  <Textarea value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-black" />
                ) : (
                  <Input type={type} value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-black" />
                )}
              </div>
          ))}
          
          <div className="flex space-x-4">
            <Button onClick={handleSave} className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save Changes
            </Button>
            <Button onClick={handleDelete} className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Delete Task
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={() => router.push("/")} className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
        Back to Tasks
      </Button>
    </div>
  );
}