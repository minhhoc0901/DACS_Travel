// src/components/ItineraryModule.js
import React, { useState } from 'react';
import ItineraryManagement from './ItineraryManagement';
import ItineraryPlanning from './ItineraryPlanning';
import ItineraryReview from './ItineraryReview';
import ItineraryDetail from './ItineraryDetail';
// import '../styles/itineraryCSS/ItineraryModule.css';

const ItineraryModule = () => {
  const [currentView, setCurrentView] = useState('management'); // Trạng thái điều hướng
  const [selectedItinerary, setSelectedItinerary] = useState(null); // Lịch trình được chọn

  // Dữ liệu mẫu dựa trên cơ sở dữ liệu
  const [itineraries, setItineraries] = useState([
    {
      id: 1,
      user_id: 1,
      name: 'Tour khám phá Gành Đá Đĩa - Bãi Xép',
      start_date: '2025-04-25',
      end_date: '2025-04-27',
      locations: [
        { id: 1, name: 'Gành Đá Đĩa', visit_time: '2025-04-25 08:30:00', duration: 120, transportation_method: 'xe máy', transportation_duration: 30, description: 'Địa điểm tự nhiên - Khám phá những khối đá hình lục giác độc đáo' },
        { id: 2, name: 'Bãi Xép', visit_time: '2025-04-25 11:00:00', duration: 180, transportation_method: '', transportation_duration: 0, description: 'Bãi biển - Tắm biển, picnic và ngắm cảnh hoàng hôn' },
        { id: 3, name: 'Nhà thờ Mằng Lăng', visit_time: '2025-04-26 09:00:00', duration: 120, transportation_method: '', transportation_duration: 0, description: 'Di tích lịch sử - Tham quan nhà thờ cổ và tìm hiểu lịch sử' },
      ],
    },
    {
      id: 2,
      user_id: 1,
      name: 'Tour di sản Phú Yên',
      start_date: '2025-05-10',
      end_date: '2025-05-12',
      locations: [
        { id: 4, name: 'Tháp Nhạn', visit_time: '2025-05-10 08:00:00', duration: 90, transportation_method: '', transportation_duration: 0, description: 'Di tích lịch sử - Khám phá tháp Chăm cổ' },
        { id: 5, name: 'Núi Nhạn', visit_time: '2025-05-10 10:00:00', duration: 120, transportation_method: '', transportation_duration: 0, description: 'Địa điểm tự nhiên - Ngắm cảnh thành phố từ trên cao' },
        { id: 6, name: 'Vũng Rô', visit_time: '2025-05-11 09:00:00', duration: 180, transportation_method: '', transportation_duration: 0, description: 'Vịnh biển - Tham quan và thưởng thức hải sản' },
      ],
    },
  ]);

  const user = { id: 1, full_name: 'Nguyễn Văn A', avatar_url: '' };

  const handleCreateItinerary = (newItinerary) => {
    const newId = itineraries.length + 1;
    setItineraries([...itineraries, { id: newId, user_id: user.id, ...newItinerary }]);
    setCurrentView('planning');
    setSelectedItinerary({ id: newId, user_id: user.id, ...newItinerary });
  };

  const handleViewItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setCurrentView('detail');
  };

  const handleEditItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setCurrentView('planning');
  };

  const handleDeleteItinerary = (itineraryId) => {
    setItineraries(itineraries.filter(it => it.id !== itineraryId));
    setCurrentView('management');
  };

  return (
    <div className="itinerary-module  padding: 0 ;  width: 100%;">
      {currentView === 'management' && (
        <ItineraryManagement
          itineraries={itineraries}
          user={user}
          onCreate={handleCreateItinerary}
          onView={handleViewItinerary}
          onEdit={handleEditItinerary}
          onDelete={handleDeleteItinerary}
        />
      )}
      {currentView === 'planning' && selectedItinerary && (
        <ItineraryPlanning
          itinerary={selectedItinerary}
          user={user}
          onBack={() => setCurrentView('management')}
          onContinue={() => setCurrentView('review')}
        />
      )}
      {currentView === 'review' && selectedItinerary && (
        <ItineraryReview
          itinerary={selectedItinerary}
          user={user}
          onBack={() => setCurrentView('planning')}
          onComplete={() => setCurrentView('detail')}
        />
      )}
      {currentView === 'detail' && selectedItinerary && (
        <ItineraryDetail
          itinerary={selectedItinerary}
          user={user}
          onBack={() => setCurrentView('management')}
        />
      )}
    </div>
  );
};

export default ItineraryModule;