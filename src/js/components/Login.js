// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LOGIN;

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    console.warn(
      'Login: component has been deprecated. Use Box instead.'
    );
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
    var image = this.backgroundRef;
    var imageRatio = image.scrollWidth / image.scrollHeight;
    this.setState({
      orientation: (windowRatio < imageRatio) ? 'portrait' : 'landscape'
    });
  }

  render() {
    var background;
    if (this.props.background) {
      var classes = [`${CLASS_ROOT}__background`];
      if (this.state.orientation) {
        classes.push(`${CLASS_ROOT}__background--${this.state.orientation}`);
      }
      background = (
        <img ref={ref => this.backgroundRef = ref} className={classes.join(' ')}
          src={this.props.background} />
      );
    }

    return (
      <div className={CLASS_ROOT}>
        {background}
        <div className={`${CLASS_ROOT}__container`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Login.propTypes = { // remove in 1.0
  background: PropTypes.string
};
