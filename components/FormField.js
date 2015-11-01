// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var CLASS_ROOT = "form-field";

var FormField = React.createClass({
  displayName: 'FormField',

  propTypes: {
    error: React.PropTypes.node,
    help: React.PropTypes.node,
    hidden: React.PropTypes.bool,
    htmlFor: React.PropTypes.string,
    label: React.PropTypes.node,
    required: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return { focus: false };
  },

  componentDidMount: function componentDidMount() {
    var contentsElement = this.refs.contents;
    var inputElements = contentsElement.querySelectorAll('input, textarea, select');
    if (inputElements.length === 1) {
      this._inputElement = inputElements[0];
      this._inputElement.addEventListener('focus', this._onFocus);
      this._inputElement.addEventListener('blur', this._onBlur);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this._inputElement) {
      this._inputElement.removeEventListener('focus', this._onFocus);
      this._inputElement.removeEventListener('blur', this._onBlur);
      delete this._inputElement;
    }
  },

  _onFocus: function _onFocus() {
    this.setState({ focus: true });
  },

  _onBlur: function _onBlur() {
    this.setState({ focus: false });
  },

  _onClick: function _onClick() {
    if (this._inputElement) {
      this._inputElement.focus();
    }
  },

  render: function render() {
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
      error = React.createElement(
        'span',
        { className: CLASS_ROOT + "__error" },
        this.props.error
      );
    }
    var help;
    if (this.props.help !== null && this.props.help !== undefined) {
      help = React.createElement(
        'span',
        { className: CLASS_ROOT + "__help" },
        this.props.help
      );
    }

    return React.createElement(
      'div',
      { className: classes.join(' '), onClick: this._onClick },
      error,
      React.createElement(
        'label',
        { className: CLASS_ROOT + "__label", htmlFor: this.props.htmlFor },
        this.props.label
      ),
      help,
      React.createElement(
        'span',
        { ref: 'contents', className: CLASS_ROOT + "__contents" },
        this.props.children
      )
    );
  }

});

module.exports = FormField;