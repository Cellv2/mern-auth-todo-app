import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import TodoCollection from "../../../../../models/Todo/todo-collection.model";
import { secretOrKey } from "../../../../../utils/secrets";

const router = express.Router();

const deleteTodo = (req: Request, res: Response): void => {
    if (!req.headers.authorization) {
        res.sendStatus(401);

        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        // ensure that the user actually matches the token
        //@ts-expect-error
        if (!authorizedData || authorizedData.id !== req.body.userid) {
            res.sendStatus(403);

            return;
        } else {
            const todoId = req.params.id;

            TodoCollection.findByIdAndDelete(todoId, (err, deleted) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);

                    return;
                } else {
                    res.statusCode = 200;
                    res.json(deleted);
                }
            });
        }
    });

    return;
};

router.delete("/users/todos/:id", (req: Request, res: Response) => {
    deleteTodo(req, res);
});

export default router;
