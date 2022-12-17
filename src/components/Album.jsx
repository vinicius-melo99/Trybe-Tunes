import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import AlbumInformation from './AlbumInformation';
import Load from './Load';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      favoriteSongsName: [],
      isLoading: false,
      artistName: '',
      collectionName: '',
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    const { artistName, collectionName } = musicList[0];
    const songList = await getFavoriteSongs();
    const favoriteSongsName = songList.map(({ trackName }) => trackName);
    this.setState({
      isLoading: false,
      favoriteSongsName,
      musicList,
      artistName,
      collectionName,
    });
  }

  render() {
    const {
      musicList,
      artistName,
      collectionName,
      isLoading,
      favoriteSongsName } = this.state;
    if (isLoading) return <Load />;
    return (
      <div data-testid="page-album" className="flex-page">
        <Header />
        <div className="main-content">
          <header>
            <AlbumInformation
              collectionName={ collectionName }
              artistName={ artistName }
            />
          </header>
          <section className="render-albums-input">
            {musicList
              .map(({ previewUrl, trackName, trackId }) => (previewUrl ? <MusicCard
                key={ trackId }
                previewUrl={ previewUrl }
                trackName={ trackName }
                trackId={ trackId }
                musicList={ musicList }
                addFavoriteSong={ this.addFavoriteSong }
                checked={ !!favoriteSongsName.includes(trackName) }
              />
                : ''))}

          </section>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object),
  params: PropTypes.instanceOf(Object),
  id: PropTypes.string,
};

Album.defaultProps = {
  match: {},
  params: {},
  id: '',
};
export default Album;
