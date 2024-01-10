const express = require("express");
const UsersRoutes = require("./User");
// const uploadRoutes=require("./Upload");

const router = express.Router();

router.use("/user", UsersRoutes); 
// router.use("/upload",uploadRoutes);

module.exports = router;