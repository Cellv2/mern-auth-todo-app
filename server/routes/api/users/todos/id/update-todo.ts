import express, { Router, Request, Response } from "express";

import TodoCollection from "../../../../../models/Todo/todo-collection.model";
import { UserToken } from "../../../../../../client/src/types/user.types";

const router: Router = express.Router();

const updateTodo = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;

    // ensure that the user actually matches the token
    if (id !== req.body.userid) {
        res.sendStatus(403);

        return;
    } else {
        const todoId: string = req.params.id;
        const newData = req.body;

        TodoCollection.findByIdAndUpdate(
            todoId,
            newData,
            { upsert: false, new: true },
            (err, updated) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                }

                res.statusCode = 200;
                res.json(updated);
            }
        );
    }
};

router.put("/user/todos/:id", (req: Request, res: Response) => {
    updateTodo(req, res);
});

export default router;
