// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import { smallSize } from '../utils/Responsive';
import { checkDarkBackground } from '../utils/DOM';
import Box from './Box';
import Image from './Image';

const CLASS_ROOT = CSSClassnames.HERO;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

export default class Hero extends Component {

  constructor(props, context) {
    super(props, context);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this.state = {};
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
    this._setDarkBackground();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.backgroundColorIndex !== this.props.backgroundColorIndex) {
      this.setState({ updateDarkBackground: true });
    }
  }

  componentDidUpdate () {
    if (this.state.updateDarkBackground) {
      this.setState({ updateDarkBackground: false });
      this._setDarkBackground();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  _onResize () {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    const container = this._containerRef;
    if (container) {
      const responsiveSmall =
        (container.offsetWidth < smallSize()) ? true : false;
      this.setState({ responsiveSmall });
    }
  }

  _setDarkBackground () {
    const { backgroundColorIndex } = this.props;
    if (backgroundColorIndex) {
      const container = this._containerRef;
      checkDarkBackground(backgroundColorIndex, container,
        (darkBackground) => this.setState({ darkBackground }));
    }
  }

  _backgroundContextClass (darkBackground) {
    let result;
    if (undefined === darkBackground) {
      result = `${BACKGROUND_COLOR_INDEX}--pending`;
    } else if (darkBackground) {
      result = `${BACKGROUND_COLOR_INDEX}--dark`;
    } else {
      result = `${BACKGROUND_COLOR_INDEX}--light`;
    }
    return result;
  }

  oldRender () {
    const {
      backgroundImage, backgroundVideo, children, className, colorIndex,
      flush, image, justify, responsiveBackgroundPosition, separator, size,
      ...props
    } = this.props;
    const { responsiveSmall } = this.state;

    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--bg-${responsiveBackgroundPosition}`]:
          responsiveBackgroundPosition,
        [`${CLASS_ROOT}--mobile-separator`]: separator
      },
      className
    );

    let full = flush ? 'horizontal' : false;
    let pad = flush ? 'none' : 'large';

    let background;
    if (backgroundImage) {
      background = (
        <Box containerClassName={CLASS_ROOT + '__background'}
          appCentered={true} pad={pad}
          backgroundImage={`url(${backgroundImage})`} full={full} />
      );
    } else if (backgroundVideo) {
      background = (
        <Box className={CLASS_ROOT + '__background ' +
          CLASS_ROOT + '__background-video'}>
          {backgroundVideo}
        </Box>
      );
    }

    let imageMarkup;
    if (image) {
      if (typeof image === 'string') {
        imageMarkup = <Image src={image} />;
      } else {
        imageMarkup = image;
      }
    }

    let contents;
    if (justify === 'center') {
      contents = (
        <Box className={CLASS_ROOT + '__overlay'} justify={justify}
          align='center' primary={true} full={full} direction='row' >
          <Box pad={{horizontal: 'large', vertical: 'large',
            between: 'medium'}}>
            {children}
          </Box>
        </Box>
      );
    } else {
      contents = (
        <Box className={CLASS_ROOT + '__overlay'} justify='end' align='center'
          primary={true} full={full} direction='row'
          reverse={responsiveSmall ? false : (justify === 'start')} >
          <Box basis='1/2' justify='center' align='center'>
            {imageMarkup}
          </Box>
          <Box basis='1/2'
            pad={{horizontal: 'large', vertical: 'large', between: 'medium'}}>
            {children}
          </Box>
        </Box>
      );
    }

    return (
      <Box {...props} className={classes}
        colorIndex={responsiveSmall ? 'light-1' : colorIndex}>
        {background}
        {contents}
      </Box>
    );
  }

  newRender () {
    const {
      background, backgroundColorIndex, children, className, size, ...props
    } = this.props;
    delete props.colorIndex;
    delete props.flush;
    delete props.justify;
    delete props.responsiveBackgroundPosition;
    const { darkBackground, responsiveSmall } = this.state;

    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [this._backgroundContextClass(darkBackground)]:
          (! responsiveSmall && backgroundColorIndex)
      },
      className
    );

    let backgroundContainer;
    if (background) {
      backgroundContainer = (
        <div ref={ref => this._backgroundRef = ref}
          className={`${CLASS_ROOT}__background`}>
          {background}
        </div>
      );
    }

    return (
      <div ref={ref => this._containerRef = ref}
        className={classes} {...props} >
        {backgroundContainer}
        <div className={`${CLASS_ROOT}__foreground`}>
          {children}
        </div>
      </div>
    );
  }

  render () {
    const { backgroundImage, backgroundVideo, image } = this.props;
    if (backgroundImage || backgroundVideo || image) {
      return this.oldRender();
    }
    return this.newRender();
  }
}

Hero.propTypes = {
  background: PropTypes.element,
  // backgroundAlign: PropTypes.oneOfType([
  //   PropTypes.oneOf(['center']),
  //   PropTypes.shape({
  //     bottom: PropTypes.boolean,
  //     left: PropTypes.boolean,
  //     right: PropTypes.boolean,
  //     top: PropTypes.boolean
  //   })
  // ]),
  backgroundColorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  // below props are all deprecated
  backgroundImage: PropTypes.string,
  backgroundPosition: PropTypes.oneOf(['left', 'center', 'right']),
  backgroundVideo: PropTypes.element,
  colorIndex: PropTypes.string,
  flush: PropTypes.bool,
  image: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  responsiveBackgroundPosition: PropTypes.oneOf(['left', 'center', 'right']),
  separator: PropTypes.bool
};

Hero.defaultProps = {
  // backgroundAlign: 'center',
  size: 'large',
  // deprecated
  colorIndex: 'grey-2',
  flush: true,
  justify: 'end',
  responsiveBackgroundPosition: 'center'
};
