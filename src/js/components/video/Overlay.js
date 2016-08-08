// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Intl from '../../utils/Intl';
import Responsive from '../../utils/Responsive';
import Button from '../Button';
import Box from '../Box';
import Heading from '../Heading';
import PlayIcon from '../icons/base/Play';
import PauseIcon from '../icons/base/Pause';
import RefreshIcon from '../icons/base/Refresh';
import CSSClassnames from '../../utils/CSSClassnames';
import VideoShare from './Share';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Overlay extends Component {

  constructor () {
    super();

    this._onResponsive = this._onResponsive.bind(this);
    this.state = { iconSize: 'large' };
  }

  _onResponsive (small) {
    if (small) {
      this.setState({ iconSize: 'small' });
    } else {
      let iconSize = (('small' === this.props.size) ? null : 'large');
      this.setState({ iconSize: iconSize });
    }
  }

  _renderReplayMenu() {
    const { ended, shareLink, shareHeadline, shareText } = this.props;

    let replayContent;
    if (ended) {
      replayContent = (
        <Box className={`${CLASS_ROOT}__replay`} align="center">
          <Heading tag="h3" strong={true} uppercase={true}>Replay</Heading>
          <VideoShare shareLink={shareLink}
            shareHeadline={shareHeadline} shareText={shareText} />
        </Box>
      );
    }

    return replayContent;
  }

  _renderPlayButton() {
    const { playing, ended, togglePlay } = this.props;

    let controlIconSize = this.state.iconSize;
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
      <Box pad="none" align="center" justify="center">
        <Button className={`${CLASS_ROOT}__play`} plain={true}
          primary={true} onClick={togglePlay}
          icon={controlIcon} a11yTitle={a11yControlButtonTitle} />
      </Box>
    );
  }

  render() {
    // when iconSize is small (mobile screen sizes), remove the extra padding
    // so that the play control is centered
    let emptyBox = this.state.iconSize === 'small' ? null : <Box />;

    return (
      <Box pad="none" align="center" justify="center"
        className={`${CLASS_ROOT}__overlay`}>
        {this._renderPlayButton()}
        {this._renderReplayMenu()}
        {emptyBox}
      </Box>
    );
  }
}
