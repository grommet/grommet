// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TAB;

export default class Tab extends Component {

  constructor(props, context) {
    super(props, context);

    this._processSpace = this._processSpace.bind(this);
    this._onClickTab = this._onClickTab.bind(this);
  }

  componentDidMount () {
    KeyboardAccelerators.startListeningToKeyboard(this, {
      space: this._processSpace
    });
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(this, {
      space: this._processSpace
    });
  }

  _processSpace (event) {
    if (event.target === this.tabRef) {
      this._onClickTab(event);
    }
  }

  _onClickTab (event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onRequestForActive();
  }

  render () {
    var classes = [CLASS_ROOT];

    if (this.props.active) {
      classes.push(CLASS_ROOT + "--active");
    }

    return (
      <li className={classes.join(' ')} id={this.props.id}>
        <a ref={(ref) => this.tabRef = ref} role="tab"
          href="#" onClick={this._onClickTab}
          aria-expanded={this.props.active} aria-selected={this.props.active}
          className={CLASS_ROOT + "__link"} aria-labelledby={this.props.id}>
          <label className={CLASS_ROOT + '__label'} htmlFor={this.props.id}>
            {this.props.title}
          </label>
        </a>
      </li>
    );
  }

}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  id: PropTypes.string
};
