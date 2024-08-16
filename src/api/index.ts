'use server';
import TasksDB from "@/lib/dataTypes";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/lib/db";
import { ObjectId } from "mongoose";





export const fetchTasks = async () => {
    await connectToMongoDB();

    try {
        const tasks = await TasksDB.find();
        revalidatePath("/");
        return { status: 200, data: JSON.stringify(tasks) };
    } catch (error) {
        return { status: 500, data: "", message: 'couldn\'t fetch tasks' };
    }
};

export const createTask = async (formData: FormData) => {
    await connectToMongoDB();

    const taskTitle = formData.get("title");
    const taskDesc = formData.get("desc");
    try {
        const newTask = await TasksDB.create({
            title: taskTitle,
            desc: taskDesc
        });
        newTask.save();
        revalidatePath("/");
        return { status: 200, data: JSON.stringify(newTask) };
    } catch (error) {
        return { status: 500, data: "", message: 'error creating task' };
    }
};

export const updateTask = async (formdata: FormData) => {
    await connectToMongoDB();

    const taskId = formdata.get("id");
    const taskTitle = formdata.get("title");
    const taskDesc = formdata.get("desc");

    try {
        const updatedTask = await TasksDB.findByIdAndUpdate(taskId, { $set: {title: taskTitle, desc: taskDesc }});
        revalidatePath("/");
        return { status: 200, data: JSON.stringify(updatedTask) };
    } catch (error) {
        return { status: 500, data: "", message: 'error updating task' };
    }
}

export const deleteTask = async (taskId: ObjectId) => {
    await connectToMongoDB();
    console.log(taskId);

    try {
        await TasksDB.deleteOne({_id: taskId});
        revalidatePath("/");
        return { status: 200, message: 'task deleted'};
    } catch (error) {
        return { status: 500, message: 'error deleting task' };
    }
}