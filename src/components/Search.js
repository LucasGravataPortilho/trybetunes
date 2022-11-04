import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.searchReturn = this.searchReturn.bind(this);

    this.state = {
      search: '',
      isDisabled: true,
      loading: false,
      albums: [],
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.disabledButton());
  }

  async onSubmitChange(event) {
    event.preventDefault();
    const { search } = this.state;

    this.setState({
      loading: true,
    });
    const retorno = await searchAlbumsAPI(search);

    this.setState({
      loading: false,
      albums: retorno,
    });
  }

  searchReturn() {
    const { albums, search } = this.state;
    if (albums.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    if (albums.length > 0) {
      return (
        <h2>
          {`Resultado de álbuns de: ${search}`}
        </h2>
      );
    }
  }

  disabledButton() {
    const { search } = this.state;
    const dois = 2;
    if (search.length >= dois) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { search, isDisabled, loading, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              id="search"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="search"
              value={ search }
              onChange={ this.onInputChange }
            />
          </label>
        </form>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisabled }
          onClick={ this.onSubmitChange }
        >
          Pesquisar
        </button>
        <div>
          { this.searchReturn() }
          { loading
            ? <Loading />
            : albums.map((album) => (
              <div key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt={ album.title } />
                <h3>{ album.artistName }</h3>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  Link para o álbum
                </Link>
                <h3>{ album.collectionName }</h3>
              </div>
            )) }
        </div>
      </div>
    );
  }
}

export default Search;
