import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/itineraryCSS/ItineraryDetail.css';
import toursData from '../../data/tours.json';
import img1 from '../../assets/uploads/locations/1/1-exp-3.jpg';
import img2 from '../../assets/uploads/locations/2/2-exp-3.jpg';
import img3 from '../../assets/uploads/locations/3/3-exp-2.jpg';
import img4 from '../../assets/uploads/locations/4/4-arch.jpg';
import img5 from '../../assets/uploads/locations/5/5-exp-3.jpg';
import img6 from '../../assets/uploads/locations/6/4.jpg';

// Map để lấy hình ảnh từ import
const imageMap = {
  "/assets/uploads/locations/1/1-exp-3.jpg": img1,
  "/assets/uploads/locations/2/2-exp-3.jpg": img2,
  "/assets/uploads/locations/3/3-exp-2.jpg": img3,
  "/assets/uploads/locations/4/4-arch.jpg": img4,
  "/assets/uploads/locations/5/5-exp-3.jpg": img5,
  "/assets/uploads/locations/6/4.jpg": img6
};

const ItineraryDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Chuyển đổi id từ string sang number để so sánh
    const tourId = parseInt(id);
    const foundTour = toursData.tours.find(tour => tour.id === tourId);
    
    if (foundTour) {
      // Tạo dữ liệu giả nếu không có trong JSON
      if (!foundTour.description) {
        foundTour.description = `Tour khám phá vẻ đẹp của ${foundTour.destination}. Hành trình ${foundTour.duration} xuất phát từ ${foundTour.departureFrom}.`;
      }
      
      if (!foundTour.highlights) {
        foundTour.highlights = [
          `Khám phá vùng đất ${foundTour.destination.split('|')[0].trim()}`,
          `Tham quan ${foundTour.destination.split('|')[1]?.trim() || 'các thắng cảnh nổi tiếng'}`,
          `Trải nghiệm văn hóa và ẩm thực địa phương`,
          `Nghỉ dưỡng tại khách sạn tiêu chuẩn ${foundTour.tourType === 'Tour cao cấp' ? '4 sao' : '3 sao'}`
        ];
      }
      
      if (!foundTour.schedule) {
        const days = parseInt(foundTour.duration.split(' ')[0]);
        foundTour.schedule = [];
        for (let i = 1; i <= days; i++) {
          foundTour.schedule.push({
            day: `Ngày ${i}`,
            title: `NGÀY ${i}: ${foundTour.destination.split('|')[i-1]?.trim() || 'KHÁM PHÁ ĐỊA PHƯƠNG'}`,
            activities: [
              "06:00: Dùng bữa sáng tại khách sạn",
              "08:00: Khởi hành tham quan các điểm du lịch",
              "12:00: Dùng bữa trưa tại nhà hàng địa phương",
              "14:00: Tiếp tục hành trình khám phá",
              "18:00: Dùng bữa tối, nghỉ ngơi tại khách sạn"
            ]
          });
        }
      }
      
      if (!foundTour.includes) {
        foundTour.includes = [
          "Xe du lịch đời mới máy lạnh",
          "Khách sạn tiêu chuẩn 3 sao (2 người/phòng)",
          "Các bữa ăn theo chương trình",
          "Hướng dẫn viên nhiệt tình, kinh nghiệm",
          "Vé tham quan các điểm theo lịch trình",
          "Bảo hiểm du lịch"
        ];
      }
      
      if (!foundTour.excludes) {
        foundTour.excludes = [
          "Chi phí cá nhân, đồ uống",
          "Các chi phí không được đề cập trong mục bao gồm",
          "Tiền tip cho hướng dẫn viên và tài xế"
        ];
      }
      
      setTour(foundTour);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin tour...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="error-container">
        <h2>Không tìm thấy thông tin tour</h2>
        <p>Tour với ID {id} không tồn tại hoặc đã bị xóa.</p>
        <Link to="/Itinerary" className="back-button">Quay lại danh sách tour</Link>
      </div>
    );
  }

  return (
    <div className="tour-detail-container">
      {/* Header với ảnh bìa */}
      <div className="tour-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageMap[tour.image]})` }}>
        <div className="tour-header-content">
          <h1>{tour.destination}</h1>
          <div className="tour-basic-info">
            <div className="info-item">
              <span className="icon">🚌</span>
              <span>Xuất phát từ {tour.departureFrom}</span>
            </div>
            <div className="info-item">
              <span className="icon">🕒</span>
              <span>{tour.duration}</span>
            </div>
            <div className="info-item">
              <span className="icon">👥</span>
              <span>{tour.tourType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="tour-navigation">
        <div className="nav-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Tổng quan
          </button>
          <button 
            className={activeTab === 'schedule' ? 'active' : ''} 
            onClick={() => setActiveTab('schedule')}
          >
            Lịch trình
          </button>
          <button 
            className={activeTab === 'info' ? 'active' : ''} 
            onClick={() => setActiveTab('info')}
          >
            Thông tin
          </button>
        </div>
      </div>

      {/* Content section */}
      <div className="tour-content">
        {/* Booking info sidebar */}
        <div className="tour-sidebar">
          <div className="booking-card">
            <div className="price-section">
              <div className="old-price">{tour.originalPrice}</div>
              <div className="new-price">{tour.salePrice}</div>
            </div>
            {/* <button className="booking-button">Đặt tour ngay</button> */}
            <div className="contact-info">
              <p><strong>Liên hệ đặt tour:</strong></p>
              <p>☎️ Hotline: 0123.456.789</p>
              <p>📧 Email: booking@example.com</p>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="tour-main-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="tour-description">
                <h2>Giới thiệu tour</h2>
                <p>{tour.description}</p>
              </div>
              
              <div className="tour-highlights">
                <h2>Điểm nổi bật</h2>
                <ul>
                  {tour.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="tab-content">
              <h2>Lịch trình tour</h2>
              <div className="schedule-container">
                {tour.schedule.map((day, index) => (
                  <div className="schedule-day" key={index}>
                    <div className="day-header">
                      <h3>{day.day}</h3>
                      <h4>{day.title}</h4>
                    </div>
                    <div className="day-activities">
                      <ul>
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="tab-content">
              {/* <div className="tour-includes">
                <h2>Giá tour bao gồm</h2>
                <ul>
                  {tour.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div> */}
              
              {/* <div className="tour-excludes">
                <h2>Giá tour không bao gồm</h2>
                <ul>
                  {tour.excludes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div> */}
              
              <div className="tour-notes">
                <h2>Lưu ý</h2>
                <ul>
                  <li>Quý khách vui lòng mang theo giấy tờ tùy thân (CMND/CCCD).</li>
                  <li>Lịch trình có thể thay đổi tùy theo điều kiện thời tiết và tình hình thực tế.</li>
                  <li>Trẻ em dưới 2 tuổi miễn phí, từ 2-5 tuổi tính 50% giá tour, từ 6 tuổi trở lên tính như người lớn.</li>
                  <li>Quý khách nên mang theo thuốc đau bụng, cảm sốt, thuốc chống say xe.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related tours section */}
      <div className="related-tours">
        <h2>Các tour liên quan</h2>
        <div className="related-tours-grid">
          {toursData.tours
            .filter(relatedTour => relatedTour.id !== tour.id)
            .slice(0, 3)
            .map(relatedTour => (
              <div className="related-tour-card" key={relatedTour.id}>
                <div className="related-tour-img">
                  <img src={imageMap[relatedTour.image]} alt={relatedTour.destination} />
                </div>
                <div className="related-tour-info">
                  <h3>{relatedTour.destination}</h3>
                  <p>{relatedTour.duration}</p>
                  {/* <div className="related-tour-price">
                    <span className="old-price">{relatedTour.originalPrice || "2,500,000đ"}</span>
                    <span className="new-price">{relatedTour.salePrice || "1,990,000đ"}</span>
                  </div> */}
                  <Link to={`/Itinerary/${relatedTour.id}`} className="view-more-btn">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetail;