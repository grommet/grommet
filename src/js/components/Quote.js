// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Paragraph from './Paragraph';
import Props from '../utils/Props';

const CLASS_ROOT = 'quote';

export default class Quote extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`border-color-index-${this.props.borderColorIndex}`]: this.props.borderColorIndex,
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--emphasize-quote`]: this.props.emphasizeQuote,
        [`${CLASS_ROOT}--emphasize-credit`]: this.props.emphasizeCredit
      }
    );

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} className={classes}>
        {this.props.quote.map((quote, index) =>
          <Paragraph key={`quote-body-${index}`} size="large" className={`${CLASS_ROOT}__body`}>{quote}</Paragraph>
        )}
        <Paragraph margin="none" className={`${CLASS_ROOT}__credit`}>{this.props.quoteCredit}</Paragraph>
      </Box>
    );
  }
};

Quote.propTypes = {
  borderColorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  quote: PropTypes.array.isRequired,
  quoteCredit: PropTypes.string,
  emphasizeQuote: PropTypes.bool,
  emphasizeCredit: PropTypes.bool,
  ...Box.propTypes
};

Quote.defaultProps = {
  pad: 'large',
  size: 'large',
  emphasizeQuote: false,
  emphasizeCredit: true
};
