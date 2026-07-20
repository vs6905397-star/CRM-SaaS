import React, { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import TasksTable from "../components/TasksTable"
import {getAllTask} from "../services/taskApi"

const Tasks = () => {

  const [tasks, setTasks] = useState(null);
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const fetchTasks = async () => {
    const data = await
    getAllTask(status, priority);
    setTasks(data.task);
  };

  useEffect(() => {
    fetchTasks();
  },[status, priority]);

  return (
    <MainLayout>
        <TasksTable tasks={tasks} fetchTasks={fetchTasks} 
        status={status} setStatus={setStatus} 
        priority={priority} setPriority={setPriority}/>
    </MainLayout>
  )
}

export default Tasks
