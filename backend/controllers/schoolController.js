const { query } = require('../config/database');
const { calculateDistance } = require('./distanceController');

// Add a new school
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    // Validation
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
    }
    
    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
    }
    
    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
    }
    
    // PostgreSQL query with parameterized values ($1, $2, etc.)
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id';
    const values = [name, address, parseFloat(latitude), parseFloat(longitude)];
    
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

// Get all schools sorted by distance
const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    
    // Validation
    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({ error: 'Valid latitude and longitude parameters are required' });
    }
    
    if (userLat < -90 || userLat > 90) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
    }
    
    if (userLon < -180 || userLon > 180) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
    }
    
    // Get all schools from database
    const sql = 'SELECT * FROM schools';
    const result = await query(sql);
    
    // Calculate distance for each school
    const schoolsWithDistance = result.rows.map(school => {
      const distance = calculateDistance(
        userLat, userLon, 
        school.latitude, school.longitude
      );
      
      return {
        id: school.id,
        name: school.name,
        address: school.address,
        latitude: parseFloat(school.latitude),
        longitude: parseFloat(school.longitude),
        created_at: school.created_at,
        distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
      };
    });
    
    // Sort by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.json({
      userLocation: { latitude: userLat, longitude: userLon },
      schools: schoolsWithDistance
    });
  } catch (error) {
    console.error('Database error in listSchools:', error);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
};




module.exports = { addSchool, listSchools };