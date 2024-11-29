const axios = require('axios');
const { getKillById, getTotalKillAndWordlTrueAndFalse, getRankingWithNameAlteredInTime, getRankingWithNameAlteredForInitGame } = require('../models/killers');


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

  async function fetchRankingWithNameAlteredInTime(req, res) {
      
    try {
      // Chama a função do serviço para buscar os distritos
      const districts = await getRankingWithNameAlteredInTime();
      res.json(districts); // Retorna os distritos como JSON
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  const fetchRankingWithNameAlteredForInitGame = async (req, res) => {
    const initGameValue = req.query.initGame ? parseInt(req.query.initGame) : null; // Obtém o parâmetro 'initGame' da query string
    console.log(initGameValue);
    try {
      // Chama o modelo para obter o ranking com base no parâmetro 'initGame'
      const rankingData = await getRankingWithNameAlteredForInitGame(initGameValue);
  
      // Retorna os dados como JSON
      res.json(rankingData);
    } catch (error) {
      // Caso haja erro, retorna status 500 com a mensagem de erro
      res.status(500).json({ message: error.message });
    }
  };
  
  
 
  
  
  module.exports = { fetchGetKillById, fetchTotalKillAndWordlTrueAndFalse, fetchRankingWithNameAlteredInTime, fetchRankingWithNameAlteredForInitGame };