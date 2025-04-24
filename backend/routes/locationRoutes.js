const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/LocationController');

// POST: Thêm một địa điểm mới
router.post('/', LocationController.createLocation);

// GET: Lấy tất cả địa điểm
router.get('/', LocationController.getAllLocations);

// GET: Lấy thông tin một địa điểm theo ID
router.get('/:id', LocationController.getLocationById);

// PUT: Cập nhật thông tin một địa điểm
router.put('/:id', LocationController.updateLocation);

// DELETE: Xóa một địa điểm
router.delete('/:id', LocationController.deleteLocation);

module.exports = router;