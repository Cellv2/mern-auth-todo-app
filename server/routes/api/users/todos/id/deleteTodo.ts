import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/users/todos/:id", (req: Request, res: Response) => {
    res.send("This is the delete route - the ID was " + req.params.id);
});

export default router;
