import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  currenciesFetchThunk,
  expensesFetchThunk,
  deleteAction,
  buttonEdit,
  editAct,
} from '../actions';
import Header from '../componets/Header';

class Wallet extends React.Component {
state = {
  description: '',
  despesa: '',
  method: '',
  moeda: '',
  tag: '',
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
  const { dispatchExpenses, expenses } = this.props;
  const objSave = {
    id: expenses.length,
    ...this.state,
  };
  dispatchExpenses(objSave);
  this.setState({
    description: '',
    despesa: '',
    method: '',
    moeda: '',
    tag: 'default',
  });
}

handleDelete = ({ target }) => {
  const { id } = target;
  const { dispatchDelete } = this.props;

  dispatchDelete(id);
}

handleBtnEdit = ({ target }) => {
  const { id } = target;
  const { dispatchBtnEdit } = this.props;
  dispatchBtnEdit(Number(id));
}

handleEdit = () => {
  const { idToEdit, dispatchEditExpenses } = this.props;
  const { description, despesa, method, moeda, tag } = this.state;
  const newIdEdited = {
    id: idToEdit,
    description,
    value: despesa,
    currency: moeda,
    method,
    tag,
  };
  dispatchEditExpenses(newIdEdited);
  this.setState({
    description: '',
    despesa: 0,
    method: '',
    moeda: '',
    tag: 'default',
  });
}

render() {
  const { moedas, expenses, editar } = this.props;
  const { description, despesa, method, moeda, tag } = this.state;
  return (
    <div>
      <Header />
      <form>
        <label htmlFor="despesa">
          Valor
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            value={ despesa }
            type="text"
            id="despesa"
          />
        </label>
        <label htmlFor="description">
          Descrição
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
                { coin }
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
            defaultValue="default"
          >
            <option value="default" disabled hidden>Escolha a Tag para Dispesa</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
        {editar
          ? (
            <button
              onClick={ this.handleEdit }
              type="button"
            >
              Editar despesa
            </button>
          )
          : (
            <button
              onClick={ this.handleClick }
              type="button"
            >
              Adicionar despesa
            </button>
          )}
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((gasto) => (
            <tr key={ gasto.id }>
              <td>{ gasto.description }</td>
              <td>{ gasto.tag }</td>
              <td>{ gasto.method }</td>
              <td>{ Number(gasto.value).toFixed(2) }</td>
              <td>{ gasto.exchangeRates[gasto.currency].name }</td>
              <td>{ Number(gasto.exchangeRates[gasto.currency].ask).toFixed(2) }</td>
              <td>
                { Number(gasto.exchangeRates[gasto.currency]
                  .ask * gasto.value).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ this.handleBtnEdit }
                  id={ gasto.id }
                >
                  Editar
                </button>
                <button
                  onClick={ this.handleDelete }
                  data-testid="delete-btn"
                  type="button"
                  id={ gasto.id }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  dispatchThunk: () => dispatch(currenciesFetchThunk()),
  dispatchExpenses: (payload) => dispatch(expensesFetchThunk(payload)),
  dispatchDelete: (id) => dispatch(deleteAction(id)),
  dispatchBtnEdit: (idToEdit) => dispatch(buttonEdit(idToEdit)),
  dispatchEditExpenses: (editExpenses) => dispatch(editAct(editExpenses)),
});

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editar: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

Wallet.propTypes = {
  dispatchThunk: PropTypes.func,
  moedas: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
