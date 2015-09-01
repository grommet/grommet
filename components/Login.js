// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Login = React.createClass({

  propTypes: {
    background: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      orientation: null
    };
  },

  componentDidMount: function() {
    if (this.props.background) {
      window.addEventListener('resize', this._onResize);
      setTimeout(this._adjustBackground, 300);
    }
  },

  componentWillUnmount: function() {
    if (this.props.background) {
      window.removeEventListener('resize', this._onResize);
    }
  },

  _onResize: function() {
    this._adjustBackground();
  },

  _adjustBackground: function() {
    // make sure the background always fills the screen, preserve aspect ratio
    var windowRatio = window.innerWidth / window.innerHeight;
    var image = this.refs.background.getDOMNode();
    var imageRatio = image.scrollWidth / image.scrollHeight;
    this.setState({orientation: (windowRatio < imageRatio) ? 'portrait' : 'landscape'});
  },

  render: function() {
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

});

module.exports = Login;
