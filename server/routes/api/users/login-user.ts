import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import UserCollection from "../../../models/User/user-collection.model";
import validateLogin from "../../../utils/validations/validate-login";
import { secretOrKey } from "../../../utils/secrets";

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
            res.sendStatus(500);

            return;
        }

        if (!user) {
            res.status(404).json({ emailNotFound: "The email was not found" });

            return;
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                res.status(401).json({
                    passwordError: "The password was incorrect",
                });

                return;
            } else {
                const jwtPayload = {
                    id: user.id,
                    username: user.name,
                };

                jwt.sign(
                    jwtPayload,
                    secretOrKey,
                    { expiresIn: 300 },
                    (err, token) => {
                        if (err) {
                            console.error(
                                "JWT could not sign the token - ",
                                err
                            );

                            res.status(500).json({
                                tokenSignError: "The token could not be signed",
                            });

                            return;
                        }

                        res.status(200).json({ token: `Bearer ${token}` });

                        return;
                    }
                );
            }
        });
    });

    return;
};

router.post("/users/login", (req: Request, res: Response) => {
    loginUser(req, res);
});

export default router;
