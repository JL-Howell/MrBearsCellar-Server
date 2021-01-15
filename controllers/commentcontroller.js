const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const validateSession = require('../middleware/ValidateSession');

router.get('/practice', (req, res) => res.send('Hey!! This is a practice route'));

//CREATE COMMENTS & RATING
router.post('/create/:id', validateSession, async (req, res) => {
    const {username, date, entry, rating} = req.body;
    try {
        let newComment = await Comment.create({username, date, entry, rating, userId: req.user.id, submissionId: req.params.id});
        res.status(200).json({
            comment: newComment,
            message: 'Comment added to submission!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add comment!'
        })
    }
});

// GET ALL ENTRIES (http://localhost:4000/comment/)
router.get('/', (req, res) => {
    Comment.findAll ()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({ error: err}))
});

//GET COMMENTS BY USER (http://localhost:4000/comment/mine (plus the token id))
router.get("/mine", validateSession, (req, res) => {
    let userId = req.user.id
    Comment.findAll ({
        where: { userId: userId }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({ error: err }))
});


//COMMENTS UPDATE (http://localhost:4000/comment/update/2 (put entry number to update!))

router.put("/:id", (req, res) => {
    const query = req.params.id;

    Comment.update(req.body,
        { where: { id: query } })
        .then((commentUpdate) => {
            Comments.findOne({
                where: {
                    id: query
                }
            })
                .then((locatedUpdatedComment) => {
                    res.status(200).json({
                        comment: locatedUpdatedComment,
                        message: "Comment updated successful",
                        commentChanged: commentUpdate,
                    });
                });
        })

        .catch((err) => res.json(err));
});



//COMMENT DELETE (http://localhost:4000/delete/9 (put entry number to delete!))

// 
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json(err))

})
module.exports = router;