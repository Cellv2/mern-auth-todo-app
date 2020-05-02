import express, { Request, Response } from "express";
import TodoCollection from "../../../../../models/Todo/todo-collection.model";

const router = express.Router();

const updateTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    const query = { author: id };
    const newData = { author: req.body.author };

    TodoCollection.findOneAndUpdate(
        query,
        newData,
        { upsert: false, new: true },
        (err, updated) => {
            if (err) {
                res.send(500);
                console.error(err);
            }

            res.statusCode = 201;
            res.json(updated);
        }
    );
};

router.put("/users/todos/:id", (req: Request, res: Response) => {
    updateTodo(req, res);
});

export default router;
