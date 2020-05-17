import express, { Router, Request, Response } from "express";
import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const createTodo = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const text = req.body.text;

    const todo = new TodoCollection({
        userid: id,
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

    return;
};

router.post("/users/:id/todos", (req: Request, res: Response) => {
    createTodo(req, res);
});

export default router;
