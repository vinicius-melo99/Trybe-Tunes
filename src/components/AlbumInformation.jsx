import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AlbumInformation extends Component {
  render() {
    const {
      artistName,
      collectionName,
    } = this.props;
    return (
      <section className="album-information">
        <section className="album-info-name">
          <h3 data-testid="artist-name">{artistName}</h3>
          <h4 data-testid="album-name">{collectionName}</h4>
        </section>
      </section>
    );
  }
}

AlbumInformation.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumInformation;
