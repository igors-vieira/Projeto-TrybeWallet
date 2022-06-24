// salva email usuario
export const VALIDATION_USER = 'VALIDATION_USER';

export const validationUser = (email) => ({
  type: VALIDATION_USER,
  email,
});

// DeleteAction

export const DELETE_ACT = 'DELETE_ACT';

export const deleteAction = (id) => ({
  type: DELETE_ACT,
  id,
});

// MoedasThunk

export const CURRENCIES = 'CURRENCIES';

const currenciesCoin = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const currenciesFetchThunk = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((resp) => {
      const arrCoinName = Object.keys(resp).map((coin) => coin);
      const arrForDispatch = arrCoinName.filter((coinName) => coinName !== 'USDT');
      return dispatch(currenciesCoin(arrForDispatch));
    }).catch((err) => console.log(err));
};

// expenses thunk

export const EXPENSES_ACT = 'EXPENSES_ACT';

const expensesAct = (expenses) => ({
  type: EXPENSES_ACT,
  expenses,
});

export const expensesFetchThunk = (obj) => (dispatch) => {
  const { method, moeda, tag, description, despesa, id } = obj;
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((resp) => {
      const objForSave = [{
        id,
        method,
        tag,
        value: despesa,
        currency: moeda,
        description,
        exchangeRates: resp,
      }];
      dispatch(expensesAct(objForSave));
    })
    .catch((err) => console.log(err));
};
