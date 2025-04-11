const {validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");

const registerUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        const errorMessage = errors.array().map(error => `${error.msg}`).join(', ');
        res.status(400)
        throw new Error(`Validation failed: ${errorMessage}`);
    }

    const {name, email, password, picture} = req.body;

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        picture,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
};


module.exports = { registerUser: asyncHandler(registerUser) }
