// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Responsive from '../utils/Responsive';
import Box from './Box';
import Image from './Image';

const CLASS_ROOT = CSSClassnames.HERO;

export default class Hero extends Component {

  constructor(props, context) {
    super(props, context);
    this._setReverse = this._setReverse.bind(this);
    this._setBackgroundColorIndex = this._setBackgroundColorIndex.bind(this);

    this.state = {
      colorIndex: props.colorIndex,
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
    const { colorIndex } = this.props;

    if (window.innerWidth < Responsive.smallSize()) {
      this.setState({ colorIndex: 'light-1' });
    } else {
      this.setState({ colorIndex: colorIndex });
    }
  }

  _setReverse () {
    const { justify } = this.props;

    if (window.innerWidth < Responsive.smallSize()) {
      this.setState({ reverse: false });
    } else {
      this.setState({ reverse: (justify === 'start') ? true : false });
    }
  }

  render () {
    const {
      backgroundImage, backgroundVideo, children, className, flush, image,
      justify, responsiveBackgroundPosition, separator, size, ...props
    } = this.props;

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

    let backgroundMarkup;
    if (backgroundImage) {
      backgroundMarkup = (
        <Box containerClassName={CLASS_ROOT + "__background"}
          appCentered={true} pad={pad}
          backgroundImage={`url(${backgroundImage})`} full={full} />
      );
    } else if (backgroundVideo) {
      backgroundMarkup = (
        <Box className={CLASS_ROOT + "__background " +
          CLASS_ROOT + "__background-video"}>
          {backgroundVideo}
        </Box>
      );
    }

    let imageMarkup = <Box />;
    if (image) {
      imageMarkup = <Image src={`url(${image})`} />;
    }

    let contentMarkup;
    if (justify === 'center') {
      contentMarkup = (
        <Box className={CLASS_ROOT + "__overlay"} justify={justify}
          align="center" primary={true} full={full} direction="row" >
          <Box pad={{horizontal: 'large', vertical: 'large',
            between: 'medium'}}>
            {children}
          </Box>
        </Box>
      );
    } else {
      contentMarkup = (
        <Box className={CLASS_ROOT + "__overlay"} align="center"
          primary={true} full={full} direction="row"
          reverse={this.state.reverse} >
          <Box className={CLASS_ROOT + "__image"} align="center"
            justify="center">
            {imageMarkup}
          </Box>
          <Box pad={{horizontal: 'large', vertical: 'large',
            between: 'medium'}}>
            {children}
          </Box>
        </Box>
      );
    }

    return (
      <Box {...props} className={classes} colorIndex={this.state.colorIndex}>
        {backgroundMarkup}
        {contentMarkup}
      </Box>
    );
  }
}

Hero.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundVideo: PropTypes.object,
  colorIndex: PropTypes.string,
  flush: PropTypes.bool,
  image: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  responsiveBackgroundPosition: PropTypes.oneOf(['left', 'center', 'right']),
  separator: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large'])
};

Hero.defaultProps = {
  colorIndex: 'grey-1',
  flush: true,
  justify: 'end',
  responsiveBackgroundPosition: 'center',
  separator: false,
  size: 'large'
};
