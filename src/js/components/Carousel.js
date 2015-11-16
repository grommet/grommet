// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Box = require('./Box');
var Previous = require('./icons/base/Previous');
var Next = require('./icons/base/Next');

var CLASS_ROOT = "carousel";

var Carousel = React.createClass({

  propTypes: {
    autoplay: React.PropTypes.bool,
    autoplaySpeed: React.PropTypes.number,
    infinite: React.PropTypes.bool,
    persistentNav: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
      persistentNav: true
    };
  },

  getInitialState: function () {
    return {
      activeIndex: 0,
      hideControls: !this.props.persistentNav,
      priorIndex: 0,
      sequence: 1,
      width: 0
    };
  },

  componentDidMount: function() {
    this.setState({
      width: this.refs.carousel.offsetWidth
    });

    if (this.props.autoplay) {
      this._setSlideInterval();
    }

    window.addEventListener('resize', this._onWindowResize);
  },

  componentWillUnmount: function() {
    clearInterval(this._slideAnimation);

    window.removeEventListener('resize', this._onWindowResize);
  },

  _slideAnimation: null,

  _setSlideInterval: function() {
    this._slideAnimation = setInterval(function() {
      var activeIndex = this.state.activeIndex;
      var numSlides = this.props.children.length;

      this.setState({
        activeIndex: (activeIndex + 1) % numSlides
      });

      if (!this.props.infinite && activeIndex === numSlides - 1) {
        clearInterval(this._slideAnimation);
      }
    }.bind(this), this.props.autoplaySpeed);
  },

  _onSelect: function (index) {
    if (index !== this.state.activeIndex) {
      this.setState({
        activeIndex: index
      });
    }
  },

  _onMouseOver: function() {
    if (this.props.autoplay) {
      clearInterval(this._slideAnimation);
    }

    if (!this.props.persistentNav) {
      this.setState({
        hideControls: false
      });
    }
  },

  _onMouseOut: function() {
    if (this.props.autoplay && (this.props.infinite || this.state.activeIndex !== this.props.children.length - 1)) {
      this._setSlideInterval();
    }

    if (!this.props.persistentNav) {
      this.setState({
        hideControls: true
      });
    }
  },

  _onWindowResize: function () {
    this.setState({
      width: this.refs.carousel.offsetWidth
    });
  },

  _slidePrev: function() {
    var numSlides = this.props.children.length;
    this.setState({
      activeIndex: (this.state.activeIndex + numSlides - 1) % numSlides
    });
  },

  _slideNext: function() {
    var numSlides = this.props.children.length;
    this.setState({
      activeIndex: (this.state.activeIndex + 1) % numSlides
    });
  },

  _renderPrevButton: function() {
    if (this.props.infinite || this.state.activeIndex !== 0) {
      return (
        <div className={CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev'} onClick={this._slidePrev}>
          <Previous />
        </div>
      );
    }
  },

  _renderNextButton: function() {
    if (this.props.infinite || this.state.activeIndex !== this.props.children.length - 1) {
      return (
        <div className={CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next'} onClick={this._slideNext}>
          <Next />
        </div>
      );
    }
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.state.hideControls) {
      classes.push(CLASS_ROOT + '--hide-controls');
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    var index = -1;
    var children = this.props.children;

    var width = this.state.width;
    var trackWidth = width * children.length;

    var trackPosition = -(width * this.state.activeIndex);

    var controls = React.Children.map(children, function (child) {
      index += 1;
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.state.activeIndex) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }

      return (
        <svg className={controlClasses.join(' ')} viewBox="0 0 24 24" version="1.1"
          onClick={this._onSelect.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }, this);

    return (
      <div ref="carousel" className={classes.join(' ')} onMouseEnter={this._onMouseOver} onMouseLeave={this._onMouseOut}>
        <div className={CLASS_ROOT + "__track"} style={{ width: trackWidth, marginLeft: trackPosition }}>
          {children}
        </div>
        {this._renderPrevButton()}
        {this._renderNextButton()}
        <Box className={CLASS_ROOT + "__controls"} direction="row" justify="center" responsive={false}>
          {controls}
        </Box>
      </div>
    );
  }

});

module.exports = Carousel;
