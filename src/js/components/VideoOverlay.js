// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Intl from '../utils/Intl';
import Responsive from '../utils/Responsive';
import Button from './Button';
import Box from './Box';
import PlayIcon from './icons/base/Play';
import PauseIcon from './icons/base/Pause';
import RefreshIcon from './icons/base/Refresh';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class VideoOverlay extends Component {

  constructor () {
    super();

    this._onResponsive = this._onResponsive.bind(this);
    this.state = { iconSize: 'large' };
  }

  componentDidMount () {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount () {
    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _onResponsive (small) {
    if (small) {
      this.setState({ iconSize: 'small' });
    } else {
      let iconSize = (('small' === this.props.size) ? null : 'large');
      this.setState({ iconSize: iconSize });
    }
  }

  render() {
    const { playing, ended } = this.props;

    let controlIconSize = this.state.iconSize;
    let controlIcon = (playing ?
      <PauseIcon size={controlIconSize} /> : (ended ?
        <RefreshIcon size={controlIconSize} /> :
          <PlayIcon size={controlIconSize} />));
    let a11yControlButtonMessage = (playing ?
      'Pause Video' : (ended ?
        'Restart Video' :
          'Play Video'));
    let a11yControlButtonTitle = Intl.getMessage(this.context.intl, a11yControlButtonMessage);

    let videoOverlayJustify = 'between';
    if (!this.props.videoHeader) {
      videoOverlayJustify = 'center';
    }


    // when iconSize is small (mobile screen sizes), remove the extra padding
    // so that the play control is centered
    let emptyBox = this.state.iconSize === 'small' ? null : <Box />;

    let overlayContent = (
      <Box pad="none" align="center" justify={videoOverlayJustify} className={`${CLASS_ROOT}__overlay`}>
        <Box pad="medium" align="center" justify="center">
          <Button plain={true}
            primary={true} onClick={this.props.togglePlay}
            icon={controlIcon} a11yTitle={a11yControlButtonTitle} />
        </Box>
        {emptyBox}
      </Box>
    );

    return overlayContent;
  }
}
