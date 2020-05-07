// import mongoose from "mongoose";
import passport from "passport";
import passportJwt from "passport-jwt";
import UserCollection from "../models/User/user-collection.model";
import { secretOrKey } from "./secrets";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOpts: passportJwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey,
};

const strategy = new JwtStrategy(jwtOpts, (jwtPayload, done) => {
    UserCollection.findById(jwtPayload.id, (err, user) => {
        if (err) {
            console.error(err);
            return;
        }

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
});

const passportStrategy = (passport: passport.PassportStatic) => {
    passport.use(strategy);
};

export default passportStrategy;
