const mongoose = require('mongoose/lib');

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;