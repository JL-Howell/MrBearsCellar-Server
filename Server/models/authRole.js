const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const authRoles = function () {
    ac.grant('user')
        .readOwn('user')
        .updateOwn('user')
        .create('submission')
        .createOwn('images')
        .createOwn('comment')
        .updateOwn('submission')
        .updateOwn('images')
        .updateOwn('comment')
        .deleteOwn('submission')
        .deleteOwn('images')
        .deleteOwn('comment')

    ac.grant('admin')
        .extend('user')
        .updateAny('user')
        .deleteAny('user')
        .deleteAny('submission')
        .deleteAny('images')
        .deleteAny('comment')
};

module.exports = authRoles;
