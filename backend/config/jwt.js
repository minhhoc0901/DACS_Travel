const jwt = {
    secret: "your-secret-key", // Thay thế bằng một khóa bí mật thực tế
    tokenLife: "24h", // Thời gian sống của token
    refreshTokenLife: "7d" // Thời gian sống của refresh token
};

module.exports = jwt;