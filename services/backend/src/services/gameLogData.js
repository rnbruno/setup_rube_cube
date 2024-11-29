// src/services/externalApiService.js

const axios = require('axios');

async function getGameDataFromExternalAPI() {
    try {

        const response = await axios.get("https://raw.githubusercontent.com/rubcube/hiring-exercises/master/backend/games.log");
   
        // console.log("w121", response);

        const gamesData = response.data.trim().split('\n');  
        console.log("w1231", gamesData);
        const lineCount = gamesData.length


        const filteredData = gamesData.filter(item => item.includes("active")); 
        return gamesData;  
    
    } catch (error) {
    console.error("Erro ao buscar dados da API externa:", error);
    throw new Error("Erro ao acessar a API externa");
    }
}

module.exports = { getGameDataFromExternalAPI };


// Código para chamar a função em um controller ou outro lugar:
(async () => {
const data = await getGameDataFromExternalAPI();
console.log("Resultado final:", data);
})();
