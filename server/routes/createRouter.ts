import express, { Router } from "express";
import passport from "passport";

import addUser from "./api/users/add-user";
import loginUser from "./api/users/login-user";
import deleteUser from "./api/users/id/delete-user";
import updatePassword from "./api/users/id/password/update-password";
import getProfile from "./api/users/id/get-profile";
import updateProfile from "./api/users/id/update-profile";
import getTodos from "./api/users/todos/get-todos";
import addTodo from "./api/users/todos/add-todo";
import updateTodo from "./api/users/todos/id/update-todo";
import deleteTodo from "./api/users/todos/id/delete-todo";
import { isAuthorisedMiddleware } from "../middleware/is-authorised.middleware";

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

// -----
// PRIVATE ROUTES
// -----

/**
 * /api/user/todos
 */
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    isAuthorisedMiddleware,
    getTodos
);
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    isAuthorisedMiddleware,
    addTodo
);

/**
 * /api/user/todos/:id
 */
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    isAuthorisedMiddleware,
    updateTodo
);
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    isAuthorisedMiddleware,
    deleteTodo
);

/**
 * /api/user/profile
 */
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    isAuthorisedMiddleware,
    getProfile
);
router.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    isAuthorisedMiddleware,
    updateProfile
);

export default router;
