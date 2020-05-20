import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretOrKey } from "../../../../utils/secrets";
import UserCollection from "../../../../models/User/user-collection.model";

const router: Router = express.Router();

const getUserProfile = (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        res.sendStatus(401);

        return;
    } else {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, secretOrKey, (err, authorizedData) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);

                return;
            } else {
                if (!authorizedData) {
                    res.sendStatus(401);

                    return;
                } else {
                    //@ts-expect-error
                    const id = authorizedData.id;
                    const query = { _id: id };
                    UserCollection.findById(query, (err, user) => {
                        if (err) {
                            console.error(err);
                            res.sendStatus(500);

                            return;
                        }

                        // We don't want to send the id or password back through the response
                        let userObj = user?.toObject();
                        delete userObj._id;
                        delete userObj.password;

                        res.json(userObj);

                        return;
                    });
                }
            }
        });
    }

    return;
};

router.get("/user/profile", (req: Request, res: Response) => {
    getUserProfile(req, res);
});

export default router;
