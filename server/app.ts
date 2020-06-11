import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import passportStrategy from "./utils/passport-strategy";

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

// JWT config
app.use(passport.initialize());
passportStrategy(passport);

// mongoose setup
// TODO: Connect this to some cloud provider
const mongoUrl: string = "mongodb://localhost:27017";
mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Successfully connected to mongodb");
    })
    .catch((err) => {
        console.error(
            "There was an error while connecting to mongodb - the error was",
            err
        );
    });

// router
app.use("/", router);

export default app;
