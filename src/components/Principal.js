import {useState} from 'react';
import Cadastro from './Cadastro';
import Edicao from './Edicao';
import Apagar from './Apagar';

const Principal = () => {
    const [content, setContent] = useState('');
    /*Botões que trocam o conteúdo principal*/
    const fetchContentRegister = () => {
        const newContent = <Cadastro />;
        setContent(newContent);
    };
    const fetchContentEdit = () => {
        const newContent = <Edicao />;
        setContent(newContent);
    };
    const fetchContentErase = () => {
        const newContent = <Apagar />;
        setContent(newContent);
    };
    /*Botões que trocam o conteúdo principal*/
    return (
      <div className="row">
        <div className="App-buttons">
          <button onClick={fetchContentRegister}>Cadastro de Usuário</button>
          <button onClick={fetchContentEdit}>Editar Usuário</button>
          <button onClick={fetchContentErase}>Apagar Usuário</button>
        </div>
        
        <div>{content}</div>
      </div>
    );
};

export default Principal;