import express, { Router, Request, Response } from "express";

import TodoCollection from "../../../../models/Todo/todo-collection.model";
import { Item } from "../../../../../client/src/types/to-do.types";
import { UserToken } from "../../../../../client/src/types/user.types";

const router: Router = express.Router();

const createToDos = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;

    const items: Item[] = req.body;
    const mappedItems = items.map((item) => {
        const todo = new TodoCollection({
            userid: id,
            isComplete: item.isComplete,
            text: item.text,
            timestamp: item.timestamp,
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
};

router.post("/user/todos", (req: Request, res: Response) => {
    createToDos(req, res);
});

export default router;
