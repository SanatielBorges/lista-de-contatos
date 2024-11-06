import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adicionarContato } from './redux/contatosSlice';
import styled from 'styled-components';
import { RootState } from './redux/store';
import { v4 as uuidv4 } from 'uuid';
import InputMask from 'react-input-mask';

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Botao = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: calc(100% + 22px); 
  &:hover {
    background-color: #0056b3;
  }
`;

const MaskedInput = styled(InputMask)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const FormularioContato = () => {
  const dispatch = useDispatch();
  const contatos = useSelector((state: RootState) => state.contatos.contatos);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nome.length < 3) {
      alert('O nome deve ter pelo menos 3 caracteres.');
      return;
    }
    const existeEmail = contatos.some(contato => contato.email === email);
    if (existeEmail) {
      alert('Este e-mail já está cadastrado.');
      return;
    }
    const novoContato = { id: uuidv4(), nome, email, telefone };
    dispatch(adicionarContato(novoContato));
    setNome('');
    setEmail('');
    setTelefone('');
  };

  const handleChangeNome = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeTelefone = (e: ChangeEvent<HTMLInputElement>) => {
    setTelefone(e.target.value);
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Nome completo" 
        value={nome} 
        onChange={handleChangeNome} 
        required 
        minLength={3}
      />
      <Input 
        type="email" 
        placeholder="E-mail" 
        value={email} 
        onChange={handleChangeEmail} 
        required 
      />
      <MaskedInput
        mask="(99) 99999-9999"
        value={telefone}
        onChange={handleChangeTelefone}
        placeholder="Telefone"
        required
      />
      <Botao type="submit">Adicionar Contato</Botao>
    </Formulario>
  );
};

export default FormularioContato;
