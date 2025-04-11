const express = require('express');
const {registerUser} = require('../controllers/userControllers');
const {userRegisterScheme} = require("../schemesValidation/userSchemesValidation");

const router = express.Router();

router.post('/', userRegisterScheme, registerUser);

module.exports = router;