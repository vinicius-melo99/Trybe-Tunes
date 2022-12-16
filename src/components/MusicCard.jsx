import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Load from './Load';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.state = {
      musicList: [],
      isLoading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { musicList } = this.props;
    this.setState({
      musicList,
    });
  }

  async addFavoriteSong({ target: { name, checked } }) {
    const { musicList } = this.state;
    this.setState({ isLoading: true });
    if (checked) {
      this.setState({ checked: true });
      const musicToFavorite = musicList.find(({ trackName }) => (
        trackName === name
      ));
      await addSong(musicToFavorite);
      this.setState({ isLoading: false });
    } else {
      this.setState({ checked: false });
    }
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading, checked } = this.state;

    if (isLoading) return <Load />;

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
        <input
          name={ trackName }
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onClick={ this.addFavoriteSong }
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
};

MusicCard.defaultProps = {
  previewUrl: '',
  trackName: '',
  trackId: '',
  musicList: [],
};

export default MusicCard;
