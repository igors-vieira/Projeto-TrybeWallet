// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES } from '../actions';

const INTIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INTIAL_STATE, action) => {
  const { type, currencies } = action;
  switch (type) {
  case CURRENCIES:
    return {
      ...state,
      currencies,
    };
  default:
    return state;
  }
};

export default walletReducer;
