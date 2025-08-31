-- Create the schools table for PostgreSQL
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES
('Central High School', '123 Main Street, Downtown', 'New York', 'NY', '555-0101', 'https://example.com/central-high.jpg', 'central.high@school.edu'),
('North Elementary', '456 Oak Avenue, North District', 'New York', 'NY', '555-0102', 'https://example.com/north-elem.jpg', 'north.elem@school.edu'),
('South Middle School', '789 Pine Road, South Area', 'New York', 'NY', '555-0103', 'https://example.com/south-middle.jpg', 'south.middle@school.edu'),
('East Academy', '321 Elm Street, East Side', 'New York', 'NY', '555-0104', 'https://example.com/east-academy.jpg', 'east.academy@school.edu'),
('West College Prep', '654 Maple Drive, West End', 'New York', 'NY', '555-0105', 'https://example.com/west-prep.jpg', 'west.prep@school.edu');
