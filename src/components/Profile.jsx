import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
// import Load from './Load';
import profileImg from '../imgs/user.png';
import ProfileImage from './ProfileImage';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      userInfo,
    });
  }

  render() {
    const { userInfo } = this.state;
    const { description, email, image, name: userName } = userInfo;
    // if (isLoading) return <Load />;

    return (
      <div data-testid="page-profile" className="flex-page">
        <Header />
        <div className="main-content">
          <header>
            <h1 className="header-title">Meu Perfil</h1>
          </header>
          <section className="render-albums-input align-center">
            <section className="info-wrap flex-page position-adjustment">
              {!image ? <ProfileImage imgUrl={ profileImg } />
                : <ProfileImage imgUrl={ image } /> }
              <Link
                to="/profile/edit"
                className="perfil-edit-link"
              >
                Editar perfil
              </Link>
            </section>
            <section className="info-wrap text-align-left">
              <h3 className="info-title">Nome</h3>
              <p>{userName}</p>
            </section>
            <section className="info-wrap text-align-left">
              <h3 className="info-title">Email</h3>
              <p>{email}</p>
            </section>
            <section className="info-wrap text-align-left">
              <h3 className="info-title">Descrição</h3>
              <p className="description-text">{description}</p>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
