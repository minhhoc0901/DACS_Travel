import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/AuthForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register data:', formData);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-side">
                <div className="auth-side-content">
                    <h2>Tham gia cùng chúng tôi!</h2>
                    <p>Bắt đầu hành trình khám phá Phú Yên của bạn</p>
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
                        <h1>Đăng ký tài khoản</h1>
                        <p>Điền thông tin dưới đây để tạo tài khoản</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <div className="input-group">
                                <i className="bi bi-person"></i>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-group">
                                    <i className="bi bi-envelope"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Nhập email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại</label>
                                <div className="input-group">
                                    <i className="bi bi-phone"></i>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="Nhập số điện thoại"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="input-group">
                                <i className="bi bi-lock"></i>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Tạo mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <div className="input-group">
                                <i className="bi bi-lock-fill"></i>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-wrapper terms">
                                <input
                                    type="checkbox"
                                    checked={formData.agreeTerms}
                                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                                    required
                                />
                                <span className="checkbox-label">
                                    Tôi đồng ý với <Link to="/terms">Điều khoản</Link> và 
                                    <Link to="/privacy">Chính sách bảo mật</Link>
                                </span>
                            </label>
                        </div>

                        <button type="submit" className="btn-submit">
                            Đăng ký
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>

                    <div className="auth-separator">
                        <span>Hoặc đăng ký với</span>
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
                        Đã có tài khoản? 
                        <Link to="/login"> Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;