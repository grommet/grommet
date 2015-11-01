// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var CLASS_ROOT = "split";

var Split = React.createClass({
  displayName: 'Split',

  propTypes: {
    fixed: React.PropTypes.bool,
    flex: React.PropTypes.oneOf(['left', 'right', 'both']),
    separator: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fixed: true,
      flex: 'both'
    };
  },

  getInitialState: function getInitialState() {
    return { responsive: null };
  },

  componentDidMount: function componentDidMount() {
    // figure out the break width
    this._breakWidth = 720; // default
    // CSS stores the break width in a hidden pseudo element
    var splitElement = this.refs.split;
    var after = window.getComputedStyle(splitElement, ':after');
    if (after) {
      this._breakWidth = parseInt(after.getPropertyValue('width'), 10);
    }

    window.addEventListener('resize', this._onResize);
    this._layout();
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  },

  _onResize: function _onResize() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _setResponsive: function _setResponsive(responsive) {
    if (this.state.responsive !== responsive) {
      this.setState({ responsive: responsive });
      if (this.props.onResponsive) {
        this.props.onResponsive(responsive);
      }
    }
  },

  _layout: function _layout() {
    var splitElement = this.refs.split;
    if (splitElement.offsetWidth < this._breakWidth) {
      this._setResponsive('single');
    } else {
      this._setResponsive('multiple');
    }
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.flex) {
      classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.separator) {
      classes.push(CLASS_ROOT + "--separator");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      'div',
      { ref: 'split', className: classes.join(' ') },
      this.props.children
    );
  }
});

module.exports = Split;