const express = require('express');

const authRouter = express.Router();
const authController = require('../controllers/authController')

authRouter.get("/signup", authController.getSignup)
authRouter.post("/signup",authController.postSignup)
authRouter.post("/login",authController.postLogin)
authRouter.get("/login", authController.getLogin)
authRouter.post("/logout", authController.postLogout)
module.exports = authRouter;