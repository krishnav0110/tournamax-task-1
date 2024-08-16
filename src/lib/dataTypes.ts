import mongoose, { ObjectId } from "mongoose";

export interface TaskModel {
    _id: ObjectId,
    title: String,
    desc: String,
}

const TaskSchema = new mongoose.Schema<TaskModel>({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    }
});

export default mongoose.models.Tasks || mongoose.model<TaskModel>("Tasks", TaskSchema);