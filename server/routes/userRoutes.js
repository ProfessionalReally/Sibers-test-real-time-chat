const express = require('express');
const {registerUser, authUser} = require('../controllers/userControllers');
const {userRegisterScheme, userAuthScheme} = require("../schemesValidation/userSchemesValidation");

const router = express.Router();

router.post('/', userRegisterScheme, registerUser);
router.post('/login', userAuthScheme, authUser);
module.exports = router;