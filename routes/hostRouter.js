

const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();



hostRouter.get("/host/add-pickle", hostController.getPickleAdd)
hostRouter.post("/host/add-pickle", hostController.postPickleAdd)
hostRouter.get("/all-pickles", hostController.getAllPickles)
hostRouter.get("/host/host-pickles", hostController.getHostPickles)
hostRouter.get("/host/delete-pickle/:pickleId", hostController.getDeletePickle);
hostRouter.get("/host/edit-pickle/:pickleId", hostController.getEditPickle)
hostRouter.post("/host/edit-pickle/:pickleId", hostController.postEditPickle);
module.exports = hostRouter;
