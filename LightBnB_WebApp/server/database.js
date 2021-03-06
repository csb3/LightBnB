const { Pool } = require('pg');
const { query } = require('express');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const values = [email];
  let user;
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, values)
    .then(res => {
      if (!res.rows[0]) {
        user = null;
      } else {
        user = res.rows[0];
      }
      return user;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const values = [id];
  let user;
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1;
    `, values)
    .then(res => {
      if (!res.rows[0]) {
        user = null;
      } else {
        user = res.rows[0];
      }
      return user;
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user.name, user.email, user.password];
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, values)
    .then(res => {
      if (!res.rows) {
        user = null;
      } else {
        user = res.rows;
      }
      return user;
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit];
  return pool.query(`
  SELECT reservations.*, properties.*, AVG(property_reviews.rating)
  FROM reservations 
  LEFT JOIN properties ON properties.id = property_id
  LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  AND end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;`, values)
    .then(res => {
      return res.rows;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
  for (const option in options) {
    if (options[option] && (option === 'city' || option === 'owner_id' || option === 'minimum_price_per_night' || option === 'maximum_price_per_night')) {
      if (!queryString.includes("WHERE")) {
        queryString += `WHERE `;
      } else {
        queryString += `AND `;
      }
    }
    if (option === 'city' && options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `city LIKE $${queryParams.length} `;
    }
    if (option === 'owner_id' && options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `owner_id = $${queryParams.length} `;
    }
    if (option === 'minimum_price_per_night' && options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night * 100}`);
      queryString += `cost_per_night >= $${queryParams.length} `;
    }
    if (option === 'maximum_price_per_night' && options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night * 100}`);
      queryString += `cost_per_night <= $${queryParams.length} `;
    }
  }
  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let newProperty;
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];
  return pool.query(`
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, values)
    .then(res => {
      if (!res.rows) {
        newProperty = null;
      } else {
        newProperty = res.rows;
      }
      return newProperty;
    });
};
exports.addProperty = addProperty;
