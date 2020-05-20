import express, { Router, Request, Response } from "express";

import UserCollection from "../../../models/User/user-collection.model";
import validateRegistration from "../../../utils/validations/validate-registration";

const router: Router = express.Router();

const addUser = (req: Request, res: Response): void => {
    const { errors, isValid } = validateRegistration(req.body);

    if (!isValid) {
        res.status(400).json(errors);

        return;
    }

    // check whether email is already in use before registering
    const email = req.body.email;
    const query = { email: email };
    UserCollection.findOne(query, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);

            return;
        }

        if (user) {
            res.status(400).json({ email: "Email is already in use" });

            return;
        }

        const newUser = new UserCollection({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        newUser.save((err) => {
            if (err) {
                console.log(err);
            }

            res.status(201).json(newUser);
        });

        return;
    });

    return;
};

router.post("/users/addUser", (req: Request, res: Response) => {
    addUser(req, res);
});

export default router;
