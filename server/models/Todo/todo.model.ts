import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    author: String, // User._id
    isComplete: Boolean,
    text: String,
});

const TodoSchema = mongoose.model("Todo", todoSchema);
export default TodoSchema;
