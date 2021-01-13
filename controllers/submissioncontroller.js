const express = require('express');
const router = express.Router();
const Submission = require('../models/submission');
const validateSession = require('../middleware/ValidateSession');


//CREATE SUBMISSION
router.post('/create', validateSession, async (req, res) => {
    try {
        const {title, date, entry} = req.body;
        let newSubmission = await Submission.create({ title, date, entry, owner: req.user.id});
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
    .then(submissions => res.status(200).json(submissions))
    .catch(err => res.status(500).json({ error: err}))
});

//GET SUBMISSIONS BY USER (http://localhost:4000/submission/mine (plus the token id))
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Submission.findAll ({
        where: { owner: userid }
    })
        .then(submissions => res.status(200).json(submissions))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ITEMS BY TITLE: (http://localhost:4000/submission/Krampus (title of submission))
router.get('/:title', function (req, res) {
    let title = req.params.title;

    Submission.findAll({
        where: { title: title }
    })
    .then(submissions => res.status(200).json(submissions))
    .catch(error => res.status(500).json({ error: error.message || serverErrorMsg }))
});

//SUBMISSIONS UPDATE (http://localhost:4000/update/2 (put entry number to update!))
router.put('/update/:entryId', validateSession, function (req, res) {
    const updateSubmissionEntry = {
        title: req.body.submission.title,
        date: req.body.submission.date,
        entry: req.body.submission.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id }};

    Submission.update(updateSubmissionEntry, query)
        .then(() => res.status(200).json({message: 'Submission has been updated!'}))
        .catch((error) => res.status(500).json({ error: error.message || serverErrorMsg  }));
});

//SUBMISSION DELETE (http://localhost:4000/delete/9 (put entry number to delete!))

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: {id: req.params.id, owner: req.user.id }};

    Submission.destroy(query)
        .then(() => res.status(200).json({ message: 'Submission Entry Removed '}))
        .catch((err) => res.status(500).json ({ error: err }));
});

module.exports = router;