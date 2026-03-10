const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Yêu cầu 2 & 3: Phải đặt TRƯỚC các route có /:id để không bị nhầm lẫn route
router.post('/enable', userController.enableUser);
router.post('/disable', userController.disableUser);

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.softDeleteUser);

module.exports = router;