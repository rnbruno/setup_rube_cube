const axios = require('axios');
const { getKillById, getTotalKillAndWordlTrueAndFalse, checkIfTableHasMoreThan100Rows, getAllKills } = require('../models/killers');

async function fetchGetKillById(req, res) {
   
    
    try {
      // Chama a função do serviço para buscar os distritos
      const districts = await getKillById();
      res.json(districts); // Retorna os distritos como JSON
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function fetchTotalKillAndWordlTrueAndFalse(req, res) {
   
    
    try {
      // Chama a função do serviço para buscar os distritos
      const districts = await getTotalKillAndWordlTrueAndFalse();
      res.json(districts); // Retorna os distritos como JSON
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  
  
  module.exports = { fetchGetKillById, fetchTotalKillAndWordlTrueAndFalse };