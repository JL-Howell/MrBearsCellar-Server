module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('comments', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
    })
    return Comment;
};
