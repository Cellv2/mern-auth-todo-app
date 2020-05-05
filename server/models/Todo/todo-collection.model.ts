import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userid: String, // User._id
    isComplete: Boolean,
    text: String,
});

const TodoCollection = mongoose.model("Todo", todoSchema);
export default TodoCollection;
