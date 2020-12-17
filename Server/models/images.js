module.exports = function (sequelize, DataTypes) {
    const Image = sequelize.define('images', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BINARY-STRING,
            allowNull: false
        },
    })
    return Image;
};

