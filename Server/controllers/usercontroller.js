const router = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');

router.get('/test', (req, res) => res.send('this is a test!')); //this works

//SIGNUP
router.post('/signup', async (req, res) => {
    let { userName, email, password, admin } = req.body;

    try {
        const newUser = await User.create({
            userName,
            email,
            password: bcrypt.hashSync(password, 13),
            admin,
        })
        res.status(201).json({
            message: 'User registered!',
            user: newUser,
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Email already in use.'
            })
        } else {
            res.status(500).json({
                error: error,
                error: 'Failed to register user.'
            })
        }
    }
});

router.post('/login', async (req, res) => {
    let {userName, password} = req.body;
    try{
        let loginUser = await User.findOne({
            where: {userName}
        })
        if (loginUser && await bcrypt. compare(password, loginUser.password)){
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.status(200).json({
                message: 'Login was successful!',
                user: loginUser,
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Failed to login'
            })
        }
    } catch (error){
        res.status(500).json({error: 'Failed to login'})
    }
})

module.exports = router;