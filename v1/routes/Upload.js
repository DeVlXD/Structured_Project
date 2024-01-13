const router = require("express").Router();
const uploadService = require("../../services/UploadServices");
const Controller = require('../controllers');

router.post('/uploadFile', uploadService.upload.array('file'), Controller.UploadController.uploadFile);


module.exports = router;