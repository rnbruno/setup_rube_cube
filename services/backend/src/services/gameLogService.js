// src/services/externalApiService.js

const axios = require('axios');
const { checkAndCreateTable, insertDataIntoTable, checkIfTableHasMoreThan100Rows, getAllKills } = require('../models/killers');

function parseLogLine(logLine, erros, acertos) {

    logLine = logLine.trim()

    const logRegex = /^(\d+:\d+)\s+Kill:\s+(\d+)\s+(\d+)\s+(\d+):\s+(.+?)\skilled\s+(.+?)\s+by\s+(\w+)$/;

    const match = logLine.match(logRegex);
  
    if (!match) {
        erros++; 
      return null;  
    }
  
    acertos++;

    const [_, timestamp, killerId, victimId, weaponId, killerName, victimName, meansOfDeath] = match;
  
    const isWorldKill = killerName === "<world>";

    return {
      time: timestamp,
      event: "Kill",
      ids: {
        killer: parseInt(killerId, 10),
        victim: parseInt(victimId, 10),
        weapon: parseInt(weaponId, 10),
      },
      players: {
        killer: killerName,
        victim: victimName,
      },
      world: isWorldKill,  
      meansOfDeath: meansOfDeath,
    };
}

async function getDataFromExternalAPI() {
    try {

        const response = await axios.get("https://raw.githubusercontent.com/rubcube/hiring-exercises/master/backend/games.log");

        const gamesData = response.data.trim().split('\n');  

        let acertos = 0;
        let erros = 0;
        const parsedData = gamesData.map(line => {
            const parsedLine = parseLogLine(line, erros, acertos);
            return parsedLine; 
        }).filter(line => line !== null); 
    
        for (let parsedLine of parsedData) {
            try {
            const message = await insertDataIntoTable(parsedLine);  // Inserir no banco
            console.log("Dado inserido:", message);
            } catch (err) {
            console.error("Erro ao inserir dados:", err);
            }
        }
        
        return parsedData;
    
    } catch (error) {
        console.error("Erro ao buscar dados da API externa:", error);
    throw new Error("Erro ao acessar a API externa");
    }
    
}
async function initLogDatabase() {
    try {
    // Verifica e cria a tabela, caso necessário
    await checkAndCreateTable(); 

    const hasMoreThan100Rows = await checkIfTableHasMoreThan100Rows();
    
    if (hasMoreThan100Rows) {

        console.error('Chamando DB:', hasMoreThan100Rows);
        const data = await getAllKills();
        return { data };

    }else{
        const data = await getDataFromExternalAPI();
        return { data };
    }

  } catch (error) {
    console.error('Erro na inicialização do banco de dados de logs:', error);
  }
}

module.exports = { initLogDatabase };


// Código para chamar a função em um controller ou outro lugar:
(async () => {
    const data = await initLogDatabase();
    console.log("Resultado final:", data);
})();
