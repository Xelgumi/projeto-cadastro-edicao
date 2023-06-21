import React, { useState, useEffect } from 'react';

const Apagar = () => {
  const [dados, setDados] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('/dados')
      .then((response) => response.json())
      .then((data) => {
        setDados(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados:', error);
      });
  }, []);

  const handleDelete = (cpf) => {
    // Exclui os dados no servidor
    fetch(`/excluir/${cpf}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove o item excluído dos dados
          setDados((prevDados) => prevDados.filter((item) => item.cpf !== cpf));
        } else {
          console.error('Erro ao excluir os dados:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir os dados:', error);
      });

    setEditingId(null);
  };

  return (
    <div>
      {dados.length > 0 ? (
        <table className="datatable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item) => (
              <tr key={item.cpf}>
                <td>
                  {editingId === item.cpf ? (
                    <input type="text" name="nome" value={item.nome} />
                  ) : (
                    item.nome
                  )}
                </td>
                <td>{item.cpf}</td>
                <td>
                  {editingId === item.cpf ? (
                    <input type="text" name="endereco" value={item.endereco} />
                  ) : (
                    item.endereco
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(item.cpf)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Apagar;
