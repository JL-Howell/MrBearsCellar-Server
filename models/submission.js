const {DataTypes} =require('sequelize');
const db = require('../db')

const Submission = db.define('submission', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entry: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Submission;
