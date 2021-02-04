SELECT reservations.*, properties.*, AVG(property_reviews.rating)
FROM reservations 
LEFT JOIN properties ON properties.id = property_id
LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1
AND end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;