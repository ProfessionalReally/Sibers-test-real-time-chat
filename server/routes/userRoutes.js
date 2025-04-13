const express = require('express');
const {registerUser, authUser, searchUsers} = require('../controllers/userControllers');
const {userRegisterScheme, userAuthScheme} = require("../schemesValidation/userSchemesValidation");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', protect, searchUsers);
router.post('/', userRegisterScheme, registerUser);
router.post('/login', userAuthScheme, authUser);

module.exports = router;