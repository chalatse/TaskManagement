"use client";

import { useState, useEffect } from "react";
import { Card } from "../components/card";
import { CardContent } from "../components/CardContent";
import { Button } from "../components/button";
import { useRouter } from "next/navigation";

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

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleEditTask = (task: Task) => {
    // Navigate to the task edit page using category as the parameter
    router.push(`/task/${task.category}`);
  };

  const handleAddNewTask = () => {
    router.push("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <Button 
        onClick={handleAddNewTask} 
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
      >
        Add New Task
      </Button>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks saved yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((t, index) => (
            <Card key={index} className="bg-gray-100 shadow-md rounded-lg">
              <CardContent className="p-4">
                <p className="font-semibold text-lg text-gray-800">{t.category}</p>
                <p className="text-sm text-gray-600">{t.startDate} - {t.deadline}</p>
                <p className="text-sm text-gray-600">Notes: {t.notes}</p>
                <p className="text-sm text-gray-600">URL: <a href={t.url} className="text-blue-500">{t.url}</a></p>
                <p className="text-sm text-gray-600">Status: {t.status}</p>
                <p className="text-sm text-gray-600">Details: {t.additionalDetails}</p>
                <Button 
                  onClick={() => handleEditTask(t)} 
                  className="mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 px-4 py-1"
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}