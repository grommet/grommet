// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Intl from '../../utils/Intl';
import Button from '../Button';
import PlayIcon from '../icons/base/Play';
import PauseIcon from '../icons/base/Pause';
import RefreshIcon from '../icons/base/Refresh';

export default class FullscreenButton extends Component {

  render () {
    const { className, ended, iconSize, playing, togglePlay } = this.props;

    let controlIconSize = iconSize;
    let controlIcon = (playing ?
      <PauseIcon size={controlIconSize} /> : (ended ?
        <RefreshIcon size={controlIconSize} /> :
          <PlayIcon size={controlIconSize} />));
    let a11yControlButtonMessage = (playing ?
      'Pause Video' : (ended ?
        'Restart Video' :
          'Play Video'));

    let a11yControlButtonTitle =
      Intl.getMessage(this.context.intl, a11yControlButtonMessage);

    return (
      <Button className={className} plain={true}
        primary={true} onClick={togglePlay}
        icon={controlIcon} a11yTitle={a11yControlButtonTitle} />
    );
  }
}

FullscreenButton.propTypes = {
  iconSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  playing: PropTypes.bool,
  ended: PropTypes.bool,
  togglePlay: PropTypes.func
};

FullscreenButton.defaultProps = {
  iconSize: 'medium'
};
