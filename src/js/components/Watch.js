// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from './FormattedMessage';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render () {
    const { a11yTitleId, className, colorIndex } = this.props;
    let { a11yTitle, size } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-watch`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle ||
      <FormattedMessage id="watch" defaultMessage="watch" />;

    return <svg version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-labelledby={a11yTitleId}><title id={a11yTitleId}>{a11yTitle}</title><g><path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M12,22C6.5,22,2,17.5,2,12&#xD;&#xA;    S6.5,2,12,2s10,4.5,10,10S17.5,22,12,22z"/><polygon points="9,16 17,12 9,8"/></g></svg>;
  }
};

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'watch-title'
};

Icon.icon = true;

Icon.displayName = 'Watch';
