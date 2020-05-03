import express, { Request, Response } from "express";

import TodoCollection from "../../../../../models/Todo/todo-collection.model";

const router = express.Router();

const deleteTodo = (req: Request, res: Response): void => {
    const id = req.params.id;
    const query = { author: id };

    TodoCollection.findOneAndDelete(query, (err, deleted) => {
        if (err) {
            console.error("There was a problem deleting the item", err);
        }

        res.statusCode = 200;
        res.json(deleted);
    });

    return;
};

router.delete("/users/todos/:id", (req: Request, res: Response) => {
    deleteTodo(req, res);
});

export default router;
