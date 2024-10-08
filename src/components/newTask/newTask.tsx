"use client";
import styles from "./newTask.module.css";

import { useRef } from "react";

import { TaskModel } from "@/lib/dataTypes";
import { createTask } from "@/api";



export default function NewTask(props: { tasks: TaskModel[], setTasks: Function }) {
  const ref = useRef<HTMLFormElement>(null);



  const taskCreation = async (formData: FormData) => {
    const res = await createTask(formData);
    if(res.status === 200) {
      ref.current?.reset();
      const newTask: TaskModel = JSON.parse(res.data);
      props.setTasks([...props.tasks, newTask]);
    }
    else {
      console.log(res.message);
    }
  };





  return (
    <div className={styles.con}>
      <form
        ref={ref}
        action={taskCreation}
        className={styles.form}
      >

        <label htmlFor="title" className={styles.label}>Title</label>
        <input type="text" name="title" className={styles["title-input"]} />
        <label htmlFor="desc" className={styles.label}>Description</label>
        <textarea name="desc" className={styles["desc-input"]} />
        <button className={styles.button}>Add Task</button>
      </form>
    </div>
  );
}