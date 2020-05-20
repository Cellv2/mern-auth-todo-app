import express, { Router, Request, Response } from "express";
import TodoCollection from "../../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const updateTodo = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const query = { userid: id };
    const newData = { userid: req.body.userid };

    TodoCollection.findOneAndUpdate(
        query,
        newData,
        { upsert: false, new: true },
        (err, updated) => {
            if (err) {
                res.send(500);
                console.error(err);
            }

            // updated object is sent back
            res.statusCode = 200;
            res.json(updated);
        }
    );

    return;
};

router.put("/users/todos/:id", (req: Request, res: Response) => {
    updateTodo(req, res);
});

export default router;
