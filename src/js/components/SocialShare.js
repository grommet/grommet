// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Anchor from './Anchor';
import SocialTwitterIcon from './icons/base/SocialTwitter';
import SocialFacebookIcon from './icons/base/SocialFacebook';
import SocialGoogleIcon from './icons/base/SocialGoogle';
import SocialLinkedinIcon from './icons/base/SocialLinkedin';
import SocialEmailIcon from './icons/base/SocialEmail';

export default class SocialShare extends Component {
  render () {
    const { colorIndex, type, link, text, title, a11yTitle } = this.props;

    let socialIcon = undefined;
    let href = '';
    let target = '_blank';
    const calculatedA11yTitle = a11yTitle ||
      `Share on ${type.charAt(0).toUpperCase() + type.slice(1)}`;

    const encodedLink = encodeURIComponent(link);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);

    if (type === 'twitter') {
      socialIcon = (<SocialTwitterIcon a11yTitle={calculatedA11yTitle}
        colorIndex={colorIndex} />);
      href = `https://twitter.com/intent/tweet?url=` +
        `${encodedLink}&text=${encodedText}`;
    } else if (type === 'linkedin') {
      socialIcon = (<SocialLinkedinIcon a11yTitle={calculatedA11yTitle}
        colorIndex={colorIndex} />);
      href = `https://www.linkedin.com/shareArticle?mini=true&url=` +
        `${encodedLink}&title=${encodedTitle}&summary=${encodedText}`;
    } else if (type === 'google') {
      socialIcon = (<SocialGoogleIcon a11yTitle={calculatedA11yTitle}
        colorIndex={colorIndex} />);
      href = `https://plus.google.com/share?url=${encodedLink}`;
    } else if (type === 'facebook') {
      socialIcon = (<SocialFacebookIcon a11yTitle={calculatedA11yTitle}
        colorIndex={colorIndex} />);
      href = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
    } else if (type === 'email') {
      socialIcon = (<SocialEmailIcon a11yTitle={calculatedA11yTitle}
        colorIndex={colorIndex} />);
      href = `mailto:?subject=` +
        `${encodedTitle}&body=${encodedText}%0D%0A${encodedLink}`;
      target = '_self';
    }

    return (
      <Anchor href={href} icon={socialIcon} target={target} />
    );
  }
};

SocialShare.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['email', 'facebook', 'twitter', 'linkedin',
    'google']).isRequired
};

SocialShare.defaultProps = {
  title: '',
  text: ''
};
