DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW();,
    seller_id INTEGER NOT NULL REFERENCES users(id),
    photo_url TEXT,
    thumbnail_url TEXT
);
