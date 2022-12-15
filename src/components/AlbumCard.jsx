import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionId,
      artworkUrl100,
    } = this.props;
    return (
      <div className="album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <section className="card-informations">
          <h3>{collectionName}</h3>
          <h4>{artistName}</h4>
          <Link
            to={ `/album/${collectionId}` }
            className="album-link"
            data-testid={ `link-to-album-${collectionId}` }
          >
            Ouvir Músicas
          </Link>
        </section>

      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;
