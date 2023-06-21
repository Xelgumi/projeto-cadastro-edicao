const express = require('express');
const { insertData, getData, updateData, deleteData } = require('./src/components/db');
const app = express();
app.use(express.json());

// Rota para inserir dados
app.post('/enviar', (req, res) => {
  const { nome, cpf, endereco } = req.body;

  insertData(nome, cpf, endereco, (err, result) => {
    if (err) throw err;
    res.send('Dados inseridos no banco de dados com sucesso');
  });
});


app.get('/dados', (req, res) => {
  // Busca os dados do banco de dados  
  getData((err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});


// Rota para atualizar dados
app.put('/atualizar/:cpf', (req, res) => {
  const { cpf } = req.params;
  const { nome, endereco } = req.body;

  updateData(cpf, nome, endereco, (err, result) => {
    if (err) throw err;
    res.send('Dados atualizados no banco de dados com sucesso');
  });
});



// Rota para excluir dados
app.delete('/excluir/:cpf', (req, res) => {
  const { cpf } = req.params;

  deleteData(cpf, (err, result) => {
    if (err) throw err;
    res.send('Dados excluídos do banco de dados com sucesso');
  });
});

app.listen(8080, () => {
  console.log('Servidor Express em execução na porta 8080');
});
