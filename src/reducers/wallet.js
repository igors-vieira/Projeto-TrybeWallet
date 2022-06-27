// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, EXPENSES_ACT, DELETE_ACT, BUTTON_EDIT, EDIT_ACT } from '../actions';

const INTIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INTIAL_STATE, action) => {
  const { type, currencies, expenses, id, idToEdit, expense } = action;
  switch (type) {
  case CURRENCIES:
    return {
      ...state,
      currencies,
    };

  case EXPENSES_ACT:
    return {
      ...state,
      expenses: [...state.expenses, ...expenses],
    };
  case DELETE_ACT:
    return {
      ...state,
      expenses: state.expenses.filter((gasto) => gasto.id !== Number(id)),
    };
  case BUTTON_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit,
    };
  case EDIT_ACT:
    return {
      ...state,
      expenses: state.expenses.map((gasto) => {
        if (gasto.id === expense.id) {
          return { ...gasto, ...expense };
        }
        return gasto;
      }),
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
