// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Video from 'grommet/components/Video';

const CLASS_ROOT = CSSClassnames.HERO;
const LIGHT_COLORINDEX = 'light-1';
const DARK_COLORINDEX = 'grey-1';
const PALM_BREAKPOINT = 720;

export default class Hero extends Component {

  constructor (props) {
    super(props);
    this._setReverse = this._setReverse.bind(this);
    this._setBackgroundColorIndex = this._setBackgroundColorIndex.bind(this);

    this.state = {
      colorIndex: props.darkTheme ? DARK_COLORINDEX : LIGHT_COLORINDEX,
      reverse: (props.justify === 'start') ? true : false
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this._setReverse);
    window.addEventListener('resize', this._setBackgroundColorIndex);
    this._setReverse();
    this._setBackgroundColorIndex();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._setReverse);
    window.removeEventListener('resize', this._setBackgroundColorIndex);
  }

  _setBackgroundColorIndex () {
    const { darkTheme } = this.props;

    if (window.innerWidth < PALM_BREAKPOINT) {
      this.setState({ colorIndex: LIGHT_COLORINDEX });
    } else {
      this.setState({ colorIndex: darkTheme ? DARK_COLORINDEX : LIGHT_COLORINDEX });
    }
  }

  _setReverse () {
    const { justify } = this.props;

    if (window.innerWidth < PALM_BREAKPOINT) {
      this.setState({ reverse: false });
    } else {
      this.setState({ reverse: (justify === 'start') ? true : false });
    }
  }

  render () {
    const { backgroundImage, backgroundType, backgroundVideoLoop, backgroundVideoMuted, backgroundVideoPoster, backgroundVideoSource, children, className, flush, image, justify, responsiveBackgroundPosition, separator, size } = this.props;

    let classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--bg-${responsiveBackgroundPosition}`]: responsiveBackgroundPosition,
        [`${CLASS_ROOT}--mobile-separator`]: separator
      }
    );

    let full = flush ? 'horizontal' : false;
    let pad = flush ? 'none' : 'large';

    let backgroundMarkup;
    if (backgroundType === 'image') {
      backgroundMarkup = <Box containerClassName={CLASS_ROOT + "__background"} appCentered={true} pad={pad} backgroundImage={`url(${backgroundImage})`} full={full} />;
    } else if (backgroundType === 'video') {
      backgroundMarkup = (
        <Video className={CLASS_ROOT + "__background"} autoPlay={true} showControls={false} loop={backgroundVideoLoop} muted={backgroundVideoMuted} poster={backgroundVideoPoster}>
          <source src={backgroundVideoSource} type="video/mp4"/>
        </Video>
      );
    }

    let imageMarkup = <Box />;
    if (image) {
      imageMarkup = <Image src={`url(${image})`} />;
    }

    let contentMarkup;
    if (justify === 'center') {
      contentMarkup = (
        <Box className={CLASS_ROOT + "__overlay"} justify={justify} align="center" primary={true} full={full} direction="row" >
          <Box pad={{horizontal: 'large', vertical: 'large', between: 'medium'}}>
            {children}
          </Box>
        </Box>
      );
    } else {
      contentMarkup = (
        <Box className={CLASS_ROOT + "__overlay"} align="center" primary={true} full={full} direction="row" reverse={this.state.reverse} >
          <Box className={CLASS_ROOT + "__image"} align="center" justify="center">
            {imageMarkup}
          </Box>
          <Box pad={{horizontal: 'large', vertical: 'large', between: 'medium'}}>
            {children}
          </Box>
        </Box>
      );
    }

    return (
      <Box className={classes} colorIndex={this.state.colorIndex}>
        {backgroundMarkup}
        {contentMarkup}
      </Box>
    );
  }
}

Hero.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundType: PropTypes.oneOf(['image', 'video']),
  backgroundVideoLoop: PropTypes.bool,
  backgroundVideoMuted: PropTypes.bool,
  backgroundVideoPoster: PropTypes.string,
  backgroundVideoSource: PropTypes.string,
  darkTheme: PropTypes.bool,
  flush: PropTypes.bool,
  image: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  responsiveBackgroundPosition: PropTypes.oneOf(['left', 'center', 'right']),
  separator: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large'])
};

Hero.defaultProps = {
  backgroundVideoLoop: false,
  backgroundVideoMuted: true,
  darkTheme: true,
  flush: true,
  justify: 'end',
  responsiveBackgroundPosition: 'center',
  separator: false,
  size: 'large'
};
