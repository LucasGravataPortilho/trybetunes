import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.handleCheckedSongs = this.handleCheckedSongs.bind(this);
    this.getFavorites = this.getFavorites.bind(this);

    this.state = {
      loading: false,
      favorites: [],
      checkedSongs: [],
    };
  }

  async componentDidMount() {
    const favoritas = await getFavoriteSongs();
    this.setState({
      favorites: favoritas,
    }, this.handleCheckedSongs);
  }

  handleCheckedSongs() {
    const { favorites } = this.state;

    if (favorites.length > 0) {
      favorites.forEach((song) => {
        this.setState((prevState) => ({
          checkedSongs: { ...prevState.checkedSongs, [song.trackId]: true },
        }));
      });
    }
  }

  getFavorites({ target }) {
    const { favorites } = this.state;
    const { checked, id } = target;
    const time = 1000;

    if (checked === false) {
      this.setState({
        loading: true,
      });

      setTimeout(async () => {
        const getSong = favorites.find(({ trackId }) => Number(id) === Number(trackId));
        removeSong(getSong);
        const musicasFavoritas = await getFavoriteSongs();
        this.setState({
          favorites: musicasFavoritas,
          loading: false,
        });
      }, time);
    }
  }

  render() {
    const { loading, favorites, checkedSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorite Songs</h1>
        { loading ? <Loading /> : favorites.map((song, index) => (<MusicCard
          key={ song.trackId + index }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
          trackId={ song.trackId }
          getFavorites={ this.getFavorites }
          checkedSongs={ checkedSongs[song.trackId] }
        />))}
      </div>
    );
  }
}

export default Favorites;
