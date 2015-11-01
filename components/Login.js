// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Login = React.createClass({
  displayName: 'Login',

  propTypes: {
    background: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      orientation: null
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.background) {
      window.addEventListener('resize', this._onResize);
      setTimeout(this._adjustBackground, 300);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.background) {
      window.removeEventListener('resize', this._onResize);
    }
  },

  _onResize: function _onResize() {
    this._adjustBackground();
  },

  _adjustBackground: function _adjustBackground() {
    // make sure the background always fills the screen, preserve aspect ratio
    var windowRatio = window.innerWidth / window.innerHeight;
    var image = this.refs.background;
    var imageRatio = image.scrollWidth / image.scrollHeight;
    this.setState({ orientation: windowRatio < imageRatio ? 'portrait' : 'landscape' });
  },

  render: function render() {
    var background = null;
    if (this.props.background) {
      var classes = ['login__background'];
      if (this.state.orientation) {
        classes.push('login__background--' + this.state.orientation);
      }
      background = React.createElement('img', { ref: 'background', className: classes.join(' '),
        src: this.props.background });
    }

    return React.createElement(
      'div',
      { className: "login" },
      background,
      React.createElement(
        'div',
        { className: "login__container" },
        this.props.children
      )
    );
  }

});

module.exports = Login;