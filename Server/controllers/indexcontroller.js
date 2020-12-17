// const { Router } = require('express');

// const User = require('../db').import('../models/user');
// const Submission = require('../db').import('../models/submissions');
// const Image = require('./db').import('../models/images');
// const Comment = require('./db').import('../models/comments');

// router.get('/all', function (req, res) {
//     return Submission.findAll( {include: [{model: User }]})
//     .then ((userinfo) => res.status(200).json(userinfo))
//     .catch((err) => res.status(500).json({ error: err }))
// })

// router.