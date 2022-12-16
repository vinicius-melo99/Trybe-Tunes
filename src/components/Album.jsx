import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import AlbumInformation from './AlbumInformation';
import Load from './Load';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      isLoading: false,
      artistName: '',
      collectionName: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const musicList = await getMusics(id);
    const { artistName, collectionName } = musicList[0];
    this.setState({
      musicList,
      artistName,
      collectionName,
      isLoading: false,
    });
  }

  render() {
    const { musicList, artistName, collectionName, isLoading } = this.state;
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
              .map(({ previewUrl, trackName, trackId }, index) => (
                previewUrl ? <MusicCard
                  key={ index }
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                  trackId={ trackId }
                  musicList={ musicList }
                />
                  : ''
              ))}

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
