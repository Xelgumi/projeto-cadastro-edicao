import React, { useState } from 'react';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [nomeCadastrado, setNomeCadastrado] = useState('');
  const [cpfCadastrado, setCpfCadastrado] = useState('');
  const [enderecoCadastrado, setEnderecoCadastrado] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    };

    fetch('/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Dados enviados com sucesso');
          setNomeCadastrado(nome);
          setCpfCadastrado(cpf);
          setEnderecoCadastrado(endereco);
          setNome('');
          setCpf('');
          setEndereco('');
          setCadastroSucesso(true);
        } else {
          console.error('Erro ao enviar os dados:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados:', error);
      });
  };

  return (
    <div>
      <form className="formulario" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="cpf">
            CPF:
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="endereco">
            Endereço:
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
            />
          </label>
        </div>

        <button className="FormBtn" type="submit">Enviar</button>
      </form>
      {
        cadastroSucesso && 
        <div className='userCad'>
          <p>Usuário cadastrado com sucesso!</p>
          <p>Nome: {nomeCadastrado}</p>
          <p>CPF: {cpfCadastrado}</p>
          <p>Endereço: {enderecoCadastrado}</p>
        </div>
      }
    </div>
  );
};

export default Cadastro;
