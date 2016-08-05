// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Paragraph from './Paragraph';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.QUOTE;
const BORDER_COLOR_INDEX = CSSClassnames.BORDER_COLOR_INDEX;

export default class Quote extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${BORDER_COLOR_INDEX}-${this.props.borderColorIndex}`]:
          this.props.borderColorIndex,
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--emphasize-credit`]: this.props.emphasizeCredit
      }
    );

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} className={classes}>
        <div>
          {this.props.children}
          <Paragraph className={`${CLASS_ROOT}__credit`}>
            {this.props.credit}
          </Paragraph>
        </div>
      </Box>
    );
  }
};

Quote.propTypes = {
  borderColorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  credit: PropTypes.string,
  emphasizeCredit: PropTypes.bool,
  ...Box.propTypes
};

Quote.defaultProps = {
  pad: {horizontal: 'large', vertical: 'small'},
  size: 'large',
  emphasizeCredit: true
};
