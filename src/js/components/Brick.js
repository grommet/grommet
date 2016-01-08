// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Anchor from './Anchor';

const CLASS_ROOT = "brick";

export default class Brick extends Component {
  render() {
    var classes = [CLASS_ROOT];
    classes.push('brick--' + this.props.width + '-' + this.props.height);

    if (this.props.colorIndex) {
      classes.push('background-color-index-' + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var label = <div className="brick--label"><span>{this.props.label}</span></div>;
    if (this.props.route) {
      label = <Anchor href={this.props.route} className="brick--label"><span>{this.props.label}</span></Anchor>;
    }

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        <div className="brick--content-wrapper">
          {this.props.children}
        </div>
        {label}
      </div>
    );
  }
}

Brick.propTypes = {
  label: React.PropTypes.string,
  route: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  colorIndex: React.PropTypes.string
};

Brick.defaultProps = {
  width: 1,
  height: 1
};
