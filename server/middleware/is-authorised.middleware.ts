import { Request, Response, NextFunction } from "express";

export const myLogger = function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("LOGGED");
    next();
};
