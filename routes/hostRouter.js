

const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get("/host/add-pickle", hostController.getPickleAdd)
hostRouter.post("/host/add-pickle", hostController.postPickleAdd)
hostRouter.get("/all-pickles", hostController.getAllPickles)
module.exports = hostRouter;