"use client"
import styles from "./page.module.css";

import { useEffect, useState } from "react";

import { TaskModel } from "@/lib/dataTypes";
import { fetchTasks } from "@/api";

import Task from "@/components/task/task";
import NewTask from "@/components/newTask/newTask";





export default function Home() {
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  

  useEffect(() => {
    const loadTasks = async () => {
      const res = await fetchTasks();
      if(res.status === 200) {
        const tasks: TaskModel[] = JSON.parse(res.data);
        setTasks(tasks);
      } else {
        console.log(res.message);
      }
    };
    loadTasks();
  }, []);




  
  return (
    <div className={styles.con}>
      <div className={styles.main}>
        <h1 className={styles.title}>Tournamax Task 1</h1>

        <button className={styles.addButton} onClick={() => setShowNewTask(!showNewTask)}>
          {showNewTask ? "Cancel" : "Add"}
        </button>
        {showNewTask && <NewTask tasks={tasks} setTasks={setTasks} />}

        <div className={styles.tasks}>
          {tasks.map((task, index) => (
            <Task key={index} _id={task._id} title={task.title} desc={task.desc} />
          ))}
        </div>
      </div>
    </div>
  );
}
