import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.updateNewInfo = this.updateNewInfo.bind(this);
    this.state = {
      userName: '',
      email: '',
      description: '',
      image: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const userInfo = await getUser();
    const { description, email, image, name } = userInfo;
    this.setState({
      description,
      email,
      image,
      userName: name,
      isLoading: false,
    }, this.validateInputs);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.validateInputs);
  }

  validateInputs() {
    const { userName, email, description, image } = this.state;
    const minLength = 1;
    const validateUser = userName.length >= minLength;
    const validateEmail = (email.length >= minLength)
      && this.validateEmailFormat(email);
    const validateDescription = description.length >= minLength;
    const validateImage = image.length >= minLength;

    this.setState({
      isButtonDisabled: !(validateUser && validateEmail
          && validateDescription && validateImage),
    });
  }

  validateEmailFormat(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(email);
  }

  async updateNewInfo() {
    const { history } = this.props;
    const newInfo = { ...this.state };
    const { userName: name, email, image, description } = newInfo;
    const newUserInfo = {
      name,
      email,
      image,
      description,
    };
    this.setState({ isLoading: true, isButtonDisabled: true });
    await updateUser(newUserInfo);
    this.setState({ isLoading: false });
    history.push('/profile');
  }

  render() {
    const {
      userName,
      email,
      description,
      image,
      isButtonDisabled,
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-profile-edit" className="flex-page">
        <Header />
        <div className="main-content">
          <header>
            <h1 className="header-title">Editar Perfil</h1>
          </header>
          <section className="render-albums-input align-center">
            <section className="info-wrap-edit text-align-left">
              <img src={ image } alt="imagem perfil" className="profile-img-edit" />
              <input
                name="image"
                data-testid="edit-input-image"
                type="text"
                value={ image }
                placeholder="Nova Imagem"
                className="input-edit-design"
                onChange={ this.handleChange }
              />
            </section>

            <section className="info-wrap-edit text-align-left">
              <h3 className="info-title">Nome</h3>
              <input
                name="userName"
                data-testid="edit-input-name"
                type="text"
                value={ userName }
                onChange={ this.handleChange }
                className="input-edit-design"
              />
            </section>
            <section className="info-wrap-edit text-align-left">
              <h3 className="info-title">Email</h3>
              <input
                name="email"
                data-testid="edit-input-email"
                type="email"
                value={ email }
                className="input-edit-design"
                onChange={ this.handleChange }
              />
            </section>
            <section className="info-wrap-edit text-align-left">
              <h3 className="info-title">Descrição</h3>
              <textarea
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
                className="textarea-edit-design"
              />
            </section>
            <section className="info-wrap-edit text-align-left">
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ isButtonDisabled }
                onClick={ this.updateNewInfo }
                className="perfil-edit-button"
              >
                {isLoading ? 'Carregando...' : 'Salvar Informações'}
              </button>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
