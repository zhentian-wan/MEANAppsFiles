/**
 * Created by Answer1215 on 5/25/2015.
 */
var express = require('express'),
    router = express.Router(),
    auth = require('../config/auth'),
    users = require('../controller/usersController');

router.route('/')
    .get(auth.requireRole('admin'), users.getUsers)
    .post(users.createUser)
    .put(users.updateUser);

router.route('/:id')
    .delete(auth.requireRole('admin'), users.deleteUserById);


module.exports = router;


