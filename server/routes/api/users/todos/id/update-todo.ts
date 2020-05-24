import express, { Router, Request, Response } from "express";
import TodoCollection from "../../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const updateTodo = (req: Request, res: Response) => {
    const todoId: string = req.params.id;
    const newData = req.body;

    TodoCollection.findByIdAndUpdate(
        todoId,
        newData,
        { upsert: false, new: true },
        (err, updated) => {
            if (err) {
                res.send(500);
                console.error(err);
            }

            res.statusCode = 200;
            res.json(updated);
        }
    );

    return;
};

router.put("/user/todos/:id", (req: Request, res: Response) => {
    updateTodo(req, res);
});

export default router;
