// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from '../FormattedMessage';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LOGO_ICON;

export default class Grommet extends Component {
  render () {
    var classes = [CLASS_ROOT];
    if (this.props.small) {
      classes.push(`${CLASS_ROOT}--small`);
    } else if (this.props.large) {
      classes.push(`${CLASS_ROOT}--large`);
    } else if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    let title;
    let a11yTitleId = this.props.a11yTitleId;
    if (this.props.a11yTitle) {
      title = (
        <title id={this.props.a11yTitleId}>
          <FormattedMessage id={this.props.a11yTitle}
            defaultMessage={this.props.a11yTitle} />
        </title>
      );
    } else {
      a11yTitleId = undefined;
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 182 182"
        width="182" height="182"
        version="1.1" role="img" aria-labelledby={a11yTitleId}>
        {title}
        <path role="presentation"
          d="M 91,91 m 0,-82 a 82,82 0 1,1 0,164 a 82,82 0 1,1 0,-164"
          strokeWidth="18" stroke="#865CD6" fill="none" />
      </svg>
    );
  }
}

Grommet.defaultProps = {
  a11yTitle: 'Grommet',
  a11yTitleId: 'grommet-logo-title'
};

Grommet.propTypes = {
  a11yTitle: React.PropTypes.string,
  a11yTitleId: PropTypes.string,
  colorIndex: PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge'])
};
