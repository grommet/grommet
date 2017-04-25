// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TITLE;

export default class Title extends Component {

  render () {
    const {
      a11yTitle, children, className, responsive, truncate, ...props
    } = this.props;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${CLASS_ROOT}--truncate`]: truncate,
        [`${CLASS_ROOT}--interactive`]: props.onClick
      },
      className
    );

    const boxTitle = a11yTitle || Intl.getMessage(intl, 'Title');

    let content;
    if( typeof children === 'string' ) {
      content = (
        <span>{children}</span>
      );
    } else if (Array.isArray(children)) {
      content = children.map((child, index) => {
        if (child && typeof child === 'string') {
          return <span key={index}>{child}</span>;
        }
        return child;
      });
    } else {
      content = children;
    }

    return (
      <Box {...props} align="center" direction="row" responsive={false}
        className={classes} a11yTitle={boxTitle}>
        {content}
      </Box>
    );
  }

}

Title.propTypes = {
  a11yTitle: PropTypes.string,
  onClick: PropTypes.func,
  responsive: PropTypes.bool,
  truncate: PropTypes.bool
};

Title.contextTypes = {
  intl: PropTypes.object
};

Title.defaultProps = {
  responsive: true,
  truncate: true
};
