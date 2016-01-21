// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Anchor from './Anchor';

const CLASS_ROOT = 'brick';
const TYPE_SMALL = 'small';
const TYPE_LARGE = 'large';
const TYPE_WIDE = 'wide';
const TYPE_TALL = 'tall';

export default class Brick extends Component {
  render() {
    let widthUnit = 1;
    let heightUnit = 1;
    switch (this.props.type) {
      case TYPE_LARGE:
        widthUnit = 2;
        heightUnit = 2;
        break;
      case TYPE_WIDE:
        widthUnit = 2;
        heightUnit = 1;
        break;
      case TYPE_TALL:
        widthUnit = 1;
        heightUnit = 2;
        break;
    }

    let classes = [CLASS_ROOT];
    classes.push(`${CLASS_ROOT}--${widthUnit}-${heightUnit}`);

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
  type: React.PropTypes.oneOf([TYPE_SMALL, TYPE_LARGE, TYPE_WIDE, TYPE_TALL]),
  colorIndex: React.PropTypes.string
};

Brick.defaultProps = {
  type: TYPE_SMALL
};
