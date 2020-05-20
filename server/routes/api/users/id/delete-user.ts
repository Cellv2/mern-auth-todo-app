import express, { Router, Request, Response } from "express";
import UserCollection from "../../../../models/User/user-collection.model";

const router: Router = express.Router();

const deleteUser = (req: Request, res: Response): void => {
    const id: string = "" + req.params.id;

    UserCollection.findByIdAndDelete(id, (err, deleted) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);

            return;
        }

        res.statusCode = 200;
        res.json(deleted);
    });

    return;
};

router.delete("/users/:id/deleteUser", (req: Request, res: Response) => {
    deleteUser(req, res);
});

export default router;
