import express, { Router, Request, Response } from "express";

import { Notifications } from "../../../../../client/src/constants/notifications";
import UserCollection from "../../../../models/User/user-collection.model";
import { UserToken } from "../../../../../client/src/types/user.types";

const router: Router = express.Router();

/**
 * Update user profile properties
 * @param req Expects a key (as JSON) on the UserCollection that will be updated
 * @param res Replies with the updated user object
 */
const updateProfile = (req: Request, res: Response) => {
    const { id } = res.locals.authorizedData as UserToken;
    const patch = req.body;

    UserCollection.findById(id, (err, user) => {
        if (err) {
            res.status(500).json(Notifications.Server500);
            return;
        }

        if (!user) {
            res.status(500).json(Notifications.UserNotFound);
            return;
        }

        const userObj = user.toObject();
        const patchedUser = { ...userObj, ...patch };

        user.updateOne(patchedUser, { upsert: false }, (err) => {
            if (err) {
                res.status(500).json(Notifications.Server500);
                return;
            }

            // We do not want to expose id or password to the client
            let patchedUserResponse = patchedUser;
            delete patchedUserResponse._id;
            delete patchedUserResponse.password;

            // This isn't ideal, but updateOne on mongoose.Doc does not supply the updated doc
            res.status(200).json(patchedUserResponse);
            return;
        });
    });
};

router.patch("/user/profile", (req: Request, res: Response) => {
    updateProfile(req, res);
});

export default router;
