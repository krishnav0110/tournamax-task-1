'use server';
import TasksDB, { TaskModel } from "@/lib/dataTypes";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/lib/db";
import { ObjectId } from "mongoose";





export const fetchTasks = async () => {
    await connectToMongoDB();

    try {
        const tasks = await TasksDB.find();
        revalidatePath("/");
        return tasks;
    } catch (error) {
        console.log(error);
        return { message: 'couldn\'t fetch tasks' };
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
        return newTask.toString();
    } catch (error) {
        console.log(error);
        return { message: 'error creating task' };
    }
};

export const updateTask = async (formdata: FormData) => {
    await connectToMongoDB();

    const taskId = formdata.get("id");
    const taskTitle = formdata.get("title");
    const taskDesc = formdata.get("desc");

    try {
        await TasksDB.findByIdAndUpdate(taskId, { $set: {title: taskTitle, desc: taskDesc }});
        revalidatePath("/");
        return ('task updated');
    } catch (error) {
        return {message: 'error deleting task'};
    }
}

export const deleteTask = async (taskId: ObjectId) => {
    await connectToMongoDB();
    console.log(taskId);

    try {
        await TasksDB.deleteOne({_id: taskId});
        revalidatePath("/");
        return ('task deleted');
    } catch (error) {
        return {message: 'error deleting task'};
    }
}