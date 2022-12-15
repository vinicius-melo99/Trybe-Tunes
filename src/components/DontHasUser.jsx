import React, { Component } from 'react';
import profileImage from '../imgs/profile-user.png';

class DontHasUser extends Component {
  render() {
    return (
      <div>
        <span className="user-name-label">
          <img src={ profileImage } alt="imagem do perfil" />
          Carregando...
        </span>
      </div>
    );
  }
}

export default DontHasUser;
