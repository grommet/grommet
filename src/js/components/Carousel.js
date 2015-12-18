// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from './Box';
import Tiles from './Tiles';
import Tile from './Tile';
import Button from './Button';
import Previous from './icons/base/Previous';
import Next from './icons/base/Next';

const CLASS_ROOT = "carousel";

class Carousel extends Component {

  constructor (props) {
    super (props);

    this._onSelect = this._onSelect.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onResize = this._onResize.bind(this);
    this._slidePrev = this._slidePrev.bind(this);
    this._slideNext = this._slideNext.bind(this);

    this.state = {
      activeIndex: 0,
      hideControls: ! props.persistentNav,
      priorIndex: 0,
      sequence: 1,
      width: 0
    };
  }

  componentDidMount () {
    this.setState({
      width: this.refs.carousel.offsetWidth
    });

    if (this.props.autoplay) {
      this._setSlideInterval();
    }

    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount () {
    clearInterval(this._slideAnimation);

    window.removeEventListener('resize', this._onResize);
  }

  _setSlideInterval () {
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
  }

  _onSelect (index) {
    if (index !== this.state.activeIndex) {
      this.setState({
        activeIndex: index
      });
    }
  }

  _onMouseOver () {
    if (this.props.autoplay) {
      clearInterval(this._slideAnimation);
    }

    if (!this.props.persistentNav) {
      this.setState({
        hideControls: false
      });
    }
  }

  _onMouseOut () {
    if (this.props.autoplay &&
        (this.props.infinite ||
          this.state.activeIndex !== this.props.children.length - 1)) {
      this._setSlideInterval();
    }

    if (!this.props.persistentNav) {
      this.setState({
        hideControls: true
      });
    }
  }

  _onResize () {
    this.setState({
      width: this.refs.carousel.offsetWidth
    });
  }

  _slidePrev () {
    var numSlides = this.props.children.length;
    this.setState({
      activeIndex: (this.state.activeIndex + numSlides - 1) % numSlides
    });
  }

  _slideNext () {
    var numSlides = this.props.children.length;
    this.setState({
      activeIndex: (this.state.activeIndex + 1) % numSlides
    });
  }

  _renderPrevButton () {
    if (this.props.infinite || this.state.activeIndex !== 0) {
      return (
        <Button
          className={CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev'}
          type="icon" onClick={this._slidePrev}>
          <Previous size="large" />
        </Button>
      );
    }
  }

  _renderNextButton () {
    if (this.props.infinite ||
      this.state.activeIndex !== this.props.children.length - 1) {
      return (
        <Button
          className={CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next'}
          type="icon" onClick={this._slideNext}>
          <Next size="large" />
        </Button>
      );
    }
  }

  render () {
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

    var tiles = React.Children.map(children, function (child) {
      return (
        <Tile className={CLASS_ROOT + "__item"}>
          {child}
        </Tile>
      );
    }, this);

    var controls = React.Children.map(children, function (child) {
      index += 1;
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.state.activeIndex) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }

      return (
        <svg className={controlClasses.join(' ')}
          viewBox="0 0 24 24" version="1.1"
          onClick={this._onSelect.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }, this);

    return (
      <div ref="carousel" className={classes.join(' ')}
        onMouseEnter={this._onMouseOver} onMouseLeave={this._onMouseOut}>
        <div className={CLASS_ROOT + "__track"}
          style={{ width: trackWidth, marginLeft: trackPosition }}>
          <Tiles fill={true}>
            {tiles}
          </Tiles>
        </div>
        {this._renderPrevButton()}
        {this._renderNextButton()}
        <Box className={CLASS_ROOT + "__controls"} direction="row"
          justify="center" responsive={false}>
          {controls}
        </Box>
      </div>
    );
  }
}

Carousel.propTypes = {
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  infinite: PropTypes.bool,
  persistentNav: PropTypes.bool
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  persistentNav: true
};

module.exports = Carousel;
