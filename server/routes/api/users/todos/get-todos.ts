import express, { Router, Request, Response } from "express";

import TodoCollection from "../../../../models/Todo/todo-collection.model";
import { UserToken } from "../../../../../client/src/types/user.types";

const router: Router = express.Router();

const getUserTodos = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;
    const query = { userid: id };

    TodoCollection.find(query, (err, todos) => {
        if (err) {
            console.error(err);
        }

        res.json(todos);
    });
};

router.get("/user/todos", (req: Request, res: Response) => {
    getUserTodos(req, res);
});

export default router;
