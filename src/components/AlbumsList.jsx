import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlbumCard from './AlbumCard';

class AlbumsList extends Component {
  render() {
    const { albums, searchArtist } = this.props;

    if (albums.length === 0) {
      return <h1 className="error-message">Nenhum álbum foi encontrado</h1>;
    }

    return (
      <section className="album-list">
        <section>
          <h1>
            Resultado de álbuns de:
            { ' ' }
            { searchArtist }
          </h1>
        </section>
        <section className="album-list-container">
          {albums
            .map(({ artistName, collectionName, collectionId, artworkUrl100 }, index) => (
              <AlbumCard
                key={ index }
                collectionId={ collectionId }
                artistName={ artistName }
                collectionName={ collectionName }
                artworkUrl100={ artworkUrl100 }
              />
            ))}
        </section>
      </section>
    );
  }
}

AlbumsList.propTypes = {
  albums: PropTypes.instanceOf(Array).isRequired,
  searchArtist: PropTypes.string.isRequired,
};

export default AlbumsList;
