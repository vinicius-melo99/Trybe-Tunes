import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileImage from '../imgs/profile-user.png';

class HasUser extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <span className="user-name-label">
          <img src={ profileImage } alt="imagem do perfil" />
          <span>{ user }</span>
        </span>
      </div>
    );
  }
}

HasUser.propTypes = {
  user: PropTypes.string.isRequired,
};

export default HasUser;
