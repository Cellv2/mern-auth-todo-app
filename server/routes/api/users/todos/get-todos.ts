import express, { Router, Request, Response } from "express";

import { Notifications } from "../../../../../client/src/constants/notifications";
import TodoCollection from "../../../../models/Todo/todo-collection.model";
import { UserToken } from "../../../../../client/src/types/user.types";

const router: Router = express.Router();

const getUserTodos = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;
    const query = { userid: id };

    TodoCollection.find(query, (err, todos) => {
        if (err) {
            res.status(500).json(Notifications.ItemFetchFromDbFailed);
            return;
        }

        res.status(200).json(todos);
        return;
    });
};

router.get("/user/todos", (req: Request, res: Response) => {
    getUserTodos(req, res);
});

export default router;
