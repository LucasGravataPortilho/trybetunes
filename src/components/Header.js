import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
