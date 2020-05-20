import express, { Router } from "express";
import passport from "passport";

import addUser from "./api/users/addUser";
import loginUser from "./api/users/loginUser";
import deleteUser from "./api/users/id/deleteUser";
import updatePassword from "./api/users/id/password/updatePassword";
import getProfile from "./api/users/id/get-profile";
import getTodos from "./api/users/todos/getTodos";
import addTodo from "./api/users/todos/addTodo";
import updateTodo from "./api/users/todos/id/updateTodo";
import deleteTodo from "./api/users/todos/id/deleteTodo";

const router: Router = express.Router();

// -----
// PUBLIC ROUTES
// -----

/**
 * /api/users
 */
router.use("/api", addUser);
router.use("/api", loginUser);

/**
 * /api/users/:id
 */
router.use("/api", deleteUser);

/**
 * /api/users/:id/password
 */
router.use("/api", updatePassword);

/**
 * /api/users/todos/:id
 */
router.use("/api", updateTodo);
router.use("/api", deleteTodo);

// -----
// PRIVATE ROUTES
// -----

/**
 * /api/user/todos
 */
router.use("/api", passport.authenticate("jwt", { session: false }), getTodos);
router.use("/api", passport.authenticate("jwt", { session: false }), addTodo);

/**
 * /api/user/profile
 */
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    getProfile
);

export default router;
