INSERT INTO users (name, email, password) VALUES ('Tom', 'tom@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Jane', 'jane@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Lorna', 'lorna@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES (1, 'House1', 'description', 'www.example.com/url', 'www.example.com/different_url', 99, 1, 2, 4, 'Canada', '99ST', 'Edmonton', 'AB', 'T6G 9R3');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES (2, 'Apartment', 'description', 'www.example.com/url', 'www.example.com/different_url', 111, 2, 2, 2, 'Canada', '99ST', 'Red Deer', 'AB', 'T6G 9R3');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES (3, 'Shed', 'This is a shed', 'description', 'www.example.com/different_url', 10, 0, 0, 0, 'Canada', '99ST', 'Calgary', 'AB', 'T6G 9R3');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2021-01-01', '2021-01-07', 2, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2021-02-21', '2021-03-01', 3, 1);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2012-03-03', '2021-04-20', 1, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (1, 3, 2, 4, 'messages');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 1, 3, 3, 'messages');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (3, 2, 1, 1, 'messages');