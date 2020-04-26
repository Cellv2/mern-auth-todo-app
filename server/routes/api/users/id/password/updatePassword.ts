import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get(
    "/users/:id/password/updatePassword",
    (req: Request, res: Response) => {
        res.json({ updatePassword: "updatePassword.ts" });
    }
);

export default router;
