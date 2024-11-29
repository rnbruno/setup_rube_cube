// src/db/queries.js
const connection = require('../db/connection');

// Função para verificar se a tabela existe e criar se necessário
function checkAndCreateTable() {
  return new Promise((resolve, reject) => {
    connection.query('SHOW TABLES LIKE "killer"', (err, results) => {
      if (err) {
        reject('Erro ao verificar tabela: ' + err);
        return;
      }

      if (results.length === 0) {
        // Tabela não existe, então cria a tabela
        const createTableQuery = `
          CREATE TABLE killer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            time VARCHAR(255),
            event VARCHAR(255),
            killer_id INT,
            victim_id INT,
            weapon_id INT,
            killer_name VARCHAR(255),
            victim_name VARCHAR(255),
            world BOOLEAN,
            means_of_death VARCHAR(255)
          )
        `;

        connection.query(createTableQuery, (err) => {
          if (err) {
            reject('Erro ao criar tabela: ' + err);
          } else {
            resolve('Tabela "killer" criada com sucesso!');
          }
        });
      } else {
        resolve('Tabela "killer" já existe.');
      }
    });
  });
}

// Função para inserir dados na tabela "killer"
function insertDataIntoTable(logData) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO killer (time, event, killer_id, victim_id, weapon_id, killer_name, victim_name, world, means_of_death)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      logData.time,
      logData.event,
      logData.ids.killer,
      logData.ids.victim,
      logData.ids.weapon,
      logData.players.killer,
      logData.players.victim,
      logData.world,
      logData.meansOfDeath,
    ];

    connection.query(insertQuery, values, (err) => {
      if (err) {
        reject('Erro ao inserir dados: ' + err);
      } else {
        resolve('Dados inseridos com sucesso.');
      }
    });
  });
}

// Função para verificar se a tabela "killer" tem mais de 100 linhas
function checkIfTableHasMoreThan100Rows() {
    return new Promise((resolve, reject) => {
      const countQuery = 'SELECT COUNT(*) AS rowCount FROM killer';
  
      connection.query(countQuery, (err, results) => {
        if (err) {
          reject('Erro ao contar as linhas: ' + err);
          return;
        }
  
        // Verifica se o número de linhas é maior que 100
        const rowCount = results[0].rowCount;
        if (rowCount > 100) {
          resolve(true);  // A tabela tem mais de 100 linhas
        } else {
          resolve(false); // A tabela tem 100 ou menos linhas
        }
      });
    });
  }

  const getAllKills = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM killer';
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna todos os registros encontrados
        }
      });
    });
  };

  const getKillsByTimeRange = (startTime, endTime) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM killer WHERE time BETWEEN ? AND ?';
  
      connection.query(selectQuery, [startTime, endTime], (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna os registros dentro do intervalo de tempo
        }
      });
    });
  };

  const getKillCountByKiller = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = `
        SELECT killer_name, COUNT(*) AS kill_count
        FROM killer
        GROUP BY killer_name
        ORDER BY kill_count DESC
      `;
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna o número de kills por killer
        }
      });
    });
  };

  const getTotalKillAndWordlTrueAndFalse = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = `
        SELECT 
          COUNT(*) AS total_deaths, 
          SUM(CASE WHEN world = true THEN 1 ELSE 0 END) AS deaths_with_world_true, 
          SUM(CASE WHEN world = false THEN 1 ELSE 0 END) AS deaths_with_world_false
        FROM 
          killer`;
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna o número de kills por killer
        }
      });
    });
  };

  const getRankingWithNameAlteredInTime = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = `
        SELECT 
            killer_id, 
            GROUP_CONCAT(DISTINCT killer_name ORDER BY time ASC SEPARATOR ', ') AS all_names, 
            COUNT(*) AS total_kills,
            -- Contagem de mortes (quantas vezes o jogador foi vítima)
            (
                SELECT COUNT(*)
                FROM killer AS deaths
                WHERE deaths.victim_id = killer.killer_id 
                  AND deaths.event = 'Kill'
            ) AS total_deaths,
            -- Subtração de mortes do total de kills
            COUNT(*) - (
                SELECT COUNT(*)
                FROM killer AS deaths
                WHERE deaths.victim_id = killer.killer_id
                  AND deaths.event = 'Kill'
            ) AS kills_after_deaths
        FROM 
            killer AS killer
        WHERE 
            killer.event = 'Kill'
            AND killer.killer_name != '<world>'  -- Exclui o <world> de killer_name
        GROUP BY 
            killer_id
        ORDER BY 
            total_kills DESC`;
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna o número de kills por killer
        }
      });
    });
  };



  


  const getKillCountByKillerAndWorld = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = `
        SELECT killer_name,
               COUNT(*) AS total_kills,
               SUM(CASE WHEN world = true THEN 1 ELSE 0 END) AS kills_with_world_true,
               SUM(CASE WHEN world = false THEN 1 ELSE 0 END) AS kills_with_world_false
        FROM killer
        GROUP BY killer_name
        ORDER BY total_kills DESC
      `;
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna a contagem total e as contagens filtradas por 'world'
        }
      });
    });
  };

  const getKillTotalWorldTrueAndFalse = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = `
        SELECT 
        COUNT(*) AS total_kills,
          SUM(CASE WHEN world = true THEN 1 ELSE 0 END) AS kills_with_world_true,
          SUM(CASE WHEN world = false THEN 1 ELSE 0 END) AS kills_with_world_false
        FROM killer
        ORDER BY total_kills DESC;
        `;
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna a contagem total e as contagens filtradas por 'world'
        }
      });
    });
  };
  
  const getKillById = () => {
    return new Promise((resolve, reject) => {
      const selectQuery = `
        SELECT 
          killer_id, 
          killer_name, 
          world,               -- Incluindo o mundo
          COUNT(*) AS total_points
        FROM 
          killer
        WHERE 
          event = 'Kill'
            -- Filtrando pelo mundo 0
        GROUP BY 
          killer_id, 
          killer_name, 
          world                -- Agrupando também por mundo
        ORDER BY 
          total_points DESC;
        `;
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject('Erro ao consultar dados: ' + err);
        } else {
          resolve(results);  // Retorna a contagem total e as contagens filtradas por 'world'
        }
      });
    });
  };

 
  
  

module.exports = {
  checkAndCreateTable,
  insertDataIntoTable,
  checkIfTableHasMoreThan100Rows,
  getAllKills,
  getKillsByTimeRange,
  getKillCountByKiller,
  getKillCountByKillerAndWorld,
  getKillTotalWorldTrueAndFalse,
  getKillById,
  getTotalKillAndWordlTrueAndFalse,
  getRankingWithNameAlteredInTime
};
