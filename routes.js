const express = require('express');
const multer = require('multer');
const { v4 } = require('uuid');

const DIR = 'uploads/';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, DIR);
    },
    filename: function(req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, v4() + '-' + fileName);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const routes = function(router) {
    const uploadRouter = express.Router();

    uploadRouter.post('/upload', upload.single('photo'), function(req, res) {
        const documentFile = req.file;
        res.send(documentFile);
    });

    router.use('/', uploadRouter);
    router.use("/files", express.static('uploads'));
};

module.exports = routes;
