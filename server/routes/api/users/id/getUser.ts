import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/users/:id/getUser", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    res.json({ getUser: "getUser.ts", id: id });
});

export default router;
