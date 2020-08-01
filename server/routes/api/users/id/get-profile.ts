import express, { Router, Request, Response } from "express";

import UserCollection from "../../../../models/User/user-collection.model";
import { UserToken } from "../../../../../client/src/types/user.types";

const router: Router = express.Router();

const getUserProfile = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;

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
    });
};

router.get("/user/profile", (req: Request, res: Response) => {
    getUserProfile(req, res);
});

export default router;
