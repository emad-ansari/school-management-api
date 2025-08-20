-- Create the schools table for PostgreSQL
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Central High School', '123 Main Street, Downtown', 40.7128, -74.0060),
('North Elementary', '456 Oak Avenue, North District', 40.7589, -73.9851),
('South Middle School', '789 Pine Road, South Area', 40.7505, -73.9934),
('East Academy', '321 Elm Street, East Side', 40.7484, -73.9857),
('West College Prep', '654 Maple Drive, West End', 40.7614, -73.9776);
