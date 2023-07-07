import mongoose from "mongoose";
import User from "../model/user.js";

const getMe = async (req, res, next) => {
    const { _id } =  req.user;

    let user = await User.findById(_id).select("-password");


    res.status(200).json({
        user
    })

    return user;
};

const changeName = async (req, res) => {
    const { newName } = req.body;
    const { _id } = req.user;

    try {
        let user = await User.findById(_id);

        user.fullName = newName;

        await user.save();
        
        return res.status(200).json({
            message: "Name updated successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const changeEmail = async (req, res) => {
    const { oldEmail, newEmail } = req.body;
    const { _id } = req.user;

    try {
        let user = await User.findById(_id);

        user.email = newEmail;

        await user.save();
        
        return res.status(200).json({
            message: "Email updated successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export {
    getMe,
    changeName,
    changeEmail,
}