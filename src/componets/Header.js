import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">{ user }</h1>
        <h2 data-testid="total-field">0</h2>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Header.propTypes = {
  user: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
