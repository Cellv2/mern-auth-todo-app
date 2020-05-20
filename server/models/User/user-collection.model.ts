import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

export interface UserCollection extends mongoose.Document {
    name: string;
    email: string;
    password: string;
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

const UserCollection = mongoose.model<UserCollection>("User", userSchema);
export default UserCollection;
