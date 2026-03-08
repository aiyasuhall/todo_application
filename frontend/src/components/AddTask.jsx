import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({handleNewTaskAdded}) => {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", { title: newTaskTitle });
        toast.success(`Mission ${newTaskTitle} is added!!!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Error to add new task.", error);
        toast.error("Failed to add new task!")
      }

      setNewTaskTitle("");
  
    } else {
      toast.error("You need to input a task.")
    }

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };


  return (
    <Card className="p-6 bg-card border-2 border-black shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
         
        <Input
          type="text"
          placeholder="Add a new task..."
          // Xóa bg-black/text-white đi, chỉ giữ lại border-2 border-black và bg-white
          className="h-12 text-base bg-white text-black sm:flex-1 border-2 border-black focus-visible:ring-0 focus-visible:ring-offset-0"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5"/>
          Add Task

        </Button>

      </div>
    </Card>
  )
}

export default AddTask
