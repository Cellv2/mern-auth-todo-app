import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ToDoCollection extends mongoose.Document {
    userid: string;
    isComplete: boolean;
    text: string;
}

const todoSchema = new Schema({
    userid: String, // User._id
    isComplete: Boolean,
    text: String,
});

const TodoCollection = mongoose.model<ToDoCollection>("Todo", todoSchema);
export default TodoCollection;
