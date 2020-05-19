import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretOrKey } from "../../../../utils/secrets";
import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const getUserTodos = (req: Request, res: Response) => {
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
        } else {
            if (!authorizedData) {
                res.sendStatus(401);
            } else {
                //@ts-expect-error
                const id: string = authorizedData.id;
                const query = { userid: id };

                TodoCollection.find(query, (err, todos) => {
                    if (err) {
                        console.error(err);
                    }

                    res.json(todos);
                });

                return;
            }
        }
    });

    return;
};

router.get("/user/todos", (req: Request, res: Response) => {
    getUserTodos(req, res);
});

export default router;
