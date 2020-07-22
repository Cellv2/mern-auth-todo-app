import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserCollection from "../../../../../models/User/user-collection.model";
import { secretOrKey } from "../../../../../utils/secrets";

const router: Router = express.Router();

const updatePassword = (req: Request, res: Response): void => {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        if (!authorizedData) {
            res.sendStatus(403);
            return;
        }

        //@ts-expect-error
        const userId = authorizedData.id;

        UserCollection.findById(userId, (err, user) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            if (!user) {
                res.sendStatus(404);
                return;
            }

            // we do a save because updateOne pre hooks do not play nicely with this.isModified
            // https://mongoosejs.com/docs/middleware.html#notes
            const pwOne = req.body.passwordOne;
            const pwTwo = req.body.passwordTwo;

            if (pwOne !== pwTwo) {
                console.error("Passwords do not match");
                res.statusCode = 422;
                res.json("Passwords do not match");

                // res.sendStatus(422);
                return;
            }

            // check whether the strings are the same is already done, so we can take either password
            user.password = pwOne;
            user.save((err) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(204);
                return;
            });

            return;
        });
    });
};

router.put("/user/password/updatePassword", (req: Request, res: Response) => {
    updatePassword(req, res);
});

export default router;
