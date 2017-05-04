// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box';
import Paragraph from './Paragraph';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.QUOTE;
const BORDER_COLOR_INDEX = CSSClassnames.BORDER_COLOR_INDEX;

export default class Quote extends Component {
  render () {
    const {
      borderColorIndex, children, className, credit, emphasizeCredit,
      ...props
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${BORDER_COLOR_INDEX}-${borderColorIndex}`]: borderColorIndex,
        [`${CLASS_ROOT}--small`]: 'small' === props.size,
        [`${CLASS_ROOT}--emphasize-credit`]: emphasizeCredit
      },
      className
    );

    if (props.size === 'small') {
      props.pad = { horizontal: 'medium', vertical: 'small' };
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
      <Box {...props} className={classes}>
        <div>
          {children}
          {creditElement}
        </div>
      </Box>
    );
  }
}

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
