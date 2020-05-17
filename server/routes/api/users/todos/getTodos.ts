import express, { Router, Request, Response } from "express";
import TodoCollection from "../../../../models/Todo/todo-collection.model";

const router: Router = express.Router();

// router.get("/users/todos", (req: Request, res: Response) => {
//     TodoCollection.find((err, todo) => {
//         if (err) {
//             console.error(err);
//         }

//         res.json(todo);
//     });
// });

router.get("/users/:id/todos", (req: Request, res: Response) => {
    const id: string = req.params.id;
    const query = { userid: id };

    console.log("WE HIT THE ID THING");

    TodoCollection.find(query, (err, todos) => {
        if (err) {
            console.error(err);
        }

        console.log(todos);
        res.json(todos);
        return;
    });
});

export default router;
