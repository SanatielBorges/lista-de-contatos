import React from 'react';
import FormularioContato from './FormularioContato';
import ListaContatos from './ListaContatos';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <Container>
      <h1>Lista de Contatos</h1>
      <FormularioContato />
      <ListaContatos />
    </Container>
  );
};

export default App;
