const User = require('./user');
const Submission = require('./submission');
const Comment = require('./comment');
const Images = require('./images');

User.hasMany(Submission);
Submission.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Submission.hasMany(Comment);
Comment.belongsTo(Submission)

module.exports = {User, Submission, Comment, Images}