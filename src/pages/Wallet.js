import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currenciesFetchThunk, expensesFetchThunk } from '../actions';
import Header from '../componets/Header';

class Wallet extends React.Component {
state = {
  description: '',
  despesa: 0,
  method: '',
  moeda: '',
  tag: '',
  id: 0,
}

componentDidMount() {
  const { dispatchThunk } = this.props;
  dispatchThunk();
}

handleChange = ({ target }) => {
  const { id, value } = target;

  this.setState({
    [id]: value,
  });
}

handleClick = () => {
  const { dispatchExpenses } = this.props;
  const { description, despesa, method, moeda, tag, id } = this.state;
  const objSave = {
    id,
    description,
    despesa,
    method,
    moeda,
    tag,
  };
  dispatchExpenses(objSave);
  this.setState((prev) => ({
    id: prev.id + 1,
    description: '',
    despesa: 0,
    method: '',
    moeda: '',
    tag: '',
  }));
}

render() {
  const { moedas } = this.props;
  const { description, despesa, method, moeda, tag } = this.state;
  return (
    <div>
      <Header />
      <form>
        <label htmlFor="despesa">
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            value={ despesa }
            type="text"
            id="despesa"
          />
        </label>
        <label htmlFor="description">
          <input
            onChange={ this.handleChange }
            data-testid="description-input"
            value={ description }
            type="text"
            id="description"
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select onChange={ this.handleChange } value={ moeda } id="moeda">
            <option value="" disabled hidden>Escolha Moeda</option>
            {moedas.map((coin, i) => (
              <option key={ i + coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            onChange={ this.handleChange }
            value={ method }
            id="method"
            data-testid="method-input"
          >
            <option value="" disabled hidden>Metodo de Pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            onChange={ this.handleChange }
            valeu={ tag }
            id="tag"
            data-testid="tag-input"
          >
            <option value="" disabled hidden>Escolha a Tag para Dispesa</option>
            { /* https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box */ }
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>

        <button
          onClick={ this.handleClick }
          type="button"
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  dispatchThunk: () => dispatch(currenciesFetchThunk()),
  dispatchExpenses: (payload) => dispatch(expensesFetchThunk(payload)),
});

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatchThunk: PropTypes.func,
  moedas: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
