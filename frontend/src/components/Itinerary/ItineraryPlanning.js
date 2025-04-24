

// src/components/Itinerary/ItineraryPlanning.js
import React from 'react';
import '../../styles/itineraryCSS/ItineraryPlanning.css';

const ItineraryPlanning = ({ itinerary, user, onBack, onContinue }) => {
  // Nhóm các địa điểm theo ngày
  const days = [];
  let currentDay = itinerary.start_date;
  while (currentDay <= itinerary.end_date) {
    const dayLocations = itinerary.locations.filter(loc => {
      const visitDate = loc.visit_time ? loc.visit_time.split(' ')[0] : itinerary.start_date;
      return visitDate === currentDay;
    });
    days.push({ date: currentDay, locations: dayLocations });
    const nextDay = new Date(currentDay);
    nextDay.setDate(nextDay.getDate() + 1);
    currentDay = nextDay.toISOString().split('T')[0];
  }

  return (
    <div className="itinerary-planning">
      <div className="sub-header">
        <h2 className="title">Sắp xếp lịch trình</h2>
        <span>{user.full_name}</span>
      </div>
      <div className="step-indicator">
        <div className="step active">
          <span>1</span>
          <p>Thông tin</p>
        </div>
        <div className="line active"></div>
        <div className="step active">
          <span>2</span>
          <p>Địa điểm</p>
        </div>
        <div className="line active"></div>
        <div className="step active">
          <span>3</span>
          <p>Lịch trình</p>
        </div>
        <div className="line"></div>
        <div className="step">
          <span>4</span>
          <p>Xem lại</p>
        </div>
      </div>
      <div className="trip-details">
        <h3>{itinerary.name}</h3>
        <p>{itinerary.start_date} - {itinerary.end_date} ({days.length} ngày)</p>
      </div>
      <div className="planning-section">
        <h3>Sắp xếp thời gian tham quan</h3>
        {days.map((day, index) => (
          <div key={index} className="day-section">
            <div className="day-header">
              <h4>Ngày {index + 1} ({day.date})</h4>
            </div>
            {day.locations.map((location, locIndex) => (
              <div key={location.id} className="location-item">
                <h4>{locIndex + 1}. {location.name}</h4>
                <div className="time-details">
                  <div>
                    <label>Thời gian tham quan:</label>
                    <input
                      type="time"
                      value={location.visit_time ? location.visit_time.split(' ')[1].slice(0, 5) : ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Thời gian dự kiến:</label>
                    <input type="text" value={`${location.duration / 60}h`} readOnly />
                  </div>
                </div>
                {location.transportation_method && (
                  <div className="transportation">
                    <span className="checkmark">✓</span>
                    <p>Di chuyển bằng {location.transportation_method} ({location.transportation_duration} phút)</p>
                  </div>
                )}
              </div>
            ))}
            <div className="add-location">
              <p>+ Thêm địa điểm</p>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button className="back-btn" onClick={onBack}>Quay lại</button>
        <button className="continue-btn" onClick={onContinue}>Tiếp tục</button>
      </div>
    </div>
  );
};

export default ItineraryPlanning;