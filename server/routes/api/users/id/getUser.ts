import express from "express";

const router = express.Router();

router.get("/users/:id/getUser", (req, res) => {
    res.json({ getUser: "getUser.ts" });
});

export default router;
