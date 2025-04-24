const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// API để lấy tất cả địa điểm
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', l.id,
                        'title', l.name,
                        'subtitle', ld.subtitle,
                        'introduction', JSON_OBJECT(
                            'text', ld.introduction,
                            'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'introduction' LIMIT 1)
                        ),
                        'whyVisit', JSON_OBJECT(
                            'architecture', JSON_OBJECT(
                                'title', ld.why_visit_architecture_title,
                                'text', ld.why_visit_architecture_text,
                                'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'architecture' LIMIT 1)
                            ),
                            'culture', ld.why_visit_culture
                        ),
                        'bestTimes', (
                            SELECT JSON_ARRAYAGG(time_description)
                            FROM BestTimes
                            WHERE location_id = l.id
                        ),
                        'travelMethods', JSON_OBJECT(
                            'fromTuyHoa', (
                                SELECT JSON_ARRAYAGG(description)
                                FROM TravelMethods
                                WHERE location_id = l.id AND method_type = 'fromTuyHoa'
                            ),
                            'fromElsewhere', (
                                SELECT JSON_ARRAYAGG(description)
                                FROM TravelMethods
                                WHERE location_id = l.id AND method_type = 'fromElsewhere'
                            )
                        ),
                        'travelInfo', JSON_OBJECT(
                            'ticketPrice', ti.ticket_price,
                            'tip', ti.tip
                        ),
                        'experiences', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'text', e.description,
                                    'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'experience' AND reference_id = e.id LIMIT 1)
                                )
                            )
                            FROM Experiences e
                            WHERE e.location_id = l.id
                        ),
                        'cuisine', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'text', c.description,
                                    'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'cuisine' AND reference_id = c.id LIMIT 1)
                                )
                            )
                            FROM Cuisines c
                            WHERE c.location_id = l.id
                        ),
                        'tips', (
                            SELECT JSON_ARRAYAGG(description)
                            FROM Tips
                            WHERE location_id = l.id
                        ),
                        'nearby', (
                            SELECT JSON_ARRAYAGG(l2.name)
                            FROM NearbyLocations nl
                            JOIN Locations l2 ON nl.nearby_location_id = l2.id
                            WHERE nl.location_id = l.id
                        )
                    )
                ) AS locations
            FROM Locations l
            LEFT JOIN LocationDetails ld ON l.id = ld.location_id
            LEFT JOIN TravelInfo ti ON l.id = ti.location_id;
        `;
        const [rows] = await pool.execute(query);
        res.json(rows[0].locations || []);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// API để lấy thông tin một địa điểm cụ thể
router.get('/:id', async (req, res) => {
    const locationId = req.params.id;
    try {
        const query = `
            SELECT 
                JSON_OBJECT(
                    'id', l.id,
                    'title', l.name,
                    'subtitle', ld.subtitle,
                    'introduction', JSON_OBJECT(
                        'text', ld.introduction,
                        'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'introduction' LIMIT 1)
                    ),
                    'whyVisit', JSON_OBJECT(
                        'architecture', JSON_OBJECT(
                            'title', ld.why_visit_architecture_title,
                            'text', ld.why_visit_architecture_text,
                            'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'architecture' LIMIT 1)
                        ),
                        'culture', ld.why_visit_culture
                    ),
                    'bestTimes', (
                        SELECT JSON_ARRAYAGG(time_description)
                        FROM BestTimes
                        WHERE location_id = l.id
                    ),
                    'travelMethods', JSON_OBJECT(
                        'fromTuyHoa', (
                            SELECT JSON_ARRAYAGG(description)
                            FROM TravelMethods
                            WHERE location_id = l.id AND method_type = 'fromTuyHoa'
                        ),
                        'fromElsewhere', (
                            SELECT JSON_ARRAYAGG(description)
                            FROM TravelMethods
                            WHERE location_id = l.id AND method_type = 'fromElsewhere'
                        )
                    ),
                    'travelInfo', JSON_OBJECT(
                        'ticketPrice', ti.ticket_price,
                        'tip', ti.tip
                    ),
                    'experiences', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'text', e.description,
                                'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'experience' AND reference_id = e.id LIMIT 1)
                            )
                        )
                        FROM Experiences e
                        WHERE e.location_id = l.id
                    ),
                    'cuisine', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'text', c.description,
                                'image', (SELECT image_url FROM Location_Images WHERE location_id = l.id AND image_type = 'cuisine' AND reference_id = c.id LIMIT 1)
                            )
                        )
                        FROM Cuisines c
                        WHERE c.location_id = l.id
                    ),
                    'tips', (
                        SELECT JSON_ARRAYAGG(description)
                        FROM Tips
                        WHERE location_id = l.id
                    ),
                    'nearby', (
                        SELECT JSON_ARRAYAGG(l2.name)
                        FROM NearbyLocations nl
                        JOIN Locations l2 ON nl.nearby_location_id = l2.id
                        WHERE nl.location_id = l.id
                    )
                ) AS location
            FROM Locations l
            LEFT JOIN LocationDetails ld ON l.id = ld.location_id
            LEFT JOIN TravelInfo ti ON l.id = ti.location_id
            WHERE l.id = ?;
        `;
        const [rows] = await pool.execute(query, [locationId]);
        if (!rows[0].location) {
            return res.status(404).json({ error: 'Không tìm thấy địa điểm' });
        }
        res.json(rows[0].location);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error.message);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;