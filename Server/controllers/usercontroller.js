const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authRole} = require('../models/authRole');

const { UniqueConstraintError } = require('sequelize/lib/errors');

//CONNECT TO AWS ACCOUNT
aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

//Connets to AWS Acct & Multer to Upload Single Files
const picBucket = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    })
})

router.get('/test', (req, res) => res.send('this is a test!')); //this works

router.post('/signup', async (req, res) => {
  let { username, email, password, role, profilePic } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 13),
            role: role || 'user',
            profilePic
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

router.put("/update/:username", (req, res) => {
    User.update(req.body, {
        where: {
            username: req.params.username
        }
    })
        .then(profile => res.status(200).json(profile))
        .catch(err => res.json(req.errors));
})

router.put("/update/profile-pic/:username", picBucket.single('image'), (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        }
    }).then(user => {
        user.update({
            ProfilePic: req.file.location
        })
    }).then(profilePic => res.status(200).json(profilePic))
    .catch(err => res.status(500).json(err))
})



module.exports = router;