// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
    const {
      borderColorIndex, children, className, credit, emphasizeCredit, size
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${BORDER_COLOR_INDEX}-${borderColorIndex}`]:
          borderColorIndex,
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--emphasize-credit`]: emphasizeCredit
      }
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    if (size === 'small') {
      boxProps.pad = {
        horizontal: 'medium', vertical: 'small'
      };
    }

    let creditElement;
    if (typeof credit === 'string') {
      let content = credit;
      if (emphasizeCredit) {
        content = <strong>{content}</strong>;
      }
      creditElement = (
        <Paragraph className={`${CLASS_ROOT}__credit`}>
          {content}
        </Paragraph>
      );
    } else {
      creditElement = credit;
    }

    return (
      <Box {...boxProps} className={classes}>
        <div>
          {children}
          {creditElement}
        </div>
      </Box>
    );
  }
};

Quote.propTypes = {
  borderColorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  credit: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  emphasizeCredit: PropTypes.bool,
  ...Box.propTypes
};

Quote.defaultProps = {
  pad: { horizontal: 'large', vertical: 'small' },
  size: 'large',
  emphasizeCredit: true
};
