import express, { Request, Response } from "express";

import TodoCollection from "../../../../../models/Todo/todo-collection.model";
import { UserToken } from "../../../../../../client/src/types/user.types";

const router = express.Router();

const deleteTodo = (req: Request, res: Response): void => {
    const { id } = res.locals.authorizedData as UserToken;

    // ensure that the user actually matches the token
    if (id !== req.body.userid) {
        res.sendStatus(403);

        return;
    } else {
        const todoId = req.params.id;

        TodoCollection.findByIdAndDelete(todoId, (err, deleted) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);

                return;
            } else {
                res.statusCode = 200;
                res.json(deleted);
            }
        });
    }
};

router.delete("/users/todos/:id", (req: Request, res: Response) => {
    deleteTodo(req, res);
});

export default router;
