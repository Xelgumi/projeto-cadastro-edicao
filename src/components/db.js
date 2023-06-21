const mysql = require('mysql');

// Cria uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cadastro'
});

// Conecta no banco de dados
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});


/* As funções abaixo são exportadas e usadas pelo Server.js */
// Insere dados no banco dados no banco de dados
const insertData = (nome, cpf, endereco, callback) => {
  const query = `INSERT INTO dados (nome, cpf, endereco) VALUES (?, ?, ?)`;
  const values = [nome, cpf, endereco];

  connection.query(query, values, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

  //consulta SQL
  const getData = (callback) => {
  const querySelect = 'SELECT * FROM dados';
  connection.query(querySelect, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });

  };

// Atualiza dados no banco de dados
const updateData = (cpf, nome, endereco, callback) => {
  const sql = 'UPDATE dados SET nome = ?, endereco = ? WHERE cpf = ?';
  const values = [nome, endereco, cpf];

  connection.query(sql, values, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};




// Exclui dados do banco de dados
const deleteData = (cpf, callback) => {
    const sqlDel = 'DELETE from dados where cpf = ?';
    const values = [cpf];
  
    connection.query(sqlDel, values, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  };
  
/* Exporta os modulos */
module.exports = {
  insertData,
  getData,
  updateData,
  deleteData
};






