// src/services/districtService.js

const axios = require('axios');


async function getDistrictsByState(stateCode) {
  try {

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/distritos`;

    const response = await axios.get(url);
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Falha na requisição: ${response.status}`);
    }
  } catch (error) {
    console.error("Erro ao buscar distritos:", error);
    throw new Error("Erro ao acessar a API de distritos do IBGE.");
  }
}

module.exports = { getDistrictsByState };
