import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Load from './Load';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.submitInformation = this.submitInformation.bind(this);
    this.state = {
      userName: '',
      isButtonDisabled: true,
      pageIsLoading: false,
    };
  }

  handleInput({ target: { name, value } }) {
    const minLength = 3;
    this.setState({
      [name]: value,
      isButtonDisabled: (value.length < minLength),
    });
  }

  async submitInformation() {
    const { userName } = this.state;
    const { history } = this.props;

    this.setState({ pageIsLoading: true });
    await createUser({ name: userName });
    history.push('/search');
  }

  render() {
    const { userName, isButtonDisabled, pageIsLoading } = this.state;
    if (pageIsLoading) {
      return <Load />;
    }
    return (

      <div data-testid="page-login" className="body-login">
        <section className="login-container">
          <section className="header-login">
            <h1>
              <span
                id="header-login-title"
              >
                Trybe
              </span>
              {' '}
              Tunes
            </h1>
          </section>
          <section className="login-input-container">
            <input
              data-testid="login-name-input"
              name="userName"
              type="text"
              className="name-input"
              placeholder="Qual é o seu nome?"
              value={ userName }
              onChange={ this.handleInput }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              className="send-name"
              disabled={ isButtonDisabled }
              onClick={ this.submitInformation }
            >
              Entrar
            </button>
          </section>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
