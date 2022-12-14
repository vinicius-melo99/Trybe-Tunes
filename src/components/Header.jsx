import React, { Component } from 'react';
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
      <header data-testid="header-component">
        {user
          ? <span data-testid="header-user-name">{user}</span>
          : <span>Carregando...</span>}
      </header>
    );
  }
}

export default Header;
