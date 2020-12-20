const {DataTypes} =require('sequelize');
const db = require('../db')

const Comments = db.define('comment', {
        username: {
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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 5
            }
        },
});

module.exports = Comments;
   