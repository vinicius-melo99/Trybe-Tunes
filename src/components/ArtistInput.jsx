import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ArtistInput extends Component {
  render() {
    const {
      searchArtist,
      isButtonDisabled,
      searchAlbums,
      handleChange,
    } = this.props;
    return (
      <div className="search-artist-container">
        <input
          name="searchArtist"
          type="text"
          data-testid="search-artist-input"
          className="search-artist-input"
          placeholder="NOME DO ARTISTA"
          onChange={ handleChange }
          value={ searchArtist }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          className="search-artist-button"
          disabled={ isButtonDisabled }
          onClick={ searchAlbums }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

ArtistInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  searchAlbums: PropTypes.func.isRequired,
  searchArtist: PropTypes.string.isRequired,
};

export default ArtistInput;
