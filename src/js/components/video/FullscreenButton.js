// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

import Intl from '../../utils/Intl';
import Button from '../Button';
import ExpandIcon from '../icons/base/Expand';

export default class FullscreenButton extends Component {

  // prevents unnecessarily updates/re-renders
  // only update component if the onClick prop changes
  shouldComponentUpdate (nextProps) {
    return this.props.onClick !== nextProps.onClick;
  }

  render () {
    let a11yExpandButtonTitle =
      Intl.getMessage(this.context.intl, 'Toggle Fullscreen');

    return (
      <Button plain={true} primary={true}
        onClick={this.props.onClick} icon={<ExpandIcon />}
        a11yTitle={a11yExpandButtonTitle} />
    );
  }
}

FullscreenButton.propTypes = {
  onClick: PropTypes.func
};
