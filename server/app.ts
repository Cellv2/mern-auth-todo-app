import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
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

// test GET and serve
import mongoose from "mongoose";
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

app.get("/", (req, res) => {
    res.send("kek");
});
// import mongodb from "mongodb";
// const mongoClient = mongodb.MongoClient;
app.get("/api/kek", (req, res) => {
    // mongoClient.connect("mongodb://localhost:27017", (err, client) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(`We connected to mongodb`);
    // });
    res.json({ kek: "top kek" });
});

// Test passport-jwt authenticated route
app.get(
    "/api/testAuth",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.send("Authed");
    }
);

// router
app.use("/", router);

export default app;
