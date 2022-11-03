import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      getLogin: {},
    };
  }

  async componentDidMount() {
    const response = await getUser();
    this.setState({
      getLogin: response,
      loading: false,
    });
  }

  render() {
    const { getLogin, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          Welcome,
          { getLogin.name }
        </h2>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
