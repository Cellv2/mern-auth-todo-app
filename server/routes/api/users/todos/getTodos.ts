import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretOrKey } from "../../../../utils/secrets";

import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const getUserTodos = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const query = { userid: id };

    console.log(req.headers.authorization);

    const token = req.headers.authorization!.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            console.error(err);
            return;
        } else {
            console.log("yarr");
        }
    });

    TodoCollection.find(query, (err, todos) => {
        if (err) {
            console.error(err);
        }

        res.json(todos);
    });

    return;
};

router.get("/users/:id/todos", (req: Request, res: Response) => {
    getUserTodos(req, res);
});

export default router;
