import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

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
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        //@ts-expect-error
        return bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }

            //@ts-expect-error
            this.password = hash;
            next();
        });
    }
});

const UserCollection = mongoose.model("User", userSchema);
export default UserCollection;
