import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { validationUser } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    const TAMANHO_MIN = 6;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    this.setState({
      [id]: value,
    }, () => {
      const { email, password } = this.state;
      const buttonOn = emailRegex.test(email);
      this.setState({ disabled: !buttonOn || password.length < TAMANHO_MIN });
    });
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(validationUser(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            onChange={ this.handleChange }
            data-testid="email-input"
            value={ email }
            type="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            onChange={ this.handleChange }
            data-testid="password-input"
            value={ password }
            type="password"
            id="password"
          />
        </label>
        <button
          onClick={ this.handleClick }
          type="button"
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
