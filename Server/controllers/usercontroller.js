const router = require('express').Router()
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');



router.post('/signup', async (req, res) => {
    try {
        let {userName, email, password, admin } = req.body;
        const newUser = await User.create({
            userName,
            email,
            password: bcrypt.hashSync(password, 13),
            admin
        })
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: 'User Signed up!',
            user: newUser,
            token: token
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                error: 'Username already in use.'
            })
        } else {
            res.status(500.).json({
                error: 'Error! User not signed up!'
            })
        }
    }
})

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