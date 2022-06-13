const express = require('express');
const router = express.Router();
const {Submission} = require('../models');
const validateSession = require('../middleware/ValidateSession');

const AWS = require('aws-sdk');

const multerS3 = require('multer-s3');
const multer = require('multer');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucket: process.env.BUCKET_NAME
});


const image = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log(req.body);
            cb(null, { fieldName: file.fieldname });
          },
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
});

//CREATE SUBMISSION -  
router.post('/create', validateSession, image.single('image'), async (req, res) => {
    try {
        const { title, date, entry, imageUrl } = req.body;
        let newSubmission = await Submission.create({ title, date, entry, imageUrl: req.file.location, userId: req.user.id, submissionId: req.user.id});
        res.status(200).json({
            submission: newSubmission,
            message: 'Submission Created!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Submission not created!'
        })
    }
});

// GET ALL ENTRIES (http://localhost:4000/submission/)
router.get('/', (req, res) => {
    Submission.findAll ()
    .then(submission => res.status(200).json(submission))
    .catch(err => res.status(500).json({ error: err}))
});

//GET SUBMISSIONS BY USER (http://localhost:4000/submission/mine (plus the token id))
router.get("/mine", validateSession, (req, res) => {
    let userId = req.user.id
    Submission.findAll ({
        where: { userId: userId }
    })
        .then(submission => res.status(200).json(submission))
        .catch(err => res.status(500).json({ error: err }))
});


//SUBMISSIONS UPDATE (http://localhost:4000/submission/update/2 

router.put("/update/:id", validateSession, image.single('image'), (req, res) => {
    const query = req.params.id;
    const { title, date, entry, imageUrl } = req.body;
     Submission.update({title, date, entry, imageUrl: req.file.location},
        {where: {id: query}})
        .then((subUpdate) => {
           Submission.findOne({
                where: {
                    id: query
                }
            })
            .then((locateUpdateSub) => {
                res.status(200).json({
                    sub: locateUpdateSub,
                    message: 'Post update successful!',
                    subChanged: subUpdate,
                })
            })
            .catch((err) => res.json(err))
        })
});

//SUBMISSION DELETE (http://localhost:4000/delete/9 (put entry number to delete!))

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: {id: req.params.id, userId: req.user.id }};
    
    Submission.destroy(query)
    .then(() => res.status(200).json({ message: 'Submission Entry Removed '}))
    .catch((err) => res.status(500).json ({ error: err }));
});


module.exports = router;