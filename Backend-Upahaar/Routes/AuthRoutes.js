const express = require("express");
const authRouter = express.Router();

const authentication = require("../Middleware/Authentication");

const signup = require("../Controllers/signup");
const login = require("../Controllers/login");
const logout = require("../Controllers/logout");

//* Signup
authRouter.post("/signup", signup);

//* Login
authRouter.post("/login", login);

//* logout
authRouter.post("/logout", authentication, logout);


module.exports = authRouter;