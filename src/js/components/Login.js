// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this._adjustBackground = this._adjustBackground.bind(this);
    this._onResize = this._onResize.bind(this);

    this.state = {
      orientation: null
    };
  }

  componentDidMount() {
    if (this.props.background) {
      window.addEventListener('resize', this._onResize);
      setTimeout(this._adjustBackground, 300);
    }
  }

  componentWillUnmount() {
    if (this.props.background) {
      window.removeEventListener('resize', this._onResize);
    }
  }

  _onResize() {
    this._adjustBackground();
  }

  _adjustBackground() {
    // make sure the background always fills the screen, preserve aspect ratio
    var windowRatio = window.innerWidth / window.innerHeight;
    var image = this.refs.background;
    var imageRatio = image.scrollWidth / image.scrollHeight;
    this.setState({orientation: (windowRatio < imageRatio) ? 'portrait' : 'landscape'});
  }

  render() {
    var background = null;
    if (this.props.background) {
      var classes = ['login__background'];
      if (this.state.orientation) {
        classes.push('login__background--' + this.state.orientation);
      }
      background = (
        <img ref="background" className={classes.join(' ')}
          src={this.props.background} />
      );
    }

    return (
      <div className={"login"}>
        {background}
        <div className={"login__container"}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  background: PropTypes.string
};
