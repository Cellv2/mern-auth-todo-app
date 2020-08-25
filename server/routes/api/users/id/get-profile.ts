import express, { Router, Request, Response } from "express";

import { Notifications } from "../../../../../client/src/constants/notifications";
import UserCollection from "../../../../models/User/user-collection.model";
import { UserToken } from "../../../../../client/src/types/user.types";

const router: Router = express.Router();

const getUserProfile = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;

    const query = { _id: id };
    UserCollection.findById(query, (err, user) => {
        if (err) {
            res.status(500).json(Notifications.UserGetProfileFailed);
            return;
        }

        if (!user) {
            res.status(404).json(Notifications.UserNotFound);
            return;
        }

        // We don't want to send the id or password back through the response
        let userObj = user.toObject();
        delete userObj._id;
        delete userObj.password;

        res.status(200).json(userObj);
    });
};

router.get("/user/profile", (req: Request, res: Response) => {
    getUserProfile(req, res);
});

export default router;
