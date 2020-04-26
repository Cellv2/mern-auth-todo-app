import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/users/addUser", (req: Request, res: Response) => {
    res.json({ addUser: "addUser.ts" });
});

export default router;
