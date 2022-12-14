import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchArtist: '',
      isButtonDisabled: true,
    };
  }

  handleChange({ target: { name, value } }) {
    const minLength = 2;
    this.setState({
      [name]: value,
      isButtonDisabled: value.length < minLength,
    });
  }

  render() {
    const { searchArtist, isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search" className="flex-page">
        <Header />
        <div className="main-content">
          <header>
            <div className="search-artist-container">
              <input
                name="searchArtist"
                type="text"
                data-testid="search-artist-input"
                className="search-artist-input"
                placeholder="NOME DO ARTISTA"
                onChange={ this.handleChange }
                value={ searchArtist }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                className="search-artist-button"
                disabled={ isButtonDisabled }
              >
                Pesquisar
              </button>
            </div>
          </header>
          <section />
        </div>
      </div>
    );
  }
}

export default Search;
