// src/controllers/districtController.js

const { getDistrictsByState } = require('../services/districtService');

async function fetchDistricts(req, res) {
  const stateCode = req.params.stateCode; // Obtém o código do estado a partir dos parâmetros da rota
  
  try {
    // Chama a função do serviço para buscar os distritos
    const districts = await getDistrictsByState(stateCode);
    res.json(districts); // Retorna os distritos como JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { fetchDistricts };
