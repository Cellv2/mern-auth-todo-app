import express from "express";
import { SERVER_PORT } from "./utils/secrets";

// Express configuration
const app = express();
app.set("server_port", SERVER_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
