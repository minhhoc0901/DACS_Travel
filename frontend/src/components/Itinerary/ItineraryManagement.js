// src/components/Itinerary/ItineraryManagement.js
import React, { useState } from 'react';
import '../../styles/itineraryCSS/ItineraryManagement.css';

const ItineraryManagement = ({ itineraries, user, onCreate, onView, onEdit, onDelete }) => {
  const [newItinerary, setNewItinerary] = useState({
    name: '',
    start_date: '',
    end_date: '',
    locations: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItinerary({ ...newItinerary, [name]: value });
  };

  const handleCreateItinerary = (e) => {
    e.preventDefault();
    const parsedLocations = newItinerary.locations
      ? newItinerary.locations.split(',').map((loc, index) => ({
          id: index + 1,
          name: loc.trim(),
          visit_time: '',
          duration: 0,
          transportation_method: '',
          transportation_duration: 0,
          description: '',
        }))
      : [];
    onCreate({
      name: newItinerary.name,
      start_date: newItinerary.start_date,
      end_date: newItinerary.end_date,
      locations: parsedLocations,
    });
    setNewItinerary({ name: '', start_date: '', end_date: '', locations: '' });
  };

  return (
    <div className="itinerary-management">
      <h2 className="title">Quản lý lịch trình</h2>
      <div className="dashboard">
        <h3>Lịch trình của tôi</h3>
        <button className="create-btn">+ Tạo mới</button>
      </div>
      <div className="filter-section">
        <span>Lọc:</span>
        <select>
          <option>Tất cả lịch trình</option>
        </select>
        <select>
          <option>Sắp xếp theo ngày</option>
        </select>
      </div>
      <div className="itinerary-list">
        {itineraries.map(itinerary => (
          <div key={itinerary.id} className="itinerary-item">
            <h3>{itinerary.name}</h3>
            <p>Từ: {itinerary.start_date} - Đến: {itinerary.end_date}</p>
            <p>Điểm đến: {itinerary.locations.map(loc => loc.name).join(', ')}</p>
            <div className="actions">
              <button className="view-btn" onClick={() => onView(itinerary)}>Xem</button>
              <button className="edit-btn" onClick={() => onEdit(itinerary)}>Sửa</button>
              <button className="delete-btn" onClick={() => onDelete(itinerary.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <hr className="divider" />
      <div className="create-itinerary">
        <h2>Tạo lịch trình mới</h2>
        <form onSubmit={handleCreateItinerary}>
          <div className="form-group">
            <label>Tên lịch trình:</label>
            <input
              type="text"
              name="name"
              value={newItinerary.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group date-group">
            <div>
              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                name="start_date"
                value={newItinerary.start_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Ngày kết thúc:</label>
              <input
                type="date"
                name="end_date"
                value={newItinerary.end_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Địa điểm:</label>
            <input
              type="text"
              name="locations"
              value={newItinerary.locations}
              onChange={handleInputChange}
              placeholder="Tìm kiếm địa điểm..."
              required
            />
          </div>
          <button type="submit" className="continue-btn">Tiếp tục</button>
        </form>
      </div>
    </div>
  );
};

export default ItineraryManagement;