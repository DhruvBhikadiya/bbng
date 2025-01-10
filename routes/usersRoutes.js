const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/createUser', usersController.createUser);
router.get('/getAllUsers', usersController.getAllUsers);
router.post('/loginUser', usersController.loginUser);
router.put('/updateUser/:id', usersController.updateUser);
router.delete('/deleteUser/:id', usersController.deleteUser);

module.exports = router;