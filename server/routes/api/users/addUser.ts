import express, { Router, Request, Response } from "express";
import UserCollection from "../../../models/User/user-collection.model";

const router: Router = express.Router();

const addUser = (req: Request, res: Response): void => {
    const user = new UserCollection({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // todos: ["5eaf07d7bcdbc64d6851f536", "5eaf07d7bcdbc64d6851f537"],
    });

    user.save((err) => {
        if (err) {
            console.log(err);
        }

        res.status(201);
        res.json(user);
    });

    return;
};

router.post("/users/addUser", (req: Request, res: Response) => {
    addUser(req, res);
});

export default router;
