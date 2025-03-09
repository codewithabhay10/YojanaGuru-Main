const express = require('express');
const { getSchemes, recommendSchemes, getSingleScheme } = require('../controllers/schemeController');

const router = express.Router();

// GET all schemes
router.get('/', getSchemes);

// POST recommend schemes
router.post('/recommend', recommendSchemes);

// GET single scheme by ID
router.get('/:id', getSingleScheme);

module.exports = router;
