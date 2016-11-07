// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Intl from '../../utils/Intl';
import CSSClassnames from '../../utils/CSSClassnames';
import Button from '../Button';
import CirclePlay from '../icons/base/CirclePlay';
import Play from '../icons/base/Play';
import PauseIcon from '../icons/base/Pause';
import RefreshIcon from '../icons/base/Refresh';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BUTTON_CLASS = `${CLASS_ROOT}__button`;

export default class PlayButton extends Component {

  render () {
    const {
      ended, iconSize, playing, primary, togglePlay
    } = this.props;
    const { intl } = this.context;

    const PlayIcon = primary ? CirclePlay : Play;
    const Icon = (playing ? PauseIcon : (ended ? RefreshIcon : PlayIcon));
    const controlIcon = (
      <Icon className={`${BUTTON_CLASS}__icon`} size={iconSize}
        colorIndex='brand' />
    );

    const a11yControlButtonMessage = (playing ?
      'Pause Video' : (ended ? 'Restart Video' :'Play Video')
    );

    const a11yControlButtonTitle =
      Intl.getMessage(intl, a11yControlButtonMessage);

    return (
      <Button plain={true} className={BUTTON_CLASS} onClick={togglePlay}
        a11yTitle={a11yControlButtonTitle}>
        {controlIcon}
      </Button>
    );
  }
}

PlayButton.propTypes = {
  iconSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  playing: PropTypes.bool,
  primary: PropTypes.bool,
  ended: PropTypes.bool,
  togglePlay: PropTypes.func
};

PlayButton.defaultProps = {
  iconSize: 'xlarge',
  primary: true
};
