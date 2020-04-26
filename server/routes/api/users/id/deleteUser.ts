import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/users/:id/deleteUser", (req: Request, res: Response) => {
    res.json({ deleteUser: "deleteUser.ts" });
});

export default router;
