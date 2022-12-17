import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.handleFavoriteSong = this.handleFavoriteSong.bind(this);
    this.state = {
      musicList: [],
      isLoading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { musicList, checked } = this.props;
    this.setState({
      musicList,
      checked,
    });
  }

  async handleFavoriteSong({ target: { name, checked } }) {
    const { musicList } = this.state;
    console.log(checked);
    this.setState({ isLoading: true });
    if (checked) {
      this.setState({ checked: true });
      const musicToFavorite = musicList.find(({ trackName }) => (
        trackName === name
      ));
      await addSong(musicToFavorite);
    } else {
      this.setState({ checked: false });
      const musicToRemoveFavorite = musicList.find(({ trackName }) => (
        trackName === name
      ));
      await removeSong(musicToRemoveFavorite);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading, checked } = this.state;

    return (
      <div className="music-list-container">
        <p className="track-name">
          {isLoading ? 'Carregando...' : trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          name={ trackName }
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.handleFavoriteSong }
          checked={ checked }
        />
      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  musicList: PropTypes.instanceOf(Array),
  checked: PropTypes.bool,
};

MusicCard.defaultProps = {
  previewUrl: '',
  trackName: '',
  trackId: '',
  musicList: [],
  checked: false,
};

export default MusicCard;
