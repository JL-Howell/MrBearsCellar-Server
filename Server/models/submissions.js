module.exports = function (sequelize, DataTypes) {
    const Submission = sequelize.define('submissions', {
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
    return Submission;
};
