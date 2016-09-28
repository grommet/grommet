// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TAB;

export default class Tab extends Component {

  constructor() {
    super();

    this._onClickTab = this._onClickTab.bind(this);
    this._startKeyboardListener = this._startKeyboardListener.bind(this);
    this._stopKeybardListener = this._stopKeybardListener.bind(this);
  }

  _startKeyboardListener () {
    this._listeners = {
      space: this._onClickTab,
      enter: this._onClickTab
    };
    KeyboardAccelerators.startListeningToKeyboard(this.tabRef, this._listeners);
  }

  _stopKeybardListener () {
    KeyboardAccelerators.stopListeningToKeyboard(this.tabRef, this._listeners);
  }

  _onClickTab (event) {
    const { onRequestForActive } = this.props;
    if (event) {
      event.preventDefault();
    }
    onRequestForActive();
  }

  render () {
    const { active, id, title } = this.props;

    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--active`]: active
      }
    );

    return (
      <li className={classes} id={id}>
        <a href='#' role='tab' ref={(ref) => this.tabRef = ref}
          onClick={this._onClickTab} aria-expanded={active}
          onFocus={this._startKeyboardListener} aria-selected={active}
          onBlur={this._stopKeybardListener}>
          <label className={`${CLASS_ROOT}__label`} htmlFor={id}>
            {title}
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
