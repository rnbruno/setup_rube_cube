// src/routes/districtRoutes.js

const express = require('express');
const { fetchDistricts } = require('../controllers/districtController');
const router = express.Router();

// Definindo a rota para buscar distritos pelo código do estado
router.get('/distritos/:stateCode', fetchDistricts);

module.exports = router;
