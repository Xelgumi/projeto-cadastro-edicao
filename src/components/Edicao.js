import React, { useState, useEffect } from 'react';



const Edicao = () => {
    const [dados, setDados] = useState('');
    const [editingId, setEditingId] = useState([]);
  
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
  
    const handleInputChange = (event, cpf) => {
      const { name, value } = event.target;
  
      setDados((prevDados) =>
        prevDados.map((item) => {
          if (item.cpf === cpf) {
            return { ...item, [name]: value };
          }
          return item;
        })
      );
    };
  
    const handleSave = (cpf) => {
        const item = dados.find((item) => item.cpf === cpf);
        
        // Verifica se o item existe antes de enviar para o servidor
        if (item) {
          // Atualiza os dados no servidor
          fetch(`/atualizar/${cpf}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Dados atualizados:', data);
            })
            .catch((error) => {
              console.error('Erro ao atualizar os dados:', error);
            });
        }
        
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
                      <input
                        type="text"
                        name="nome"
                        value={item.nome}
                        onChange={(event) => handleInputChange(event, item.cpf)}
                      />
                    ) : (
                      item.nome
                    )}
                  </td>
                  <td>{item.cpf}</td>
                  <td>
                    {editingId === item.cpf ? (
                      <input
                        type="text"
                        name="endereco"
                        value={item.endereco}
                        onChange={(event) => handleInputChange(event, item.cpf)}
                      />
                    ) : (
                      item.endereco
                    )}
                  </td>
                  <td>
                    {editingId === item.cpf ? (
                      <button onClick={() => handleSave(item.cpf)}>Salvar</button>
                    ) : (
                      <button onClick={() => setEditingId(item.cpf)}>Editar</button>
                    )}
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

export default Edicao;