// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TITLE;

export default class Title extends Component {

  render () {
    const { a11yTitle, children, className, onClick, responsive } = this.props;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT,
      className, {
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${CLASS_ROOT}--interactive`]: onClick
      }
    );

    const boxTitle = a11yTitle ||
      Intl.getMessage(intl, 'Title');

    let content;
    if( typeof children === 'string' ) {
      content = (
        <span>{children}</span>
      );
    } else if (Array.isArray(children)) {
      content = children.map((child, index) => {
        if (child && typeof child === 'string') {
          return <span key={`title_${index}`}>{child}</span>;
        }
        return child;
      });
    } else {
      content = children;
    }

    return (
      <Box align="center" direction="row" responsive={false}
        className={classes} a11yTitle={boxTitle}
        onClick={onClick}>
        {content}
      </Box>
    );
  }

}

Title.propTypes = {
  a11yTitle: PropTypes.string,
  onClick: PropTypes.func,
  responsive: PropTypes.bool
};

Title.contextTypes = {
  intl: PropTypes.object
};

Title.defaultProps = {
  responsive: true
};
