import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { SERVER_PORT } from "./utils/secrets";
import router from "./routes/createRouter";

// Express configuration
const app = express();
app.set("server_port", SERVER_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
