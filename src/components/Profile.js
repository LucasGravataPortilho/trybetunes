import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    }, () => console.log(user));
  }

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ name }
              />
              <h3>Nome</h3>
              <p>{name}</p>
              <p>{name}</p>
              <h3>Email</h3>
              <p>{email}</p>
              <h3>Descrição do perfil</h3>
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
