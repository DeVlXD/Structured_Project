const asyncHandler = require("express-async-handler");
const Model = require("../../../models/Index");
const mongoose = require("mongoose");

const User = Model.User;

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!")
    }
    res.json({message: "Register the user"});
    // console.log("code is coming here");
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    } else{
        res.status(200);
        res.json({message: "Login succesful!"});
    }
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }

    await User.deleteOne();

    res.status(200).json(user);
});

dbconnect();

module.exports = {getUser, loginUser, updateUser, deleteUser, registerUser, getUsers};