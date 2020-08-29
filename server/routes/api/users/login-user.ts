import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Notifications } from "../../../../client/src/constants/notifications";

import UserCollection from "../../../models/User/user-collection.model";
import validateLogin from "../../../utils/validations/validate-login";
import { secretOrKey } from "../../../utils/secrets";

const router: Router = express.Router();

const loginUser = (req: Request, res: Response): void => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        // this should never happen, but just to be on the safe side we can return an error 500
        if (Object.keys(errors).length === 0) {
            res.status(500).json(Notifications.UserLoginFailed);
            return;
        }

        // we have to have an error at this point as it's a requirement for isValid to be false
        // these will be login errors, so should be an authorisation issue (hence 401)
        const firstError = Object.values(errors)[0];
        let response = Notifications.UserLoginFailed;
        response.message = firstError!;
        res.header("WWW-Authenticate: Bearer realm='mern-auth-todo-app'")
            .status(401)
            .json(response);
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const query = { email: email };

    UserCollection.findOne(query, (err, user) => {
        if (err) {
            res.status(500).json(Notifications.UserLoginFailed);
            return;
        }

        if (!user) {
            res.status(404).json(Notifications.UserLoginFailedEmailNotFound);
            return;
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                res.header("WWW-Authenticate: Basic realm='mern-auth-todo-app'")
                    .status(401)
                    .json(Notifications.UserLoginFailedPasswordIncorrect);

                return;
            } else {
                const jwtPayload = {
                    id: user.id,
                };

                jwt.sign(
                    jwtPayload,
                    secretOrKey,
                    { expiresIn: 300 },
                    (err, token) => {
                        if (err) {
                            res.status(500).json(Notifications.UserLoginFailed);
                            return;
                        }

                        res.status(200).json({
                            token: `Bearer ${token}`,
                            theme: user.theme,
                            username: user.name,
                        });

                        return;
                    }
                );
            }
        });
    });

    return;
};

router.post("/user/login", (req: Request, res: Response) => {
    loginUser(req, res);
});

export default router;
