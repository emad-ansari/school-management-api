const { promisePool } = require('../config/database'); // Import the promise pool
const { calculateDistance } = require('./distanceController');

// Add a new school (using async/await with promise pool)
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
    
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    
    // Use promise pool with async/await
    const [result] = await promisePool.execute(query, [
      name, 
      address, 
      parseFloat(latitude), 
      parseFloat(longitude)
    ]);
    
    res.status(201).json({ 
      message: 'School added successfully', 
      schoolId: result.insertId 
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
    
    const query = 'SELECT * FROM schools';
    
    // Use promise pool with async/await
    const [results] = await promisePool.execute(query);
    
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
  } catch (error) {
    console.error('Database error in listSchools:', error);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
};

module.exports = { addSchool, listSchools };