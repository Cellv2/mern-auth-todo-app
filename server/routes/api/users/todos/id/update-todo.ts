import express, { Router, Request, Response } from "express";

import { Notifications } from "../../../../../../client/src/constants/notifications";
import TodoCollection from "../../../../../models/Todo/todo-collection.model";
import { UserToken } from "../../../../../../client/src/types/user.types";

const router: Router = express.Router();

const updateTodo = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;

    // ensure that the user actually matches the token
    if (id !== req.body.userid) {
        res.status(403).json(Notifications.UserNotAuthorized);
        return;
    }

    const todoId: string = req.params.id;
    const newData = req.body;

    TodoCollection.findByIdAndUpdate(
        todoId,
        newData,
        { upsert: false, new: true },
        (err, updated) => {
            if (err) {
                res.status(500).json(Notifications.ItemUpdateInDbFailed);
                return;
            }

            res.status(200).json(updated);
            return;
        }
    );
};

router.put("/user/todos/:id", (req: Request, res: Response) => {
    updateTodo(req, res);
});

export default router;
