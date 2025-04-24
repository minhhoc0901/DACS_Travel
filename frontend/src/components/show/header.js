import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/show/header.css';

const Header = ({ menuOpen, setMenuOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    // Xử lý sự kiện scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Đóng menu khi thay đổi route
    useEffect(() => {
        setMenuOpen(false);
        setActiveDropdown(null);
    }, [location, setMenuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Toggle dropdown trên mobile
    const toggleDropdown = (index) => {
        if (window.innerWidth < 992) {
            setActiveDropdown(activeDropdown === index ? null : index);
        }
    };

    // Kiểm tra route hiện tại
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="header-container container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <div className="logo-wrapper">
                            <div className="logo-icon">
                                <i className="bi bi-airplane-engines-fill"></i>
                            </div>
                            <div className="logo-content">
                                <span className="logo-text">PHÚ YÊN</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button 
                    className={`mobile-toggle d-lg-none ${menuOpen ? 'active' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation */}
                <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
                    {/* Mobile Header */}
                    <div className="mobile-nav-header d-lg-none">
                        <div className="logo-small">
                            <div className="logo-icon-small">
                                <i className="bi bi-airplane-engines-fill"></i>
                            </div>
                            <span>PHÚ YÊN</span>
                        </div>
                        <button className="nav-close" onClick={() => setMenuOpen(false)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                    {/* Navigation Links */}
                    <ul className="nav-links">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setMenuOpen(false)}>
                                <i className="bi bi-house-door nav-icon"></i>
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li className={`nav-item dropdown ${activeDropdown === 0 ? 'show' : ''}`}>
                            <Link 
                                to="/locations" 
                                className={`nav-link ${isActive('/locations')}`}
                                onClick={(e) => {
                                    if (window.innerWidth < 992) {
                                        e.preventDefault();
                                        toggleDropdown(0);
                                    } else {
                                        setMenuOpen(false);
                                    }
                                }}
                            >
                                <i className="bi bi-geo-alt nav-icon"></i>
                                <span>Điểm đến</span>
                                <i className="bi bi-chevron-down dropdown-icon"></i>
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/locations/beaches" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                                        <i className="bi bi-water dropdown-icon-item"></i>
                                        Bãi biển
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/locations/mountains" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                                        <i className="bi bi-mountain dropdown-icon-item"></i>
                                        Núi & Đồi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/locations/cultural" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                                        <i className="bi bi-building dropdown-icon-item"></i>
                                        Di tích văn hóa
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/locations/food" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                                        <i className="bi bi-cup-hot dropdown-icon-item"></i>
                                        Ẩm thực đặc sản
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/plan" className={`nav-link ${isActive('/plan')}`} onClick={() => setMenuOpen(false)}>
                                <i className="bi bi-calendar3 nav-icon"></i>
                                <span>Lập kế hoạch</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setMenuOpen(false)}>
                                <i className="bi bi-info-circle nav-icon"></i>
                                <span>Giới thiệu</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setMenuOpen(false)}>
                                <i className="bi bi-chat-dots nav-icon"></i>
                                <span>Liên hệ</span>
                            </Link>
                        </li>
                        {/* Nút đăng nhập cho responsive - Được di chuyển xuống dưới các menu chính */}
                        <li className="nav-item d-lg-none">
                            <Link to="/login" className="nav-link login-nav-link" onClick={() => setMenuOpen(false)}>
                                <i className="bi bi-person-circle nav-icon"></i>
                                <span>Đăng nhập</span>
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Search & Login cho desktop */}
                    <div className="nav-actions d-none d-lg-flex">
                        <div className="nav-search">
                            <button className="search-btn" aria-label="Search">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        <div className="nav-login">
                            <Link to="/login" className="btn login-btn" onClick={() => setMenuOpen(false)}>
                                <i className="bi bi-person-circle"></i>
                                <span>Đăng nhập</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;