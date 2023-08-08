CREATE DATABASE properties;

\c properties;

CREATE TABLE property(
    property_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image_urls VARCHAR(255)[]
);
