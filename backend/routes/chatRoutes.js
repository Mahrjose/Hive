const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const { 
  accessChats, 
  fetchChats, 
  createGroupChat,
  renameGroupChat,
  addGroupUser,
  removeGroupUser
} = require("../controllers/chatControllers");


const router = express.Router();

// Related to one-to-one Chats
router.route('/').post(protect, accessChats);
router.route('/').get(protect, fetchChats);

// Related to GroupChats
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroupChat);
router.route('/addGroupUser').put(protect, addGroupUser);
router.route('/removeGroupUser').put(protect, removeGroupUser);

module.exports = router;