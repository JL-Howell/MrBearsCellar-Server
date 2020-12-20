const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const { UniqueConstraintError } = require('sequelize/lib/errors');

router.get('/test', (req, res) => res.send('this is a test!')); //this works


router.post('/signup', async (req, res) => {
   
    let { username, email, password, role } = req.body;

    try {
        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 13),
            role
        })
        let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.status(201).json({
            message: 'User registered!',
            user: newUser,
            sessionToken: token
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username or Email already taken.'
            })
        } else {
            res.status(500).json({
                error: error,
                error: 'Failed to signup user.'
            })
        }
    }
});

//User Login Route
router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    try{
        let loginUser = await User.findOne({
            where: {username}
        })
        if (loginUser && await bcrypt. compare(password, loginUser.password)){
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
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