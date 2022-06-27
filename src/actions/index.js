const URL_FETCH = 'https://economia.awesomeapi.com.br/json/all';
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

// EditAction

export const BUTTON_EDIT = 'BUTTON_EDIT';

export const buttonEdit = (idToEdit) => ({
  type: BUTTON_EDIT,
  idToEdit,
});

export const EDIT_ACT = 'EDIT_ACT';

export const editAct = (expense) => ({
  type: EDIT_ACT,
  expense,
});

// export const editActThunk = (idEdited, obj) => (dispatch) => {
//   const { despesa, moeda } = idEdited;
//   fetch(URL_FETCH)
//     .then((response) => response.json())
//     .then((resp) => {
//       if (obj.length) {
//         const objForSave = [{
//           ...idEdited,
//           value: despesa,
//           currency: moeda,
//           exchangeRates: resp,
//         }, ...obj];
//         console.log('1 IF');
//         dispatch(editAct(objForSave));
//       } else {
//         console.log('2 IF');
//         const objForSave = [{
//           ...idEdited,
//           value: despesa,
//           currency: moeda,
//           exchangeRates: resp,
//         }];
//         dispatch(editAct(objForSave));
//       }
//     })
//     .catch((err) => console.log(err));
// };

// MoedasThunk

export const CURRENCIES = 'CURRENCIES';

const currenciesCoin = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const currenciesFetchThunk = () => (dispatch) => {
  fetch(URL_FETCH)
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
  fetch(URL_FETCH)
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
