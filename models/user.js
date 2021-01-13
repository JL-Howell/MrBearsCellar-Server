const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        required: true
        },
    email: {
        type: DataTypes.STRING,
        required: true
        },
    password: {
        type: DataTypes.STRING,
        required: true
        },
    role: {
        type: DataTypes.ENUM('user', 'admin'), 
        defaultValue: 'user'
    },
});

module.exports = User;
 

