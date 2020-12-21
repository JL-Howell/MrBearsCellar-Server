const {DataTypes} =require('sequelize');
const db = require('../db')

const Images = db.define('image', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
        },
});

module.export = Images;

