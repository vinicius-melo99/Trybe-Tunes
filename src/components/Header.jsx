import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ user: name });
  }

  render() {
    const { user } = this.state;

    return (
      <header
        data-testid="header-component"
        className="page-side-nav"
      >
        <section>
          <h1>
            Trybe
            <span id="white"> Tunes</span>
          </h1>
        </section>
        <section className="header-nav-links">
          <Link
            to="/search"
            className="nav-link"
            data-testid="link-to-search"
          >
            Pesquisar
          </Link>
          <Link
            to="/favorites"
            className="nav-link"
            data-testid="link-to-favorites"
          >
            Favoritas
          </Link>
          <Link
            to="/profile"
            className="nav-link"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </section>
        <section className="header-user-name">
          {user
            ? <span data-testid="header-user-name">{user}</span>
            : <span>Carregando...</span>}
        </section>

      </header>
    );
  }
}

export default Header;
