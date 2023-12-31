import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken, verifyToken } from "../util/jwtUtil.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    favBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FavBook",
    }]
});

// favBooks: {
//     type:mongoose.Schema.Types.ObjectId,
// }

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return comparePassword(password, this.password)
}

userSchema.methods.generateToken = async function() {
    return generateToken(this._id);
}

userSchema.methods.verifyToken = async function(token) {
    return verifyToken(token);
}

const User = mongoose.model("User", userSchema);

export default User;