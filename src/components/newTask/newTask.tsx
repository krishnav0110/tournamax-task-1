"use client";

import styles from "./newTask.module.css";

import { useRef } from "react";

import { createTask } from "@/api";



export default function NewTask() {
  const ref = useRef<HTMLFormElement>(null);



  return (
    <div className={styles.con}>
      <form
        ref={ref}
        action={async (FormData) => {
          ref.current?.reset();
          await createTask(FormData);
          window.location.reload();
        }}
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