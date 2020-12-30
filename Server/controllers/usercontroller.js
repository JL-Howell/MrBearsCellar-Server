const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/signup', async (req, res) => {
  let { username, email, password, role } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 13),
            role: role || 'user',
            
        });
        res.status(201).json({
            message: 'User registered!',
            user: newUser
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username or Email is taken, try again.'
            })
        } else {
            res.status(500).json({
                error: error,
                error: 'Could not signup user!'
            })
        }
    }
});

//User Login Route
router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    try{
        let userLogin = await User.findOne({
            where: {username}
        })
        if (userLogin && await bcrypt. compare(password, userLogin.password)){
            const token = jwt.sign({id: userLogin.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.status(200).json({
                message: 'Login was successful!',
                user: userLogin,
                token: token
            })
            await User.findByIdAndUpdate(user.id, {token})
            res.status(200).json({
                data: { username: user.username, role: user.role},
                token
            })
        } 
    } catch (error){
        res.status(500).json({error: 'Failed to login'})
    }
});

router.get('/find', (req, res) => {
    User.findOne ({
        where: { username: req.body.username }
    })
    .then(profile => res.status(200).json(profile))
    .catch (err => res.status(500).json ({
        error: err
    }))
});

module.exports = router;