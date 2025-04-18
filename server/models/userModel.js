const mongoose = require('mongoose/lib');
const bcrypt = require('bcryptjs');

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
            required: true,
            default: 'https://i.pinimg.com/736x/50/d4/4b/50d44b920aa1dfdf47b217eabf484cbd.jpg'
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {timestamps: true}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;