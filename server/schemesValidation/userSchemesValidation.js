const {body} = require("express-validator");

const userRegisterScheme = [[
    body('name')
        .exists().withMessage('Name is required')
        .notEmpty().withMessage('Name cannot be empty')
        .isString().withMessage('Name must be a string'),
    body('email')
        .exists().withMessage('Email is required')
        .notEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Email must be in a valid format')
        .normalizeEmail(),
    body('password')
        .exists().withMessage('Password is required')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]]

module.exports = {userRegisterScheme};