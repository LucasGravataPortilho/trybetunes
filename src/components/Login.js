import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.onSubmitChange = this.onSubmitChange.bind(this);

    this.state = {
      name: '',
      isDisabled: true,
      loading: false,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.disabledButton());
  }

  onSubmitChange(event) {
    event.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    const three = 3000;
    this.setState({
      loading: true,
    });
    createUser({ name });
    setTimeout(() => {
      history.push('/search');
    }, three);
  }

  disabledButton() {
    const { name } = this.state;
    const tres = 3;
    if (name.length >= tres) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, isDisabled, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Login:
            <input
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.onSubmitChange }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string,
}.isRequired;

export default Login;
