import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currenciesFetchThunk } from '../actions';
import Header from '../componets/Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatchThunk } = this.props;
    dispatchThunk();
  }

  render() {
    const { moedas } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="despesa">
            <input data-testid="value-input" type="text" id="despesa" />
          </label>
          <label htmlFor="description">
            <input data-testid="description-input" type="text" id="description" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda">
              {moedas.map((moeda, i) => (
                <option key={ i + moeda }>
                  {moeda}
                </option>
              ))}
            </select>
          </label>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchThunk: () => dispatch(currenciesFetchThunk()),
});

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatchThunk: PropTypes.func,
  moedas: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
