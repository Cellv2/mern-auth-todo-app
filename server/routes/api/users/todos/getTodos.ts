import express, { Router, Request, Response } from "express";
import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

const getUserTodos = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const query = { userid: id };

    console.log("WE HIT THE ID THING");

    TodoCollection.find(query, (err, todos) => {
        if (err) {
            console.error(err);
        }

        console.log(todos);
        res.json(todos);
    });

    return;
};

router.get("/users/:id/todos", (req: Request, res: Response) => {
    getUserTodos(req, res);
});

export default router;
