import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

const updateProfile = (req: Request, res: Response) => {
    res.send("PATCH - /user/profile");
};

router.patch("/user/profile", (req: Request, res: Response) => {
    updateProfile(req, res);
});

export default router;
