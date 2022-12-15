import React, { Component } from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ArtistInput from './ArtistInput';
import Load from './Load';
import AlbumsList from './AlbumsList';

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    this.state = {
      searchArtist: '',
      lastSearched: '',
      isButtonDisabled: true,
      firstRender: true,
      isLoading: false,
      albums: [],
    };
  }

  handleChange({ target: { name, value } }) {
    const minLength = 2;
    this.setState({
      [name]: value,
      isButtonDisabled: value.length < minLength,
    });
  }

  async searchAlbums() {
    const { searchArtist } = this.state;
    this.setState({
      searchArtist: '',
      firstRender: false,
      isLoading: true,
    });
    const albums = await searchAlbumsAPI(searchArtist);
    this.setState({
      isLoading: false,
      albums,
      lastSearched: searchArtist,
    });
  }

  render() {
    const { firstRender, isLoading, albums, lastSearched } = this.state;

    if (isLoading) {
      return <Load />;
    }

    return (
      <div data-testid="page-search" className="flex-page">
        <Header />
        <div className="main-content">
          <header>
            <ArtistInput
              { ...this.state }
              searchAlbums={ this.searchAlbums }
              handleChange={ this.handleChange }
            />
          </header>
          <section className="render-albums-input">
            {firstRender
              ? <span>Pesquise um artista...</span>
              : <AlbumsList albums={ albums } searchArtist={ lastSearched } />}
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
