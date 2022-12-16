import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    console.log(trackName);
    return (
      <div className="music-list-container">
        <p className="track-name">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
};

MusicCard.defaultProps = {
  previewUrl: '',
  trackName: '',
};

export default MusicCard;
