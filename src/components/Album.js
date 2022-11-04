import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      albumTitle: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const [infosAlbum, ...musicas] = await getMusics(id);
    // console.log(infosAlbum);
    // console.log(musicas);
    this.setState({
      songs: musicas,
      albumTitle: infosAlbum,
    });
  }

  render() {
    const { songs, albumTitle } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{albumTitle.artistName}</p>
        <p data-testid="album-name">{albumTitle.collectionName}</p>
        { songs.map((song, index) => (<MusicCard
          key={ song.trackId + index }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
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
