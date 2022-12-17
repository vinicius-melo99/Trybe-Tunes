import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Load from './Load';
import MusicCard from './MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.updateFavorite = this.updateFavorite.bind(this);
    this.state = {
      isLoading: false,
      favoriteSongs: undefined,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  }

  async updateFavorite() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    if (isLoading) return <Load />;

    return (
      <div data-testid="page-favorites" className="flex-page">
        <Header />
        <div className="main-content">
          <header>
            <h1 className="favorite-title">Sons Favoritos ⭐</h1>
          </header>
          <section className="render-albums-input">
            {favoriteSongs ? favoriteSongs
              .map(({ previewUrl, trackName, trackId }, index) => (<MusicCard
                key={ index - 1 }
                previewUrl={ previewUrl }
                trackName={ trackName }
                trackId={ trackId }
                musicList={ favoriteSongs }
                updateFavorite={ this.updateFavorite }
                checked
              />))
              : ''}
          </section>
        </div>
      </div>
    );
  }
}

export default Favorites;
