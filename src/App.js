import React, { useEffect, useState } from "react";
import api from './services/api.js';
import Header from './Header.js';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
          setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Novo repositorio ${Date.now()}`,
  });

  const repository = response.data;

  setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repository_position = repositories.findIndex(repository => repository.id === id);
    
    repositories.splice(repository_position, 1);

    setRepositories([...repositories]);
  }

  return (
    <>
      <Header title="Repositories" />
      <br />
      <ul data-testid="repository-list">
        
        {repositories.map(
          repository => <li key={repository.id}>{repository.title}
        
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
