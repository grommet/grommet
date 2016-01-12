// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Anchor from './Anchor';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';

const CLASS_ROOT = "tag";

export default class Tag extends Component {

  render () {
    var classes = [CLASS_ROOT];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    var other = pick(this.props, keys(Anchor.propTypes));

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
        <Anchor {...other} className="tag--label">
          <span>{this.props.label}</span>
        </Anchor>
      </div>
    );
  }
}

Tag.propTypes = {
  label: React.PropTypes.string,
  route: React.PropTypes.string,
  ...Anchor.propTypes
};
