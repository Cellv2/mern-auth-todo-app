import express, { Router, Request, Response } from "express";
import UserCollection from "../../../../models/User/user-collection.model";

const router: Router = express.Router();

const getUser = (req: Request, res: Response): void => {
    const id: string = "" + req.params.id;

    UserCollection.findById(id)
        .populate("todos")
        .exec((err, user) => {
            if (err) {
                console.error(err);
            }

            res.json(user);
        });

    return;
};

router.get("/users/:id/getUser", (req: Request, res: Response) => {
    getUser(req, res);
});

export default router;
