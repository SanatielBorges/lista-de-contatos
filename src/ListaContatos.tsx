import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { removerContato, editarContato } from './redux/contatosSlice';
import styled from 'styled-components';

const Lista = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Titulo = styled.div`
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 4px 4px 0 0;
  font-size: 20px;
`;

const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f1f1f1;
  font-weight: bold;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Linha = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;

  &:nth-child(even) {
    background-color: #f1f1f1;
  }

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const Celula = styled.div`
  flex: 1;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    flex: 2; /* Aumenta o espaço para o campo Nome */
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
    padding: 5px 0;
    text-align: left;

    &:before {
      content: attr(data-title) ": ";
      font-weight: bold;
      flex: 0 0 100px;
    }
  }
`;

const Botoes = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    margin-top: 10px;
  }
`;

interface BotaoProps {
  color: string;
}

const Botao = styled.button<BotaoProps>`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const InputEdicao = styled.input`
  padding: 5px;
  margin-bottom: 5px;
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ListaContatos = () => {
  const contatos = useSelector((state: RootState) => state.contatos.contatos);
  const dispatch = useDispatch();

  const [editando, setEditando] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleRemover = (id: string) => {
    dispatch(removerContato(id));
  };

  const handleEditar = (contato: { id: string; nome: string; email: string; telefone: string }) => {
    setEditando(contato.id);
    setNome(contato.nome);
    setEmail(contato.email);
    setTelefone(contato.telefone);
  };

  const handleSalvar = (id: string) => {
    // Verifica se o email já está cadastrado, excluindo o próprio contato que está sendo editado
    const existeEmail = contatos.some(
      (contato) => contato.email === email && contato.id !== id
    );

    if (existeEmail) {
      alert('Este e-mail já está cadastrado.');
      return; // Não faz nada se o e-mail já estiver cadastrado
    }

    // Se o e-mail não estiver cadastrado, realiza a edição
    dispatch(editarContato({ id, nome, email, telefone }));
    setEditando(null);
  };

  return (
    <Lista>
      <Titulo>
        Contatos
      </Titulo>
      <Cabecalho>
        <Celula>Nome</Celula>
        <Celula>E-mail</Celula>
        <Celula>Telefone</Celula>
        <Celula>Ações</Celula>
      </Cabecalho>
      {contatos.map((contato) => (
        <Linha key={contato.id}>
          {editando === contato.id ? (
            <>
              <Celula data-title="Nome">
                <InputEdicao 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                />
              </Celula>
              <Celula data-title="E-mail">
                <InputEdicao 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Celula>
              <Celula data-title="Telefone">
                <InputEdicao 
                  type="tel" 
                  value={telefone} 
                  onChange={(e) => setTelefone(e.target.value)} 
                />
              </Celula>
              <Celula data-title="Ações">
                <Botoes>
                  <Botao color="#28a745" onClick={() => handleSalvar(contato.id)}>Salvar</Botao>
                  <Botao color="#6c757d" onClick={() => setEditando(null)}>Cancelar</Botao>
                </Botoes>
              </Celula>
            </>
          ) : (
            <>
              <Celula data-title="Nome">{contato.nome}</Celula>
              <Celula data-title="E-mail">{contato.email}</Celula>
              <Celula data-title="Telefone">{contato.telefone}</Celula>
              <Celula data-title="Ações">
                <Botoes>
                  <Botao color="#007bff" onClick={() => handleEditar(contato)}>Editar</Botao>
                  <Botao color="#dc3545" onClick={() => handleRemover(contato.id)}>Remover</Botao>
                </Botoes>
              </Celula>
            </>
          )}
        </Linha>
      ))}
    </Lista>
  );
};

export default ListaContatos;
