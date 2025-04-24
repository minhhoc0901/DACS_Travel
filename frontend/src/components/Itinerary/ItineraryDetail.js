

// src/components/Itinerary/ItineraryDetail.js
import React from 'react';
import '../../styles/itineraryCSS/ItineraryDetail.css';

const ItineraryDetail = ({ itinerary, user, onBack }) => {
  const days = [];
  let currentDay = itinerary.start_date;
  while (currentDay <= itinerary.end_date) {
    const dayLocations = itinerary.locations
      .filter(loc => {
        const visitDate = loc.visit_time ? loc.visit_time.split(' ')[0] : itinerary.start_date;
        return visitDate === currentDay;
      })
      .map(loc => ({
        ...loc,
        time: loc.visit_time
          ? `${loc.visit_time.split(' ')[1].slice(0, 5)} - ${(new Date(new Date(loc.visit_time).getTime() + loc.duration * 60000)).toISOString().split('T')[1].slice(0, 5)}`
          : '',
      }));
    days.push({ date: currentDay, locations: dayLocations });
    const nextDay = new Date(currentDay);
    nextDay.setDate(nextDay.getDate() + 1);
    currentDay = nextDay.toISOString().split('T')[0];
  }

  return (
    <div className="itinerary-detail">
      <div className="sub-header">
        <button className="back-btn" onClick={onBack}>← Quay lại</button>
        <h2 className="title">Chi tiết lịch trình</h2>
        <span>{user.full_name}</span>
      </div>
      <div className="summary">
        <h3>{itinerary.name}</h3>
        <div className="summary-details">
          <p>Ngày bắt đầu: {itinerary.start_date}</p>
          <p>Ngày kết thúc: {itinerary.end_date}</p>
          <p>Tổng số địa điểm: {itinerary.locations.length}</p>
          <p>Thời gian: {days.length} ngày</p>
          <p>Tạo bởi: {user.full_name}</p>
        </div>
        <div className="actions">
          <button className="edit-btn">Chỉnh sửa</button>
          <button className="delete-btn">Xóa</button>
          <button className="share-btn">Chia sẻ</button>
        </div>
      </div>
      <div className="map-placeholder">
        <p>[Bản đồ lịch trình]</p>
      </div>
      <div className="timeline-section">
        <h3>Lịch trình chi tiết</h3>
        {days.map((day, index) => (
          <div key={index} className="day-section">
            <div className="day-header">
              <h4>Ngày {index + 1} ({day.date})</h4>
            </div>
            <div className="timeline">
              {day.locations.map((location, locIndex) => (
                <div key={locIndex} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{location.time}</h4>
                    <p>{location.name}</p>
                    <p className="description">{location.description}</p>
                  </div>
                  {locIndex < day.locations.length - 1 && <div className="timeline-line"></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDetail;