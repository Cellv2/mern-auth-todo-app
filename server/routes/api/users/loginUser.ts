import express, { Router, Request, Response } from "express";

import UserCollection from "../../../models/User/user-collection.model";
import validateLogin from "../../../utils/validations/validate-login";

const router: Router = express.Router();

const loginUser = (req: Request, res: Response): void => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        res.status(400).json(errors);

        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const query = { email: email };

    UserCollection.findOne(query, (err, user) => {
        if (err) {
            console.error(err);
        }

        if (!user) {
            res.status(404).json({ emailError: "The email was not found" });

            return;
        }

        //@ts-ignore
        if (password !== user.password) {
            res.status(401).json({
                passwordError: "The password was incorrect",
            });

            return;
        }

        // TODO: Add bearer token
        res.status(200).json({ success: true, token: `Bearer token` });
    });

    return;
};

router.post("/users/login", (req: Request, res: Response) => {
    loginUser(req, res);
});

export default router;
