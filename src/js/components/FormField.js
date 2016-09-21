// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.FORM_FIELD;

export default class FormField extends Component {

  constructor(props, context) {
    super(props, context);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = { focus: false };
  }

  componentDidMount () {
    const contentsElement = this.contentsRef;
    if (contentsElement) {
      const inputElements = (
        contentsElement.querySelectorAll('input, textarea, select')
      );
      if (inputElements.length === 1) {
        this._inputElement = inputElements[0];
        this._inputElement.addEventListener('focus', this._onFocus);
        this._inputElement.addEventListener('blur', this._onBlur);
      }
    }
  }

  componentWillUnmount () {
    if (this._inputElement) {
      this._inputElement.removeEventListener('focus', this._onFocus);
      this._inputElement.removeEventListener('blur', this._onBlur);
      delete this._inputElement;
    }
  }

  _onFocus () {
    this.setState({focus: true});
  }

  _onBlur () {
    this.setState({focus: false});
  }

  _onClick () {
    if (this._inputElement) {
      this._inputElement.focus();
    }
  }

  render () {
    let classes = [CLASS_ROOT];
    if (this.state.focus) {
      classes.push(CLASS_ROOT + "--focus");
    }
    if (this.props.hidden) {
      classes.push(CLASS_ROOT + "--hidden");
    }
    if (this.props.htmlFor) {
      classes.push(CLASS_ROOT + "--text");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--size-" + this.props.size);
    }
    if (this.props.strong) {
      classes.push(`${CLASS_ROOT}--strong`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let error;
    if (this.props.error) {
      classes.push(CLASS_ROOT + "--error");
      error = (
        <span className={CLASS_ROOT + "__error"}>{this.props.error}</span>
      );
    }
    let help;
    if (this.props.help !== null && this.props.help !== undefined) {
      help = <span className={CLASS_ROOT + "__help"}>{this.props.help}</span>;
    }

    let labelNode;
    if (this.props.label) {
      labelNode = (
        <label className={CLASS_ROOT + "__label"} htmlFor={this.props.htmlFor}>
          {this.props.label}
        </label>
      );
    }

    return (
      <div className={classes.join(' ')} onClick={this._onClick}>
        {error}
        {labelNode}
        {help}
        <span ref={ref => this.contentsRef = ref}
          className={CLASS_ROOT + "__contents"}>
          {this.props.children}
        </span>
      </div>
    );
  }

}

FormField.propTypes = {
  error: PropTypes.node,
  help: PropTypes.node,
  hidden: PropTypes.bool,
  htmlFor: PropTypes.string,
  label: PropTypes.node,
  size: PropTypes.oneOf(['medium', 'large']),
  strong: PropTypes.bool
};

FormField.defaultProps = {
  size: 'medium',
  strong: false
};
