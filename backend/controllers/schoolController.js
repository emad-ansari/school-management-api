const db = require('../config/database');
const { calculateDistance } = require('./distanceController');

// Add a new school
const addSchool = (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    console.log('name:',  name)
    
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
    
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, address, parseFloat(latitude), parseFloat(longitude)], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to add school' });
      }
      
      res.status(201).json({ 
        message: 'School added successfully', 
        schoolId: result.insertId 
      });
    });
  } catch (error) {
    console.error('Unexpected error in addSchool:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all schools sorted by distance
const listSchools = (req, res) => {
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
    
    const query = 'SELECT * FROM schools';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch schools' });
      }
      
      // Calculate distance for each school and add it to the result
      const schoolsWithDistance = results.map(school => {
        const distance = calculateDistance(
          userLat, userLon, 
          school.latitude, school.longitude
        );
        
        return {
          id: school.id,
          name: school.name,
          address: school.address,
          latitude: school.latitude,
          longitude: school.longitude,
          distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
        };
      });
      
      // Sort by distance (closest first)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
      
      res.json({
        userLocation: { latitude: userLat, longitude: userLon },
        schools: schoolsWithDistance
      });
    });
  } catch (error) {
    console.error('Unexpected error in listSchools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addSchool, listSchools };