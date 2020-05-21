import express, { Router, Request, Response } from "express";

import UserCollection from "../../../../models/User/user-collection.model";

const router: Router = express.Router();

const updateProfile = (req: Request, res: Response) => {
    //temp - replace with token
    const id = "5eb9b6bd63c6c48b3427c097";
    const patch = req.body.patch;
    const parsedPatch = JSON.parse(patch);

    UserCollection.findById(id, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);

            return;
        }

        // TODO: Fix status and returned error
        if (!user) {
            res.statusCode = 500;
            res.json({ error: "There was an issue when retreiving the user" });

            return;
        }

        const userObj = user.toObject();
        const patchedUser = { ...userObj, ...parsedPatch };
        console.log("user:", userObj);
        console.log("patch:", parsedPatch);
        console.log("patchedUser:", patchedUser);

        res.json(patchedUser);
        return;
    });

    return;
};

router.patch("/user/profile", (req: Request, res: Response) => {
    updateProfile(req, res);
});

export default router;
