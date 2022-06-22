// Coloque aqui suas actions
export const VALIDATION_USER = 'VALIDATION_USER';

export const validationUser = (email) => ({
  type: VALIDATION_USER,
  email,
});

export const CURRENCIES = 'CURRENCIES';

export const currenciesCoin = (currencies) => ({
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
