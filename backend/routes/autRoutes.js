const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/autMiddleware'); // Sửa đường dẫn từ middleware thành middlewares

// Đăng ký người dùng mới
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Lấy thông tin profile của người dùng đã đăng nhập
router.get('/profile', authMiddleware.verifyToken, authController.getProfile);

module.exports = router;