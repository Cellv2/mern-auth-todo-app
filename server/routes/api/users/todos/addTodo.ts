import TodoCollection from "../../../../models/Todo/todo-collection.model";
import express, { Request, Response } from "express";

const router = express.Router();

const createTodo = (req: Request, res: Response) => {
    const todo = new TodoCollection({
        author: 1,
        isComplete: false,
        text: "This is a test",
    });

    todo.save((err) => {
        if (err) {
            console.error("Something went wrong when adding the todo - ", err);
            return;
        }

        res.json(todo);
    });
};

router.post("/users/todos", (req: Request, res: Response) => {
    createTodo(req, res);
});

export default router;
