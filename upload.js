const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, DIR),
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.single('photo'), (req, res) => {
    console.log('Upload route hit');
    if (!req.file) return res.status(400).send({ message: 'Please upload a file.' });

    res.status(200).send({
        message: 'File uploaded successfully',
        file: req.file,
    });
});

module.exports = router;
