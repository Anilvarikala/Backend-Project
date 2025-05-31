
const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController')
userRouter.get("/", userController.getHome)
userRouter.get("/pickle/:pickleId", userController.getPickleDetails)
userRouter.post("/favourite/:pickleId", userController.postFavouriteAdd)
userRouter.get('/favourites', userController.getFavourites)
userRouter.get("/favourite/remove/:pickleId", userController.getFavouriteRemove)
userRouter.get("/profile", userController.getProfile)
userRouter.post("/cart/:pickleId", userController.postCartAdd)
userRouter.get("/cart",userController.getCart)
userRouter.get("/cart/remove/:pickleId", userController.getRemovePickleFromCart)
module.exports = userRouter;
