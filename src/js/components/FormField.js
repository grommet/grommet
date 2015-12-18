// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "form-field";

class FormField extends Component {

  constructor() {
    super();

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = { focus: false };
  }

  componentDidMount () {
    var contentsElement = this.refs.contents;
    var inputElements = contentsElement.querySelectorAll('input, textarea, select');
    if (inputElements.length === 1) {
      this._inputElement = inputElements[0];
      this._inputElement.addEventListener('focus', this._onFocus);
      this._inputElement.addEventListener('blur', this._onBlur);
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
    var classes = [CLASS_ROOT];
    if (this.state.focus) {
      classes.push(CLASS_ROOT + "--focus");
    }
    if (this.props.required) {
      classes.push(CLASS_ROOT + "--required");
    }
    if (this.props.hidden) {
      classes.push(CLASS_ROOT + "--hidden");
    }
    if (this.props.htmlFor) {
      classes.push(CLASS_ROOT + "--text");
    }

    var error;
    if (this.props.error) {
      classes.push(CLASS_ROOT + "--error");
      error = <span className={CLASS_ROOT + "__error"}>{this.props.error}</span>;
    }
    var help;
    if (this.props.help !== null && this.props.help !== undefined) {
      help = <span className={CLASS_ROOT + "__help"}>{this.props.help}</span>;
    }

    return (
      <div className={classes.join(' ')} onClick={this._onClick}>
        {error}
        <label className={CLASS_ROOT + "__label"} htmlFor={this.props.htmlFor}>
          {this.props.label}
        </label>
        {help}
        <span ref="contents" className={CLASS_ROOT + "__contents"}>
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
  required: PropTypes.bool
};

module.exports = FormField;
