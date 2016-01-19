// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Anchor from './Anchor';

const CLASS_ROOT = "brick";

export default class Brick extends Component {
  render() {
    let classes = [CLASS_ROOT];
    classes.push(`${CLASS_ROOT}--${this.props.width}-${this.props.height}`);

    if (this.props.colorIndex) {
      classes.push(`background-color-index-${this.props.colorIndex}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let label = (
      <div className={`${CLASS_ROOT}--label`}>
        <span>{this.props.label}</span>
      </div>
    );

    if (this.props.href) {
      label = (
        <Anchor href={this.props.href} className={`${CLASS_ROOT}--label`}>
          <span>{this.props.label}</span>
        </Anchor>
      );
    }

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        <div className={`${CLASS_ROOT}--content-wrapper`}>
          {this.props.children}
        </div>
        {label}
      </div>
    );
  }
}

Brick.propTypes = {
  label: React.PropTypes.string,
  href: React.PropTypes.string,
  width: React.PropTypes.oneOf([1, 2]),
  height: React.PropTypes.oneOf([1, 2]),
  colorIndex: React.PropTypes.string
};

Brick.defaultProps = {
  width: 1,
  height: 1
};
