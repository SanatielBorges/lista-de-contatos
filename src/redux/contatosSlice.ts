import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

interface ContatosState {
  contatos: Contato[];
}

const initialState: ContatosState = {
  contatos: [],
};

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    adicionarContato: (state, action: PayloadAction<Contato>) => {
      const existeEmail = state.contatos.some(contato => contato.email === action.payload.email);
      if (!existeEmail) {
        state.contatos.push(action.payload);
      } else {
        alert('Este e-mail já está cadastrado.');
      }
    },
    removerContato: (state, action: PayloadAction<string>) => {
      state.contatos = state.contatos.filter(contato => contato.id !== action.payload);
    },
    editarContato: (state, action: PayloadAction<Contato>) => {
      const index = state.contatos.findIndex(contato => contato.id === action.payload.id);
      const existeEmail = state.contatos.some(
        contato => contato.email === action.payload.email && contato.id !== action.payload.id
      );
      if (existeEmail) {
        alert('Este e-mail já está cadastrado.');
      } else if (index !== -1) {
        state.contatos[index] = action.payload;
      }
    },
  },
});

export const { adicionarContato, removerContato, editarContato } = contatosSlice.actions;
export default contatosSlice.reducer;
