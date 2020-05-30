import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import ToDoCollection from "../Todo/todo-collection.model";

const Schema = mongoose.Schema;

export interface UserCollection extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    theme: string;
}

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        default: "light",
    },
});

userSchema.pre<UserCollection>("save", function (next) {
    if (this.isModified("password")) {
        return bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }

            this.password = hash;
            next();
        });
    }
});

userSchema.pre<UserCollection>("findOneAndDelete", function (next) {
    //@ts-expect-error
    const mongooseQuery: mongoose.Query<UserCollection> = this;
    const userIdToRemove = mongooseQuery.getQuery()._id;
    const deleteQuery = { userid: userIdToRemove };
    console.log(deleteQuery);

    ToDoCollection.deleteMany(deleteQuery, (err) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            next();
        }
    });
});

const UserCollection = mongoose.model<UserCollection>("User", userSchema);
export default UserCollection;
