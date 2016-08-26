// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Box from '../Box';
import Heading from '../Heading';
import VideoShare from './Share';
import VideoPlayButton from './PlayButton';
import CSSClassnames from '../../utils/CSSClassnames';

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
          <VideoShare shareLink={shareLink} shareHeadline={shareHeadline}
            shareText={shareText} />
        </Box>
      );
    }

    return replayContent;
  }

  render() {
    // when iconSize is small (mobile screen sizes), remove the extra padding
    // so that the play control is centered
    let emptyBox = this.state.iconSize === 'small' ? null : <Box />;

    return (
      <Box pad="none" align="center" justify="center"
        className={`${CLASS_ROOT}__overlay`}>
        <Box pad="none" align="center" justify="center">
          <VideoPlayButton iconSize={this.state.iconSize}
            className={`${CLASS_ROOT}__play`}
            playing={this.props.playing}
            ended={this.props.ended}
            togglePlay={this.props.togglePlay} />
        </Box>
        {this._renderReplayMenu()}
        {emptyBox}
      </Box>
    );
  }
}
