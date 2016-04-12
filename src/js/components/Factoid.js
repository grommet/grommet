// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Paragraph from './Paragraph';

const CLASS_ROOT = 'factoid';

export default class Factoid extends Component {
  render() {
    let classes = [CLASS_ROOT];
    let IconBefore = undefined;
    let IconAfter = undefined;

    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.iconBefore) {
      const Icon = require('grommet/components/icons/base/' + this.props.iconBefore);
      IconBefore = <Icon />;
    }
    if (this.props.iconAfter) {
      const Icon = require('grommet/components/icons/base/' + this.props.iconAfter);
      IconAfter = <Icon />;
    }

    return (
      <div className={classes.join(' ')}>
        <div className={`${CLASS_ROOT}--main`}>{IconBefore}{this.props.text}{IconAfter}</div>
        <Paragraph size={this.props.size}>{this.props.caption}</Paragraph>
      </div>
    );
  }
}

Factoid.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,
  text: PropTypes.string,
  caption: PropTypes.string
};

Factoid.defaultProps = {
  size: 'medium'
};
