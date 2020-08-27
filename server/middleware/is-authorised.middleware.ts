import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { secretOrKey } from "../../server/utils/secrets";
import { UserToken } from "../../client/src/types/user.types";
import { Notifications } from "../../client/src/constants/notifications";

/**
 * Checks whether the bearer token is present and valid
 * If it is, it sets res.locals.authorizedData to be the token itself
 * @returns {UserToken} res.locals.authorizedData
 */
export const isAuthorisedMiddleware = function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.headers.authorization) {
        res.header("WWW-Authenticate: Bearer realm='mern-auth-todo-app'")
            .status(401)
            .json(Notifications.UserNotAuthorized);

        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, authorizedData) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        if (!authorizedData) {
            res.header("WWW-Authenticate: Bearer realm='mern-auth-todo-app'")
                .status(401)
                .json(Notifications.UserNotAuthorized);
            return;
        } else {
            // TODO: Would be nice to find a way to correctly type this, but it's not the end of the world
            res.locals.authorizedData = authorizedData as UserToken;
            return next();
        }
    });

    return;
};
