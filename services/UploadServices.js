const multerS3 = require('multer-s3');
const multer = require("multer");
const aws = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// const s3Client = new S3Client({
//     region: "ap-south-1",
//     credentials: {
//         accessKeyId: ",
//         secretAccessKey: "",
//     },
// });
// const s3 = new S3Client();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_KEY
});
let s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, (Date.now() + file.originalname)); //using Date.now() for unique file keys
        }
    })
});

module.exports.uploadSingle = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, (Date.now() + file.originalname)); //using Date.now() for unique file keys
        }
    }),
    limits: {
       fileSize: 8000000 // Compliant: 8MB
    }
});

module.exports.uploadMany = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        ACL : "public-read",
        key: function (req, files, cb) {
            if(files.fieldname == "files"){
                console.log(req.files);
                let fileName = files.originalname;
                s3.deleteObject({
                    bucket: process.env.AWS_BUCKET,
                    Key: fileName
                }, function (err) {
                    if (err) {
                        return cb(new Error('Image not found'));
                    }
                    console.log("success");
                });
                setTimeout(() => {
                    cb(null, (Date.now() + files.originalname)); //using Date.now() for unique file keys
                }, 200);
              }else {
                cb(null, false);
                return cb(new Error('Invalid File Format: Only .png, .jpg and .jpeg format allowed!'));
              }
        }
    })
});