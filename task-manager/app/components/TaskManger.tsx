"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Swal from 'sweetalert2';
import { Card } from "./card";
import { CardContent } from "./CardContent";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function TaskManager() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = async () => {
    if (!category || !startDate || !deadline) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const taskId = Date.now().toString();
    const newTask = { id: taskId, category, startDate, deadline, notes, url, status, additionalDetails };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    Swal.fire({
      icon: 'success',
      title: 'Task Added!',
      text: 'Your task has been successfully added.',
      confirmButtonColor: '#3085d6',
    });

    setCategory("");
    setStartDate("");
    setDeadline("");
    setNotes("");
    setUrl("");
    setStatus("");
    setAdditionalDetails("");
    router.push("/tasks");
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4 relative">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <Link href="/tasks">
            <Button className="mb-4 bg-green-500 text-white">View Saved Tasks</Button>
          </Link>
          {[{ label: "Category", value: category, setter: setCategory, type: "text", placeholder: "Enter category description", required: true },
            { label: "Start Date", value: startDate, setter: setStartDate, type: "date", required: true },
            { label: "Deadline", value: deadline, setter: setDeadline, type: "date", required: true },
            { label: "Notes", value: notes, setter: setNotes, type: "textarea", placeholder: "Enter notes" },
            { label: "URL", value: url, setter: setUrl, type: "text", placeholder: "Enter related URL" },
            { label: "Status", value: status, setter: setStatus, type: "select", options: ["Pending", "In Progress", "Completed"] },
            { label: "Additional Details", value: additionalDetails, setter: setAdditionalDetails, type: "textarea", placeholder: "Enter additional details" }]
            .map(({ label, value, setter, type, placeholder, options, required }, index) => (
              <div key={index}>
                <Label className="text-lg font-semibold text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </Label>
                {type === "select" ? (
                  <Select value={value} onChange={(e) => setter(e.target.value)} options={options || []} />
                ) : type === "textarea" ? (
                  <Textarea value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-black" />
                ) : (
                  <Input 
                    type={type} 
                    value={value} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setter(e.target.value)} 
                    placeholder={placeholder} 
                    className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-black" 
                  />
                )}
              </div>
          ))}
          <Button onClick={addTask} className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add Task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
