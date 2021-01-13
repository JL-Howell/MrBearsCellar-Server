const User = require('./user');
const Submission = require('./submission');
const Comment = require('./comment');
// const Images = require('./images');


// Submission.belongsTo(User);
// Comment.belongsTo(User);
// // Images.belongsTo(User);

// User.hasMany(Submission);
// User.hasMany(Comment);
// // User.hasMany(Images);
// Submission.hasMany(Comment);
// // Images.hasMany(Comments);


// User.hasMany(Images)
// Images.belongsTo(User)

module.exports = {User, Submission, Comment}