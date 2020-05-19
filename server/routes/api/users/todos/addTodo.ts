import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretOrKey } from "../../../../../server/utils/secrets";
import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const createToDo = (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        res.sendStatus(401);

        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            console.error(err);
            res.send(500);

            return;
        } else {
            if (!authorizedData) {
                res.sendStatus(401);
            } else {
                //@ts-expect-error
                const id: string = authorizedData.id;
                const text: string = req.body.text;

                const todo = new TodoCollection({
                    userid: id,
                    isComplete: false,
                    text: text,
                });

                todo.save((err) => {
                    if (err) {
                        console.error(err);

                        return;
                    }

                    res.status(201);
                    res.json(todo);
                });
            }

            return;
        }
    });
};

router.post("/user/todos", (req: Request, res: Response) => {
    createToDo(req, res);
});

export default router;
