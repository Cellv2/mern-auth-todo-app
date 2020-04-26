import express from "express";

const router = express.Router();

router.get("/users/addUser", (req, res) => {
    res.json({ addUser: "addUser.ts" });
});

export default router;
