import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import TodoCollection from "../../../../../models/Todo/todo-collection.model";
import { secretOrKey } from "../../../../../utils/secrets";

const router: Router = express.Router();

const updateTodo = (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        res.sendStatus(401);

        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            res.sendStatus(500);

            return;
        }

        // ensure that the user actually matches the token
        //@ts-expect-error
        if (!authorizedData || authorizedData.id !== req.body.userid) {
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
    });

    return;
};

router.put("/user/todos/:id", (req: Request, res: Response) => {
    updateTodo(req, res);
});

export default router;
