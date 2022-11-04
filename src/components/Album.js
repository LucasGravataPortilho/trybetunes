import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.getFavorites = this.getFavorites.bind(this);
    this.handleGetFavoritesSongs = this.handleGetFavoritesSongs.bind(this);

    this.state = {
      songs: [],
      albumTitle: '',
      loading: false,
      checkedSongs: {},
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const [infosAlbum, ...musicas] = await getMusics(id);

    this.setState({
      songs: musicas,
      albumTitle: infosAlbum,
    }, this.handleGetFavoritesSongs);
  }

  async handleGetFavoritesSongs() {
    const { songs } = this.state;
    const time = 1000;
    const favoriteSongs = await getFavoriteSongs();

    const filteredAlbum = favoriteSongs
      .filter(({ collectionId }) => collectionId === songs[0].collectionId);

    if (filteredAlbum.length > 0) {
      this.setState({
        loading: true,
      });

      setTimeout(() => {
        const filteredList = filteredAlbum.filter(({ trackId }) => trackId === songs
          .find((song) => song.trackId === trackId).trackId);

        filteredList.forEach((song) => {
          this.setState((prevState) => ({
            checkedSongs: { ...prevState.checkedSongs, [song.trackId]: true },
          }));
        });

        this.setState({
          loading: false,
        });
      }, time);
    }
  }

  getFavorites({ target }) {
    const { songs } = this.state;
    const { name, checked, id } = target;
    const time = 1000;

    this.setState((prevState) => ({
      checkedSongs: { ...prevState.checkedSongs, [name]: checked },
    }));

    if (checked) {
      this.setState({
        loading: true,
      });
      setTimeout(async () => {
        const getSong = songs.find(({ trackId }) => id === trackId);
        addSong(getSong);
        const musicasFavoritas = await getFavoriteSongs();
        this.setState({
          loading: false,
          favorites: musicasFavoritas,
        });
      }, time);
    } else {
      this.setState({
        loading: true,
      });
      setTimeout(async () => {
        const getSong = songs.find(({ trackId }) => id === trackId);
        removeSong(getSong);
        const musicasFavoritas = await getFavoriteSongs();
        this.setState({
          loading: false,
          favorites: musicasFavoritas,
        });
      }, time);
    }
  }

  render() {
    const { songs, albumTitle, loading, checkedSongs, favorites } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{albumTitle.artistName}</p>
        <p data-testid="album-name">{albumTitle.collectionName}</p>
        { loading ? <Loading /> : songs.map((song, index) => (<MusicCard
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Album;
