const express = require("express");
const userRouter = express.Router();

const authentication = require("../Middleware/Authentication");

const getUser = require("../Controllers/getUser");
const getAllUsers = require("../Controllers/getAllUsers");
const update = require("../Controllers/update");
const remove = require("../Controllers/delete");
const changePassword = require("../Controllers/changePassword");

//* Get user
userRouter.get("/get", authentication, getUser);

//* Get all Users 
userRouter.get("/get/allUsers", authentication, getAllUsers);

//* Update user
userRouter.patch("/update", authentication, update);

//* Delete user
userRouter.delete("/delete", authentication, remove);

//* Update password
userRouter.post("/update/password", authentication, changePassword);

module.exports = userRouter