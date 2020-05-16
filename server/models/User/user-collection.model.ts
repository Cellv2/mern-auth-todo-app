import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

export interface IUserCollection extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    // TODO: Remove todos[] as part of #4
    todos: any[];
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
    // TODO: Remove todos[] as part of #4
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

userSchema.pre<IUserCollection>("save", function (next) {
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

const UserCollection = mongoose.model<IUserCollection>("User", userSchema);
export default UserCollection;
