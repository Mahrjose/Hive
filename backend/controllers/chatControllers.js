const asyncHandler = require("express-async-handler");

const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

// Responsible for creating or fetching one-on-one chats
const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  if(!userId){
    console.log("UserId params not send with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } }
    ],
  }).populate("users", "-password").populate("latestMessage");

  ischat = await User.populate(isChat, { 
    path: "latestMessage.sender", 
    select:"name pic email", 
  });

  if (ischat.length > 0 ) {
    res.send(ischat[0]);
  
  } else {  
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
      res.status(200).send(FullChat)
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }

});

// Responsible for fetching all chats for a user
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({users: {$elemMatch: { $eq: req.user._id }} })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, { 
        path: "latestMessage.sender", 
        select:"name pic email", 
      });
      
      res.status(200).send(results);
    })
  } catch (error) {
    res.send(400);
    throw new Error(error.message);
  }
});

// Responsible for creating a group chat
const createGroupChat = asyncHandler(async (req, res) => {

  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Please Fill all the fields");
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
    .status(400)
    .send("Group chat must have at least 2 users");
  }

  users.push(req.user);

  try {    
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({_id: groupChat._id})
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    res.status(200).send(fullGroupChat);
  
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Responsible for renaming a group chat
const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName : chatName, },
    { new: true }
  ).populate("users", "-password").populate("groupAdmin", "-password");
  
  if(!updatedChat){
    res.status(404);
    throw new("Chat not found!");
  } else {
    res.json(updatedChat);
  }
});

// Responsible for adding a user to a group chat
const addGroupUser = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  ).populate("users", "-password").populate("groupAdmin", "-password");

  if(!added){
    res.status(404);
    throw new("Chat not found!");
  }else {
    res.json(added);
  }
});

// Responsible for removing a user from a group chat
const removeGroupUser = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  ).populate("users", "-password").populate("groupAdmin", "-password");

  if(!removed){
    res.status(404);
    throw new("Chat not found!");
  }else {
    res.json(removed);
  }
});

module.exports = {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addGroupUser,
  removeGroupUser,
};