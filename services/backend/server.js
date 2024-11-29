const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
// const { fetchGames } = require('./src/controllers/gameLogDataController');
const districtRoutes = require('./src/routes/districtRoutes');
const { getGameDataFromExternalAPI } = require('./src/services/gameLogService');
const gameDataRoutes = require('./src/routes/dataGameLog'); 
const { getKillCountByKiller, getAllKills, getKillCountByKillerAndWorld } = require('./src/models/killers');

app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

async function initServer() {
  try {
    console.log("Servidor iniciando...");
    
    const parsedLog = await getGameDataFromExternalAPI;

    console.log("Log processado na inicialização:", parsedLog);
  } catch (error) {
    console.error("Erro ao processar o log na inicialização:", error.message);
  }
}

app.get('/api', (req, res) => {
  console.log("aqio ok");
  res.send('Hello from the backend1!');
});

app.use('/api', gameDataRoutes);

app.use(express.json()); // Middleware para lidar com JSON

app.listen(3000, async () => {
  console.log('Backend running on port 3000');
  await initServer();
});
