// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Anchor from './Anchor';
import SocialTwitterIcon from './icons/base/SocialTwitter';
import SocialFacebookIcon from './icons/base/SocialFacebook';
import SocialGoogleIcon from 'grommet/components/icons/base/SocialGoogle';
import SocialLinkedinIcon from 'grommet/components/icons/base/SocialLinkedin';

export default class SocialShare extends Component {
  render () {
    const { type, link, text, title } = this.props;

    let socialIcon = undefined;
    let href = '';

    const encodedLink = encodeURIComponent(link);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);

    if (type === 'twitter') {
      socialIcon = <SocialTwitterIcon />;
      href = `https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedText}`;
    } else if (type === 'linkedin') {
      socialIcon = <SocialLinkedinIcon />;
      href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedLink}&title=${encodedTitle}&summary=${encodedText}`;
    } else if (type === 'google') {
      socialIcon = <SocialGoogleIcon />;
      href = `https://plus.google.com/share?url=${encodedLink}`;
    } else {
      socialIcon = <SocialFacebookIcon />;
      href = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
    }

    return (
      <Anchor href={href} icon={socialIcon} target="_blank" />
    );
  }
};

SocialShare.propTypes = {
  type: PropTypes.oneOf(['facebook', 'twitter', 'linkedin', 'google']).isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string
};

SocialShare.defaultProps = {
  title: '',
  text: ''
};
