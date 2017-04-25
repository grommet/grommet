// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Intl from '../../utils/Intl';
import CSSClassnames from '../../utils/CSSClassnames';
import Button from '../Button';
import ExpandIcon from '../icons/base/Expand';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BUTTON_CLASS = `${CLASS_ROOT}__button`;

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
      <Button plain={true} className={BUTTON_CLASS} onClick={this.props.onClick}
        a11yTitle={a11yExpandButtonTitle}>
          <ExpandIcon className={`${BUTTON_CLASS}__icon`}
            colorIndex='brand' />
      </Button>
    );
  }
}

FullscreenButton.propTypes = {
  onClick: PropTypes.func
};
