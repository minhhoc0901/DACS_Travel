import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/AuthForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login data:', formData);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-side">
                <div className="auth-side-content">
                    <h2>Chào mừng trở lại!</h2>
                    <p>Khám phá vẻ đẹp của Phú Yên cùng chúng tôi</p>
                    <div className="auth-image"></div>
                </div>
            </div>
            
            <div className="auth-main">
                <div className="auth-box">
                    <div className="auth-header">
                        <Link to="/" className="auth-brand">
                            <i className="bi bi-airplane-engines"></i>
                            <span>PHÚ YÊN</span>
                        </Link>
                        <h1>Đăng nhập</h1>
                        <p>Vui lòng đăng nhập để tiếp tục</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email hoặc số điện thoại</label>
                            <div className="input-group">
                                <i className="bi bi-envelope"></i>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Nhập email hoặc số điện thoại"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="input-group">
                                <i className="bi bi-lock"></i>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                                />
                                <span className="checkbox-label">Ghi nhớ đăng nhập</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button type="submit" className="btn-submit">
                            Đăng nhập
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>

                    <div className="auth-separator">
                        <span>Hoặc đăng nhập với</span>
                    </div>

                    <div className="social-auth">
                        <button type="button" className="social-btn google">
                        <i className="bi bi-google"></i>
                            <span>Google</span>
                        </button>
                        <button type="button" className="social-btn facebook">
                            <i className="bi bi-facebook"></i>
                            <span>Facebook</span>
                        </button>
                    </div>

                    <p className="auth-redirect">
                        Chưa có tài khoản? 
                        <Link to="/register"> Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;