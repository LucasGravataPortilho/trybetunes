import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, getFavorites, checkedSongs } = this.props;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            name={ trackId }
            checked={ checkedSongs }
            onChange={ getFavorites }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
