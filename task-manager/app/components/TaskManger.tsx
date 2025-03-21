"use client";

import { useState } from "react";
import { Card } from "./card";
import { CardContent } from "./CardContent";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

interface Task {
  task: string;
  startDate: string;
  endDate: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const addTask = () => {
    if (!task || !startDate || !endDate) return;
    setTasks([...tasks, { task, startDate, endDate }]);
    setTask("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardContent className="p-6 space-y-4">
          <div>
            <Label className="text-lg font-semibold text-gray-700">Task</Label>
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <Label className="text-lg font-semibold text-gray-700">Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <Label className="text-lg font-semibold text-gray-700">End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2 w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <Button
            onClick={addTask}
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {tasks.map((t, index) => (
          <Card key={index} className="bg-gray-100 shadow-md rounded-lg">
            <CardContent className="p-4">
              <p className="font-semibold text-lg text-gray-800">{t.task}</p>
              <p className="text-sm text-gray-600">
                {t.startDate} - {t.endDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
