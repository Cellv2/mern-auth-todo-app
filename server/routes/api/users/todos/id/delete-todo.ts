import express, { Request, Response } from "express";

import { Notifications } from "../../../../../../client/src/constants/notifications";
import TodoCollection from "../../../../../models/Todo/todo-collection.model";
import { UserToken } from "../../../../../../client/src/types/user.types";

const router = express.Router();

const deleteTodo = (req: Request, res: Response): void => {
    const { id } = res.locals.authorizedData as UserToken;

    // ensure that the user actually matches the token
    if (id !== req.body.userid) {
        res.status(403).json(Notifications.UserNotAuthorized);
        return;
    }

    const todoId = req.params.id;

    TodoCollection.findByIdAndDelete(todoId, (err, deleted) => {
        if (err) {
            res.status(500).json(Notifications.ItemDeleteFromDbFailed);
            return;
        }

        res.status(200).json(deleted);
        return;
    });
};

router.delete("/user/todos/:id", (req: Request, res: Response) => {
    deleteTodo(req, res);
});

export default router;
