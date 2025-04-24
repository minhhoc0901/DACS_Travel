const Location = require('../models/Location');

// Create: Thêm một địa điểm mới
exports.createLocation = async (req, res) => {
    try {
        const { name, subtitle, introduction, why_visit_architecture_title, why_visit_architecture_text, why_visit_culture, ticket_price, tip } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name) {
            return res.status(400).json({ error: 'Tên địa điểm là bắt buộc' });
        }

        const locationId = await Location.createLocation({
            name,
            subtitle,
            introduction,
            why_visit_architecture_title,
            why_visit_architecture_text,
            why_visit_culture,
            ticket_price,
            tip
        });

        res.status(201).json({ message: 'Thêm địa điểm thành công', locationId });
    } catch (error) {
        console.error('Lỗi khi thêm địa điểm:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Read: Lấy tất cả địa điểm
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Read: Lấy thông tin một địa điểm cụ thể
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.getLocationById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Không tìm thấy địa điểm' });
        }
        res.status(200).json(location);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Update: Cập nhật thông tin một địa điểm
exports.updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const { name, subtitle, introduction, why_visit_architecture_title, why_visit_architecture_text, why_visit_culture, ticket_price, tip } = req.body;

        // Kiểm tra xem địa điểm có tồn tại không
        const existingLocation = await Location.getLocationById(locationId);
        if (!existingLocation) {
            return res.status(404).json({ error: 'Không tìm thấy địa điểm' });
        }

        // Kiểm tra dữ liệu đầu vào
        if (!name) {
            return res.status(400).json({ error: 'Tên địa điểm là bắt buộc' });
        }

        await Location.updateLocation(locationId, {
            name,
            subtitle,
            introduction,
            why_visit_architecture_title,
            why_visit_architecture_text,
            why_visit_culture,
            ticket_price,
            tip
        });

        res.status(200).json({ message: 'Cập nhật địa điểm thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật địa điểm:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Delete: Xóa một địa điểm
exports.deleteLocation = async (req, res) => {
    try {
        const locationId = req.params.id;

        // Kiểm tra xem địa điểm có tồn tại không
        const existingLocation = await Location.getLocationById(locationId);
        if (!existingLocation) {
            return res.status(404).json({ error: 'Không tìm thấy địa điểm' });
        }

        const deleted = await Location.deleteLocation(locationId);
        if (deleted) {
            res.status(200).json({ message: 'Xóa địa điểm thành công' });
        } else {
            res.status(500).json({ error: 'Không thể xóa địa điểm' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa địa điểm:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Upload ảnh cho địa điểm
exports.uploadImage = async (req, res) => {
    try {
        const locationId = req.params.id;
        const imageType = req.body.imageType; // Ví dụ: 'introduction', 'architecture', 'experience_1', 'cuisine_1'

        // Kiểm tra xem địa điểm có tồn tại không
        const existingLocation = await Location.getLocationById(locationId);
        if (!existingLocation) {
            return res.status(404).json({ error: 'Không tìm thấy địa điểm' });
        }

        // Kiểm tra dữ liệu đầu vào
        if (!imageType) {
            return res.status(400).json({ error: 'Loại ảnh (imageType) là bắt buộc' });
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'Không có file ảnh được tải lên' });
        }

        const image = req.files.image;
        const uploadDir = path.join(__dirname, '../uploads/locations', locationId.toString());

        // Tạo thư mục nếu chưa tồn tại
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Đặt tên file ảnh
        const fileName = `${locationId}-${imageType}.jpg`;
        const filePath = path.join(uploadDir, fileName);
        const imageUrl = `/uploads/locations/${locationId}/${fileName}`;

        // Lưu file ảnh
        await image.mv(filePath);

        // Lưu đường dẫn vào bảng Location_Images
        const query = `
            INSERT INTO Location_Images (location_id, image_url, image_type)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE image_url = ?;
        `;
        await pool.execute(query, [locationId, imageUrl, imageType, imageUrl]);

        res.status(200).json({ message: 'Upload ảnh thành công', imageUrl });
    } catch (error) {
        console.error('Lỗi khi upload ảnh:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
