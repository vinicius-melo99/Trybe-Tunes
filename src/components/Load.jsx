import React, { Component } from 'react';
import loading from '../imgs/loading.gif';

class Load extends Component {
  render() {
    return (
      <div className="page-loading">
        <img src={ loading } alt="animação de carregamento" />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Load;
