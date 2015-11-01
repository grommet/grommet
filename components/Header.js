// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');

var CLASS_ROOT = "header";

var Header = React.createClass({
  displayName: 'Header',

  propTypes: merge({
    fixed: React.PropTypes.bool,
    float: React.PropTypes.bool,
    large: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool,
    splash: React.PropTypes.bool,
    strong: React.PropTypes.bool,
    tag: React.PropTypes.string
  }, Box.propTypes),

  getDefaultProps: function getDefaultProps() {
    return {
      pad: 'none',
      direction: 'row',
      align: 'center',
      responsive: false,
      tag: 'header'
    };
  },

  getInitialState: function getInitialState() {
    return this._stateFromProps(this.props);
  },

  componentDidMount: function componentDidMount() {
    if (this.props.fixed) {
      this._alignMirror();
      window.addEventListener('resize', this._onResize);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.fixed) {
      this._alignMirror();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.fixed) {
      window.removeEventListener('resize', this._onResize);
    }
  },

  _stateFromProps: function _stateFromProps(props) {
    return { size: props.size || (props.small ? 'small' : props.large ? 'large' : null) };
  },

  _onResize: function _onResize() {
    this._alignMirror();
  },

  _alignMirror: function _alignMirror() {
    var contentElement = ReactDOM.findDOMNode(this.refs.content);
    var mirrorElement = this.refs.mirror;

    // constrain fixed content to the width of the mirror
    var mirrorRect = mirrorElement.getBoundingClientRect();
    contentElement.style.width = '' + Math.floor(mirrorRect.width) + 'px';

    // align the mirror height with the content's height
    var contentRect = contentElement.getBoundingClientRect();
    mirrorElement.style.height = '' + Math.floor(contentRect.height) + 'px';
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    var containerClasses = [CLASS_ROOT + "__container"];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.fixed) {
      containerClasses.push(CLASS_ROOT + "__container--fixed");
    }
    if (this.props.float) {
      classes.push(CLASS_ROOT + "--float");
      containerClasses.push(CLASS_ROOT + "__container--float");
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    if (this.props.splash) {
      classes.push(CLASS_ROOT + "--splash");
    }
    if (this.props.strong) {
      classes.push(CLASS_ROOT + "--strong");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.fixed) {
      return React.createElement(
        'div',
        { className: containerClasses.join(' ') },
        React.createElement('div', { ref: 'mirror', className: CLASS_ROOT + "__mirror" }),
        React.createElement(
          'div',
          { className: CLASS_ROOT + "__wrapper" },
          React.createElement(
            Box,
            _extends({ ref: 'content', tag: this.props.header }, other, { className: classes.join(' ') }),
            this.props.children
          )
        )
      );
    } else {
      return React.createElement(
        Box,
        _extends({ tag: this.props.header }, other, { className: classes.join(' '),
          containerClassName: containerClasses.join(' ') }),
        this.props.children
      );
    }
  }

});

module.exports = Header;