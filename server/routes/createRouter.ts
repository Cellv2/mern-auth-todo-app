import express from "express";

const router = express.Router();

router.get("/api/xyz", (req, res) => {
    res.json({ test: "test" });
});

export default router;
