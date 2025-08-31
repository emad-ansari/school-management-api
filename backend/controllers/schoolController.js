const { query } = require('../config/database');

// Add a new school
const addSchool = async (req, res) => {
  try {
    const { name, address, city, state, contact, pictureUrl, email } = req.body;
    
    // Validation
    if (!name || !address || !city || !state || !contact || !email) {
      return res.status(400).json({ error: 'Name, address, city, state, contact, and email are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    
    // Validate contact number (basic validation)
    if (contact.toString().length < 10) {
      return res.status(400).json({ error: 'Contact number must be at least 10 digits' });
    }
    
    // PostgreSQL query with parameterized values ($1, $2, etc.)
    const sql = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    const values = [name, address, city, state, contact, pictureUrl || null, email];
    
    // Execute query
    const result = await query(sql, values);
    
    res.status(201).json({ 
      message: 'School added successfully', 
      schoolId: result.rows[0].id 
    });
  } catch (error) {
    console.error('Database error in addSchool:', error);
    res.status(500).json({ error: 'Failed to add school' });
  }
};

// Get all schools
const getAllSchools = async (req, res) => {
  try {
    // Get all schools from database
    const sql = 'SELECT * FROM schools ORDER BY created_at DESC';
    const result = await query(sql);
    
    const schools = result.rows.map(school => ({
      id: school.id,
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      contact: school.contact,
      picture: school.image,
      email: school.email_id,
      created_at: school.created_at
    }));
    
    res.json({ schools });
  } catch (error) {
    console.error('Database error in getAllSchools:', error);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
};

// Search schools by query
const searchSchools = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const searchQuery = `%${q.trim()}%`;
    
    // Search in name, address, city, and state
    const sql = `
      SELECT * FROM schools 
      WHERE name ILIKE $1 
         OR address ILIKE $1 
         OR city ILIKE $1 
         OR state ILIKE $1
      ORDER BY created_at DESC
    `;
    
    const result = await query(sql, [searchQuery]);
    
    const schools = result.rows.map(school => ({
      id: school.id,
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      contact: school.contact,
      picture: school.image,
      email: school.email_id,
      created_at: school.created_at
    }));
    
    res.json({ 
      schools,
      searchQuery: q.trim(),
      totalResults: schools.length
    });
  } catch (error) {
    console.error('Database error in searchSchools:', error);
    res.status(500).json({ error: 'Failed to search schools' });
  }
};



module.exports = { addSchool, getAllSchools, searchSchools };