-- Drop the existing favorites table if it exists
DROP TABLE IF EXISTS favorites CASCADE;

-- Create the favorites table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    item_id INTEGER NOT NULL REFERENCES items(id)
);

-- Modify the foreign key constraint to use ON DELETE CASCADE
ALTER TABLE favorites
DROP CONSTRAINT IF EXISTS favorites_item_id_fkey;

ALTER TABLE favorites
ADD CONSTRAINT favorites_item_id_fkey
FOREIGN KEY (item_id)
REFERENCES items(id)
ON DELETE CASCADE;
