// src/routes/logs.js
const express = require('express');
const { initLogDatabase } = require('../services/gameLogService'); // Importando o serviço
const { getKillsByTimeRange, getKillTotalWorldTrueAndFalse ,getKillCountByKiller, getKillCountByKillerAndWorld, getAllKills } = require('../models/killers');

const router = express.Router();


router.get('/geral', async (req, res) => {
  try {
    const result = await initLogDatabase(); 
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});
router.get('/getKillCountByKillerAndWorld', async (req, res) => {
  try {
    const result = await getKillCountByKillerAndWorld(); 
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get('/getKillCountByKiller', async (req, res) => {
  try {
    const result = await getKillCountByKiller(); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get('/getAllKills', async (req, res) => {
  try {
    const result = await getKillCountByKiller(); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

// router.get('/getKillsByTimeRange', async (req, res) => {
//   try {
//     const result = await getKillsByTimeRange(); 
//     res.json(result); 
//   } catch (error) {
//     res.status(500).json({ error: error.message }); 
//   }
// });
router.get('/getKillTotalWorldTrueAndFalse', async (req, res) => {
  try {
    const result = await getKillTotalWorldTrueAndFalse(); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get('/getKillsByTimeRange/kills', async (req, res) => {
  const { startTime, endTime } = req.query;  // Parâmetros recebidos na query string

  if (!startTime || !endTime) {
    return res.status(400).json({ error: 'Os parâmetros startTime e endTime são obrigatórios.' });
  }

  try {
    const kills = await getKillsByTimeRange(startTime, endTime);

    res.json(kills);
  } catch (err) {
    console.error('Erro ao consultar kills:', err);
    res.status(500).json({ error: 'Erro ao consultar kills.' });
  }
});

module.exports = router;
