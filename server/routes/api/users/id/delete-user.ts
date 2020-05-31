import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserCollection from "../../../../models/User/user-collection.model";
import { secretOrKey } from "../../../../utils/secrets";

const router: Router = express.Router();

const deleteUser = (req: Request, res: Response): void => {
    if (!req.headers.authorization) {
        res.sendStatus(401);

        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            res.sendStatus(500);

            return;
        }

        if (!authorizedData) {
            res.sendStatus(401);

            return;
        } else {
            //@ts-expect-error
            const userId = authorizedData.id;

            UserCollection.findByIdAndDelete(userId, (err, deleted) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);

                    return;
                }

                res.statusCode = 200;
                res.json(deleted);
            });
        }
    });

    return;
};

router.delete("/user/deleteUser", (req: Request, res: Response) => {
    deleteUser(req, res);
});

export default router;
