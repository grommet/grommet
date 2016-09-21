// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Anchor from './Anchor';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.BRICK;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;
const TYPE_SMALL = 'small';
const TYPE_LARGE = 'large';
const TYPE_WIDE = 'wide';
const TYPE_TALL = 'tall';

export default class Brick extends Component {
  render () {
    console.warn(
      'Brick: component has been deprecated. Use Box instead.'
    );
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

    let clickable = this.props.href || this.props.onClick;

    let classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}--${widthUnit}-${heightUnit}`,
      {
        [`${BACKGROUND_COLOR_INDEX}-${this.props.colorIndex}`]:
          this.props.colorIndex,
        [`${CLASS_ROOT}--clickable`]: clickable
      },
      this.props.className
    );

    let label = (
      <div className={`${CLASS_ROOT}__label`}>
        <span>{this.props.label}</span>
      </div>
    );

    let style = {};
    if (this.props.texture && 'string' === typeof this.props.texture) {
      style.background =
        "url(" + this.props.texture + ") no-repeat center center";
      style.backgroundSize = "cover";
    } else if (this.props.backgroundImage) {
      style.background =
        "url(" + this.props.backgroundImage + ") no-repeat center center";
      style.backgroundSize = "cover";
    }
    let texture;
    if ('object' === typeof this.props.texture) {
      texture = (
        <div className={CLASS_ROOT + "__texture"}>{this.props.texture}</div>
      );
    }

    let brickContent = (
      <div>
        <div className={`${CLASS_ROOT}__container`}>
          {texture}
          {this.props.children}
        </div>
        {label}
      </div>
    );

    if (clickable) {
      return (
        <Anchor href={this.props.href} onClick={this.props.onClick}
          className={classes}>
          <div className={`${CLASS_ROOT}__background`} style={style}>
            {brickContent}
          </div>
        </Anchor>
      );
    } else {
      return (
        <div className={classes} style={style}>
          {brickContent}
        </div>
      );
    }
  }
};

Brick.propTypes = { // remove in 1.0, use Box
  colorIndex: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  texture: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  type: PropTypes.oneOf([TYPE_SMALL, TYPE_LARGE, TYPE_WIDE, TYPE_TALL])
};

Brick.defaultProps = {
  type: TYPE_SMALL
};
