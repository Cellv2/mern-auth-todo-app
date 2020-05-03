import express, { Request, Response } from "express";
import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router = express.Router();

const createTodo = (req: Request, res: Response) => {
    const text = req.body.text;

    const todo = new TodoCollection({
        author: 1,
        isComplete: false,
        text: text,
    });

    todo.save((err) => {
        if (err) {
            console.error("Something went wrong when adding the todo - ", err);
            return;
        }

        res.status(201);
        res.json(todo);
    });
};

router.post("/users/todos", (req: Request, res: Response) => {
    createTodo(req, res);
});

export default router;
