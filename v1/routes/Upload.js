const router = require("express").Router();
const uploadService = require("../../services/UploadServices");
const Controller = require('../controllers');

router.post('/uploadFile', uploadService.uploadSingle.single('file'), Controller.UploadController.uploadFile);
router.post('/uploadFiles', uploadService.uploadMany.array('file'), Controller.UploadController.uploadManyFile);


module.exports = router;