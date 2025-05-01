import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/itineraryCSS/Itinerary.css';
import toursData from '../../data/tours.json';
import img1 from '../../assets/uploads/locations/1/1-exp-3.jpg';
import img2 from '../../assets/uploads/locations/2/2-exp-3.jpg';
import img3 from '../../assets/uploads/locations/3/3-exp-2.jpg';
import img4 from '../../assets/uploads/locations/4/4-arch.jpg';
import img5 from '../../assets/uploads/locations/5/5-exp-3.jpg';
import img6 from '../../assets/uploads/locations/6/4.jpg';
const ItineraryModule = () => {
  // Lấy dữ liệu tours từ file JSON
  const { tours } = toursData;
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};
const imageMap = {
  "/assets/uploads/locations/1/1-exp-3.jpg": img1,
  "/assets/uploads/locations/2/2-exp-3.jpg": img2,
  "/assets/uploads/locations/3/3-exp-2.jpg": img3,
  "/assets/uploads/locations/4/4-arch.jpg": img4,
  "/assets/uploads/locations/5/5-exp-3.jpg": img5,
  "/assets/uploads/locations/6/4.jpg": img6
};
const TourCard = ({ tour }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img 
          src={imageMap[tour.image]} 
          alt={tour.destination} 
        />
      </div>
      
      <div className="card-body">
        <h2 className="card-title">{tour.destination}</h2>
        
        <div className="info-row">
          <span>🚌</span>
          <span>Xuất phát từ {tour.departureFrom}</span>
        </div>
        
        <div className="info-row">
          <span>🕒</span>
          <span>{tour.duration}</span>
        </div>
        
        <div className="info-row">
          <span>👥</span>
          <span>{tour.tourType}</span>
        </div>
        
        <div className="price-action">
          <div className="price-section">
            <div className="old-price">{tour.originalPrice}</div>
            <div className="new-price">{tour.salePrice}</div>
          </div>
          <Link to={`/Itinerary/${tour.id}`} className="btn-book">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItineraryModule;