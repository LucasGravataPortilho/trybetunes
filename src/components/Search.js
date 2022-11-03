import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.disabledButton = this.disabledButton.bind(this);

    this.state = {
      search: '',
      isDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.disabledButton());
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
    const { search, isDisabled } = this.state;
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
