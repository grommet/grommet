// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Button from './Button';
import ViewIcon from './icons/base/View';
import Intl from '../utils/Intl';

const CLASS_ROOT = CSSClassnames.PASSWORD_INPUT;
const INPUT = CSSClassnames.INPUT;

export default class PasswordInput extends Component {
  constructor() {
    super();

    this.state = {
      showPassword: false
    };
  }

  render () {
    const { className, ...rest } = this.props;
    const { showPassword } = this.state;
    const { intl } = this.context;
    let classes = classnames(
      CLASS_ROOT,
      className
    );

    return (
      <div className={classes}>
        <input {...rest} ref={ref => this.inputRef = ref}
          type={showPassword ? 'text' : 'password'}
          className={`${INPUT} ${CLASS_ROOT}__input`} />
        <Button className={`${CLASS_ROOT}__control`}
          a11yTitle={Intl.getMessage(intl, 'Show Password')}
          icon={
            <ViewIcon colorIndex={showPassword ? 'brand' : undefined} />
          }
          onClick={() => this.setState({
            showPassword: !this.state.showPassword })
          } />
      </div>
    );
  }

}

PasswordInput.propTypes = {
  className: PropTypes.string
};

PasswordInput.contextTypes = {
  intl: PropTypes.object
};
