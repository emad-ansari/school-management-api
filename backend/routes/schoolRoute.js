const express = require('express');
const router = express.Router();
const { addSchool, getAllSchools, searchSchools } = require('../controllers/schoolController');

// Create a new school
router.post('/addSchool', addSchool);

// Get all schools
router.get('/getAllSchools', getAllSchools);

// Search schools
router.get('/search', searchSchools);

// Get school by ID


module.exports = router;