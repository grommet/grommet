// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Anchor from './Anchor';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TAG;

export default class Tag extends Component {

  constructor () {
    super();
    console.warn(
      'Tag: component has been deprecated. Use Button instead.'
    );
  }

  render () {
    let classes = [CLASS_ROOT];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    var other = Props.pick(this.props, Object.keys(Anchor.propTypes));

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
        <Anchor {...other} className={`${CLASS_ROOT}--label`}>
          <span>{this.props.label}</span>
        </Anchor>
      </div>
    );
  }
}

Tag.propTypes = {
  label: React.PropTypes.string,
  ...Anchor.propTypes
};
