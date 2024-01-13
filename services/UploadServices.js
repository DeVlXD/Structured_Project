const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb (null, `${Date.now()}-${file.originalname}`);
    }
});

module.exports.upload = multer({ 
    storage,
    limits: {
        fileSize: 10000000, files: 2
    }
});