import express from "express";

const router = express.Router();

router.get("/users/:id/password/updatePassword", (req, res) => {
    res.json({ updatePassword: "updatePassword.ts" });
});

export default router;
