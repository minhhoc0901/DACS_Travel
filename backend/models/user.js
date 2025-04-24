const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/db');

// Tạo pool connection
const pool = mysql.createPool(dbConfig);

class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || 'user';
  }

  static async getPool() {
    return pool;
  }

  // Đăng ký người dùng mới
  async register() {
    try {
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);

      const connection = await pool.getConnection();
      try {
        const [result] = await connection.execute(
          'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
          [this.username, this.email, hashedPassword, this.role]
        );
        
        return {
          id: result.insertId,
          username: this.username,
          email: this.email,
          role: this.role
        };
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Tìm người dùng theo email
  static async findByEmail(email) {
    try {
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.execute(
          'SELECT * FROM Users WHERE email = ?',
          [email]
        );
        
        return rows.length ? rows[0] : null;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Tìm người dùng theo username
  static async findByUsername(username) {
    try {
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.execute(
          'SELECT * FROM Users WHERE username = ?',
          [username]
        );
        
        return rows.length ? rows[0] : null;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Tìm người dùng theo ID
  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.execute(
          'SELECT id, username, email, role, created_at FROM Users WHERE id = ?',
          [id]
        );
        
        return rows.length ? rows[0] : null;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả người dùng (chỉ admin)
  static async findAll() {
    try {
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.execute(
          'SELECT id, username, email, role, created_at FROM Users'
        );
        
        return rows;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin người dùng
  static async updateUser(id, userData) {
    try {
      const connection = await pool.getConnection();
      try {
        // Tạo câu query động dựa trên dữ liệu cần cập nhật
        const fieldsToUpdate = [];
        const values = [];

        if (userData.username) {
          fieldsToUpdate.push('username = ?');
          values.push(userData.username);
        }

        if (userData.email) {
          fieldsToUpdate.push('email = ?');
          values.push(userData.email);
        }

        if (userData.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(userData.password, salt);
          fieldsToUpdate.push('password_hash = ?');
          values.push(hashedPassword);
        }

        if (userData.role) {
          fieldsToUpdate.push('role = ?');
          values.push(userData.role);
        }

        // Thêm ID vào cuối mảng values
        values.push(id);

        const query = `UPDATE Users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
        const [result] = await connection.execute(query, values);
        
        return result.affectedRows > 0;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Xóa người dùng
  static async deleteUser(id) {
    try {
      const connection = await pool.getConnection();
      try {
        const [result] = await connection.execute(
          'DELETE FROM Users WHERE id = ?',
          [id]
        );
        
        return result.affectedRows > 0;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;