// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Button from './Button';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TAB;

export default class Tab extends Component {

  constructor() {
    super();

    this._onClickTab = this._onClickTab.bind(this);
  }

  _onClickTab (event) {
    const { onRequestForActive } = this.props;
    if (event) {
      event.preventDefault();
    }
    onRequestForActive();
  }

  render () {
    const { active, className, id, title, ...props } = this.props;
    delete props.onRequestForActive;
    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--active`]: active
      },
      className
    );

    return (
      <li {...props} className={classes} id={id}>
        <Button className={`${CLASS_ROOT}__button`} plain={true}
          role='tab' aria-selected={active}
          onClick={this._onClickTab} aria-expanded={active}>
          <label className={`${CLASS_ROOT}__label`} htmlFor={id}>
            {title}
          </label>
        </Button>
      </li>
    );
  }
}

Tab.propTypes = {
  title: PropTypes.node.isRequired,
  active: PropTypes.bool,
  id: PropTypes.string,
  onRequestForActive: PropTypes.func // from Tabs
};
