// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Headline from './Headline';
import List from './List';
import Paragraph from './Paragraph';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ACCORDION;

export default class Accordion extends Component {
  render () {
    const { animate, headline, subHeadline, colorIndex, children } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      this.props.className
    );

    let headlineMarkup;
    if (headline) {
      headlineMarkup = (
        <Headline size="large" strong={true} margin="none" align="center">
          {headline}
        </Headline>
      );
    }

    let subHeadlineMarkup;
    if (subHeadline) {
      subHeadlineMarkup = (
        <Paragraph
          className={`${CLASS_ROOT}__sub-headline`}
          size="large"
          align="center"
        >
          {subHeadline}
        </Paragraph>
      );
    }

    let content;
    if (headline || subHeadline) {
      content = (
        <Box align="center">
          {headlineMarkup}
          {subHeadlineMarkup}
        </Box>
      );
    }

    const accordionChildren = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        id: 'accordion-panel-' + index,
        animate
      });
    });

    return (
      <Box className={classes} colorIndex={colorIndex}>
        {content}
        <Box separator="top">
          <List>
            {accordionChildren}
          </List>
        </Box>
      </Box>
    );
  }
};

Accordion.propTypes = {
  animate: PropTypes.bool,
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
  colorIndex: PropTypes.string
};

Accordion.defaultProps = {
  animate: true
};
