import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProfileImage extends Component {
  render() {
    const { imgUrl } = this.props;
    return (
      <img
        src={ imgUrl }
        data-testid="profile-image"
        className="profile-img"
        alt="imagem de perfil"
      />
    );
  }
}

ProfileImage.propTypes = {
  imgUrl: PropTypes.string,
};

ProfileImage.defaultProps = {
  imgUrl: '',
};

export default ProfileImage;
