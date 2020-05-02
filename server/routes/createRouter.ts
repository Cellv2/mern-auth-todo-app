import express, { Router } from "express";
import addUser from "./api/users/addUser";
import getUser from "./api/users/id/getUser";
import deleteUser from "./api/users/id/deleteUser";
import updatePassword from "./api/users/id/password/updatePassword";
import getTodos from "./api/users/todos/getTodos";
import addTodo from "./api/users/todos/addTodo";
import updateTodos from "./api/users/todos/id/updateTodos";

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

/**
 * /api/users/todos
 */
router.use("/api", getTodos);
router.use("/api", addTodo);

/**
 * /api/users/todos/:id
 */
router.use("/api", updateTodos);

export default router;
