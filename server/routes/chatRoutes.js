const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const {
    accessChat,
    fetchChats,
    createGroup,
    renameGroup,
    addToGroup,
    removeFromGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

router.post('/', protect, accessChat);
router.get('/', protect, fetchChats);
router.post('/group', protect, createGroup);
router.put('/rename', protect, renameGroup);
router.put('/groupadd', protect, addToGroup);
router.put('/groupremove', protect, removeFromGroup);

module.exports = router;


