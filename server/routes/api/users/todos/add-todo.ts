import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretOrKey } from "../../../../utils/secrets";
import TodoCollection from "../../../../models/Todo/todo-collection.model";
import { Item } from "../../../../../client/src/types/to-do.types";

const router: Router = express.Router();

const createToDos = (req: Request, res: Response) => {
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

        if (!authorizedData) {
            res.sendStatus(403);
            return;
        } else {
            //@ts-expect-error
            const userId = authorizedData.id;

            const items: Item[] = req.body;
            const mappedItems = items.map((item) => {
                const todo = new TodoCollection({
                    userid: userId,
                    isComplete: item.isComplete,
                    text: item.text,
                    timestamp: item.timestamp
                });
                return todo;
            });

            TodoCollection.insertMany(mappedItems, (err, items) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }

                res.json(items);
                return;
            });
        }
    });
};

router.post("/user/todos", (req: Request, res: Response) => {
    createToDos(req, res);
});

export default router;
