const express = require('express');
const UserController = require('../Controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.post('/user/create-candidate', userController.registerAccountCandidate);
router.post('/user/login', userController.login);

module.exports = router;
