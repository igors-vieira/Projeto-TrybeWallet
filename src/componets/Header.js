import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, totalExpenses } = this.props;
    let TOTAL_GASTOS = 0;
    totalExpenses.forEach((gasto) => {
      const choisedCoinAsk = gasto.exchangeRates[gasto.currency].ask;
      const exchangeValue = choisedCoinAsk * gasto.value;
      TOTAL_GASTOS += exchangeValue;
    });

    return (
      <div>
        <h1 data-testid="email-field">{ user }</h1>
        <h2 data-testid="total-field">{ parseFloat(TOTAL_GASTOS).toFixed(2) }</h2>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  totalExpenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
