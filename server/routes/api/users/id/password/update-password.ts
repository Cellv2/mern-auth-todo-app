import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Notifications } from "../../../../../../client/src/constants/notifications";
import { UserToken } from "../../../../../../client/src/types/user.types";
import UserCollection from "../../../../../models/User/user-collection.model";
import { secretOrKey } from "../../../../../utils/secrets";

const router: Router = express.Router();

const updatePassword = (req: Request, res: Response): void => {
    if (!req.headers.authorization) {
        res.header("WWW-Authenticate: Bearer realm='mern-auth-todo-app'")
            .status(401)
            .json(Notifications.UserNotAuthorized);
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            res.status(500).json(Notifications.UserPasswordUpdateFailed);
            return;
        }

        if (!authorizedData) {
            res.status(403).json(Notifications.UserForbidden);
            return;
        }

        const userId = (authorizedData as UserToken).id;

        UserCollection.findById(userId, (err, user) => {
            if (err) {
                res.status(500).json(Notifications.UserPasswordUpdateFailed);
                return;
            }

            if (!user) {
                // this shouldn't really be possible? No explicit error provided
                res.status(404).json(Notifications.UserPasswordUpdateFailed);
                return;
            }

            // we do a save because updateOne pre hooks do not play nicely with this.isModified
            // https://mongoosejs.com/docs/middleware.html#notes
            const pwOne = req.body.passwordOne;
            const pwTwo = req.body.passwordTwo;

            if (pwOne !== pwTwo) {
                res.status(422).json(
                    Notifications.UserPasswordUpdateFailedPasswordsDoNotMatch
                );
                return;
            }

            // check whether the strings are the same is already done, so we can take either password
            user.password = pwOne;
            user.save((err) => {
                if (err) {
                    res.status(500).json(
                        Notifications.UserPasswordUpdateFailed
                    );
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
