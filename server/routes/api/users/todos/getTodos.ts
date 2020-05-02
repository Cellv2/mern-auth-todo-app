import express, { Request, Response } from "express";

const router = express.Router();

router.get("/users/todos", (req: Request, res: Response) => {
    res.send("getTodos.ts");
});

export default router;
