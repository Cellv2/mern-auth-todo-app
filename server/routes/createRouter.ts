import express, { Router } from "express";
import addUser from "./api/users/addUser";
import getUser from "./api/users/id/getUser";
import deleteUser from "./api/users/id/deleteUser";
import updatePassword from "./api/users/id/password/updatePassword";

const router: Router = express.Router();

/**
 * /api/users
 */
router.use("/api", addUser);

/**
 * /api/users/:id
 */
router.use("/api", getUser);
router.use("/api", deleteUser);

/**
 * /api/users/:id/password
 */
router.use("/api", updatePassword);

export default router;
