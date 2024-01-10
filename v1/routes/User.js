const Controller = require('../controllers/index');
const router = require('express').Router();

// const {getUser, loginUser, updateUser, deleteUser, registerUser, getUsers} = require("../controllers/userController");

router.get("/:id", Controller.UserController.getUser);

router.get("/", Controller.UserController.getUsers);

router.post("/login", Controller.UserController.loginUser);

router.post("/register", Controller.UserController.registerUser);

router.put("/:id", Controller.UserController.updateUser);

router.delete("/:id", Controller.UserController.deleteUser);

module.exports = router;