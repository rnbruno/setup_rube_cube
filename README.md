
Clone os Arquivos do Repositório e Laravel
```sh
git clone https://github.com/rnbruno/setup_rube_cube app-rube_cube
```
Ambiente com docker comp

docker-compose up -d

Iniciando containners de front, back, nginx e mysql

http://localhost:3031 
```front-end
http://localhost:3031 
```back-end


No back - end instalamos o expressj

npm install --save-dev nodemon 
#para auxiliar na atualização de código 

Para capturar os logs 
Instalo o axios

npm install axios

Criando pastas de public, src, models




# setup_rube_cube
Complete o máximo que você puder do exercício no tempo estipulado nas instruções. Garanta que os seguintes entregáveis estejam presentes no seu envio:
um arquivo README.md com as seguintes informações

alguns prints e evidências do produto final;
o exercício que você escolheu e o porque, caso exista mais de uma opção de teste para a vaga;
como testar e rodar a aplicação;
qualquer observação que você sentiu durante o processo se algo foi difícil de fazer, confuso, frustrante;
qualquer coisa que você quer nos dizer sobre o processo.
um arquivo de ROADMAP.md com:

as histórias que você atendeu e a descrição de como;
o que você adicionaria se tivesse mais tempo;
o que você faria diferente se tivesse mais tempo.
Ao completar o exercício, mandar o link do repositório com qualquer instrução especial para rh@rubcube.com


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