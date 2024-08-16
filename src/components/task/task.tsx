import styles from "./task.module.css";

import { TaskModel } from "@/lib/dataTypes";
import { deleteTask } from "@/api";



export default function Task(props: TaskModel) {
  const handleDelete = async () => {
    await deleteTask(props._id);
    window.location.reload();
  };

  return (
    <div className={styles.con}>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.desc}>{props.desc}</div>
      </div>
      <div className={styles.options}>
        <button className={styles.delete} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
