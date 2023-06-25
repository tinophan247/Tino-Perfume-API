const express = require("express");
const { Login } = require("../controllers/login.controller.js");
const { Register } = require("../controllers/register.controllers.js");
const customerRouter = express.Router();

customerRouter.post("/login",Login);
customerRouter.post("/register",Register);


module.exports = {
    customerRouter
}