// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Tiles from './Tiles';
import Tile from './Tile';
import Button from './Button';
import Previous from './icons/base/Previous';
import Next from './icons/base/Next';
import { findScrollParents } from '../utils/DOM';
import CSSClassnames from '../utils/CSSClassnames';
import Intl from '../utils/Intl';
import { announce } from '../utils/Announcer';
import Props from '../utils/Props';

const CLASS_ROOT = CSSClassnames.CAROUSEL;

export default class Carousel extends Component {

  constructor(props, context) {
    super(props, context);

    this._onSelect = this._onSelect.bind(this);
    this._stopAutoplay = this._stopAutoplay.bind(this);
    this._startAutoplay = this._startAutoplay.bind(this);
    this._onResize = this._onResize.bind(this);
    this._slidePrev = this._slidePrev.bind(this);
    this._slideNext = this._slideNext.bind(this);
    this._handleScroll = this._handleScroll.bind(this);

    this.state = {
      activeIndex: props.activeIndex || 0,
      hideControls: ! props.persistentNav,
      priorIndex: 0,
      sequence: 1,
      width: 0,
      slide: false
    };
  }

  componentDidMount () {
    if (this.carouselRef) {
      this.setState({
        width: this.carouselRef.offsetWidth
      });

      window.addEventListener('resize', this._onResize);

      const Hammer = require('hammerjs');
      this.hammer = new Hammer(this.carouselRef);
      this._updateHammer();

      this._handleScroll();
      const scrollParents = findScrollParents(this.carouselRef);
      scrollParents.forEach((scrollParent) => {
        scrollParent.addEventListener('scroll', this._handleScroll);
      }, this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.activeIndex || 0 === nextProps.activeIndex) &&
      this.state.activeIndex !== nextProps.activeIndex) {
      this.setState({ activeIndex: nextProps.activeIndex });
    }
  }

  componentDidUpdate () {
    this._updateHammer();
  }

  componentWillUnmount () {
    clearInterval(this._slideAnimation);

    window.removeEventListener('resize', this._onResize);

    const scrollParents = findScrollParents(this.carouselRef);
    scrollParents.forEach((scrollParent) => {
      scrollParent.removeEventListener('scroll', this._handleScroll);
    }, this);

    this._unmountHammer();
  }

  _unmountHammer () {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();
    }
    this.hammer = undefined;
  }

  _updateHammer () {
    if (this.hammer) {
      this.hammer.get('swipe').set({
        direction: Hammer.DIRECTION_HORIZONTAL
      });

      this.hammer.off('panend');
      this.hammer.on('panend', (event) => {
        if (event.direction === 4) {
          this._slidePrev();
        } else if (event.direction === 2) {
          this._slideNext();
        }
      });
    }
  }

  _handleScroll () {
    const { autoplay } = this.props;
    const { slide } = this.state;
    const viewportHeight = document.documentElement.clientHeight;
    const carouselTopPosition = this.carouselRef.getBoundingClientRect().top;
    const carouselHeight = this.carouselRef.offsetHeight;
    const startScroll = viewportHeight - (carouselHeight / 2);

    if (autoplay && carouselTopPosition <= startScroll &&
      carouselTopPosition >= -carouselHeight / 2) {
      if (slide === false) {
        this._setSlideInterval();
        this.setState({
          slide: true
        });
      }
    } else {
      clearInterval(this._slideAnimation);
      this.setState({
        slide: false
      });
    }
  }

  _setSlideInterval () {
    const { autoplaySpeed } = this.props;
    clearInterval(this._slideAnimation);
    this._slideAnimation = setInterval(function () {
      const { children, infinite } = this.props;
      const { activeIndex } = this.state;
      const { intl } = this.context;
      const numSlides = children.length;
      const index = (activeIndex + 1) % numSlides;
      const announceFunc = () => {
        const slideNumber = Intl.getMessage(intl, 'Slide Number', {
          slideNumber: this.state.activeIndex + 1
        });
        const activatedMessage = Intl.getMessage(intl, 'Activated');
        announce(`${slideNumber} ${activatedMessage}`, 'polite');
      };

      if (! this.props.hasOwnProperty('activeIndex')) {
        this.setState({
          activeIndex: index
        }, announceFunc );
      }
      if (!infinite && activeIndex === numSlides - 1) {
        clearInterval(this._slideAnimation);
      }

      if (this.props.onActive) {
        this.props.onActive(index);
        announceFunc();
      }
    }.bind(this), autoplaySpeed);
  }

  _onSelect (index) {
    if (! this.props.hasOwnProperty('activeIndex') 
        && index !== this.state.activeIndex) {
      this.setState({
        activeIndex: index
      });
    }

    if (this.props.onActive) {
      this.props.onActive(index);
    }
  }

  _stopAutoplay () {
    const { autoplay, persistentNav } = this.props;
    if (autoplay) {
      clearInterval(this._slideAnimation);
    }

    if (!persistentNav) {
      this.setState({
        hideControls: false
      });
    }
  }

  _startAutoplay () {
    const { activeIndex } = this.state;
    const { autoplay, children, infinite, persistentNav } = this.props;
    if (autoplay && (infinite || activeIndex !== children.length - 1) &&
      // making sure to only start autoplay if the focus is not inside
      // the carousel
      !this.carouselRef.contains(document.activeElement)) {
      this._setSlideInterval();
    }

    if (!persistentNav) {
      this.setState({
        hideControls: true
      });
    }
  }

  _onResize () {
    this.setState({
      width: this.carouselRef.offsetWidth
    });
  }

  _slidePrev () {
    const { children } = this.props;
    const { activeIndex } = this.state;
    const numSlides = children.length;
    const index = (activeIndex + numSlides - 1) % numSlides;

    if(! this.props.hasOwnProperty('activeIndex')) {
      this.setState({
        activeIndex: index
      });
    }

    if (this.props.onActive) {
      this.props.onActive(index);
    }
  }

  _slideNext () {
    const { children } = this.props;
    const { activeIndex } = this.state;
    const numSlides = children.length;
    const index = (activeIndex + 1) % numSlides;

    if(! this.props.hasOwnProperty('activeIndex')) {
      this.setState({
        activeIndex: index
      });
    }

    if (this.props.onActive) {
      this.props.onActive(index);
    }
  }

  _renderPrevButton () {
    const { infinite } = this.props;
    const { activeIndex } = this.state;
    const { intl } = this.context;
    let prevButton;
    if (infinite || activeIndex !== 0) {
      const prevMessage = Intl.getMessage(intl, 'Previous Slide');
      prevButton = (
        <Button icon={<Previous size="large" />} a11yTitle={prevMessage}
          className={`${CLASS_ROOT}__arrow ${CLASS_ROOT}__arrow--prev`}
          onClick={this._slidePrev} />
      );
    }

    return prevButton;
  }

  _renderNextButton () {
    const { children, infinite } = this.props;
    const { activeIndex } = this.state;
    const { intl } = this.context;
    let nextButton;
    if (infinite || activeIndex !== children.length - 1) {
      const nextMessage = Intl.getMessage(intl, 'Next Slide');
      nextButton = (
        <Button icon={<Next size="large" />} a11yTitle={nextMessage}
          className={`${CLASS_ROOT}__arrow ${CLASS_ROOT}__arrow--next`}
          onClick={this._slideNext} />
      );
    }

    return nextButton;
  }

  render () {
    const { a11yTitle, children, className, ...props } = this.props;
    delete props.activeIndex;
    delete props.onActive;
    const restProps = Props.omit({...props}, Object.keys(Carousel.propTypes));
    const { activeIndex, hideControls, width } = this.state;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--hide-controls`]: hideControls
      },
      className
    );

    const trackWidth = width * children.length;
    const trackOffset = width * activeIndex;

    const tiles = React.Children.map(children, (child, index) => {
      const ariaHidden = activeIndex !== index ? true : false;
      return (
        <Tile className={`${CLASS_ROOT}__item`} aria-hidden={ariaHidden}>
          {child}
        </Tile>
      );
    });

    const controls = React.Children.map(children, (child, index) => {
      const active = index === activeIndex;
      const controlClasses = classnames(
        `${CLASS_ROOT}__control`, {
          [`${CLASS_ROOT}__control--active`]: active
        }
      );
      const activateMessage = Intl.getMessage(intl, 'Activate');
      const slideNumberMessage = Intl.getMessage(intl, 'Slide Number', {
        slideNumber: index + 1
      });

      let currentlyActiveMessage = '';
      if (active) {
        currentlyActiveMessage = (
          `(${Intl.getMessage(intl, 'Currently Active')})`
        );
      }
      return (
        <Button plain={true} onClick={this._onSelect.bind(this, index)}
          a11yTitle={
            `${activateMessage} ${slideNumberMessage} ${currentlyActiveMessage}`
          }>
          <svg className={controlClasses} viewBox="0 0 24 24" version="1.1">
            <circle cx={12} cy={12} r={6} />
          </svg>
        </Button>
      );
    }, this);

    const carouselMessage = a11yTitle || Intl.getMessage(intl, 'Carousel');
    return (
      <div ref={ref => this.carouselRef = ref} {...restProps}
        className={classes} role='group' aria-label={carouselMessage}
        onFocus={this._stopAutoplay} onBlur={this._startAutoplay}
        onMouseOver={this._stopAutoplay} onMouseOut={this._startAutoplay}>
        <div className={`${CLASS_ROOT}__track`}
          style={{
            width: (trackWidth && trackWidth > 0) ? trackWidth : '',
            marginLeft: - trackOffset,
            marginRight: - (trackWidth - trackOffset - width)
          }}>
          <Tiles fill={true} responsive={false} wrap={false} direction="row">
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

Carousel.contextTypes = {
  intl: PropTypes.object
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  persistentNav: true
};

Carousel.propTypes = {
  a11yTitle: PropTypes.string,
  activeIndex: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  infinite: PropTypes.bool,
  onActive: PropTypes.func,
  persistentNav: PropTypes.bool
};
