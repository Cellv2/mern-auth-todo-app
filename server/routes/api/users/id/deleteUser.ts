import express from "express";

const router = express.Router();

router.get("/users/:id/deleteUser", (req, res) => {
    res.json({ deleteUser: "deleteUser.ts" });
});

export default router;
