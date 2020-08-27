import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserCollection from "../../../../models/User/user-collection.model";
import { secretOrKey } from "../../../../utils/secrets";
import { UserToken } from "../../../../../client/src/types/user.types";
import { Notifications } from "../../../../../client/src/constants/notifications";

const router: Router = express.Router();

const deleteUser = (req: Request, res: Response): void => {
    if (!req.headers.authorization) {
        res.header("WWW-Authenticate: Bearer realm='mern-auth-todo-app'")
            .status(401)
            .json(Notifications.UserNotLoggedIn);
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            res.status(500).json(Notifications.UserDeleteFailed);
            return;
        }

        if (!authorizedData) {
            res.status(403).json(Notifications.UserNotAuthorized);
            return;
        } else {
            const userId = (authorizedData as UserToken).id;

            UserCollection.findByIdAndDelete(userId, (err, deleted) => {
                if (err) {
                    res.status(500).json(Notifications.UserDeleteFailed);
                    return;
                }

                res.status(200).json(deleted);
                return;
            });
        }
    });

    return;
};

router.delete("/user/deleteUser", (req: Request, res: Response) => {
    deleteUser(req, res);
});

export default router;
