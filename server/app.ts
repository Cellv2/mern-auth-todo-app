import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./utils/secrets";
import router from "./routes/createRouter";

// Express configuration
const app = express();
app.set("server_port", SERVER_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS config
// TODO: Update CORS headers
app.use(cors());
app.options("*", cors());

// test GET and serve
app.get("/", (req, res) => {
    res.send("kek");
});
app.get("/api/kek", (req, res) => {
    res.json({ kek: "top kek" });
});

// router
app.use("/", router);

export default app;
