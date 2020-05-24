import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretOrKey } from "../../../../utils/secrets";
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
            res.sendStatus(500);

            return;
        }

        // no need to check for userId here as the item is generated with the token's ID further down
        if (!authorizedData) {
            res.sendStatus(403);
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
                    res.sendStatus(500);

                    return;
                }

                res.statusCode = 201;
                res.json(todo);
            });
        }

        return;
    });
};

router.post("/user/todos", (req: Request, res: Response) => {
    createToDo(req, res);
});

export default router;
