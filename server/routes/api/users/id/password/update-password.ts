import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserCollection from "../../../../../models/User/user-collection.model";
import { secretOrKey } from "../../../../../utils/secrets";

const router: Router = express.Router();

const updatePassword = (req: Request, res: Response): void => {
    const paramsId = "5ed56cb4a1391d6dd0a89a0d";

    UserCollection.findById(paramsId, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        if (!user) {
            res.sendStatus(404);
            return;
        }

        const newPassword = req.body.password;
        user.password = newPassword;
        console.log(user);

        // we do a save because updateOne pre hooks do not play nicely with this.isModified
        // https://mongoosejs.com/docs/middleware.html#notes
        user.save((err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            res.sendStatus(204);
        });

        return;
    });
};

router.put("/user/password/updatePassword", (req: Request, res: Response) => {
    // res.json({ updatePassword: "updatePassword.ts" });
    updatePassword(req, res);
});

export default router;
