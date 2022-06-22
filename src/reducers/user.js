// Esse reducer será responsável por tratar as informações da pessoa usuária
import { VALIDATION_USER } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, email } = action;
  switch (type) {
  case VALIDATION_USER:
    return { ...state,
      email,
    };
  default:
    return state;
  }
};

export default userReducer;
