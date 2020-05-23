import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserCollection from "../../../../models/User/user-collection.model";
import { secretOrKey } from "../../../../utils/secrets";

const router: Router = express.Router();

/**
 * Update user profile properties
 * @param req Expects a key (as JSON) on the UserCollection that will be updated
 * @param res Replies with the updated user object
 */
const updateProfile = (req: Request, res: Response) => {
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
            res.sendStatus(401);
            return;
        } else {
            //@ts-expect-error
            const id = authorizedData.id;
            const patch = req.body;

            UserCollection.findById(id, (err, user) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);

                    return;
                }

                // TODO: Fix status and returned error
                if (!user) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        error: "There was an issue when retrieving the user",
                    });

                    return;
                } else {
                    const userObj = user.toObject();
                    const patchedUser = { ...userObj, ...patch };

                    user.updateOne(patchedUser, { upsert: false }, (err) => {
                        if (err) {
                            console.error(err);
                            res.sendStatus(400);

                            return;
                        }

                        // We do not want to expose id or password to the client
                        let patchedUserResponse = patchedUser;
                        delete patchedUserResponse._id;
                        delete patchedUserResponse.password;

                        // This isn't ideal, but updateOne on mongoose.Doc does not supply the updated doc
                        res.json(patchedUserResponse);
                        return;
                    });

                    return;
                }
            });
        }

        return;
    });

    return;
};

router.patch("/user/profile", (req: Request, res: Response) => {
    updateProfile(req, res);
});

export default router;
