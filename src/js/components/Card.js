// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import Box from './Box';
import Label from './Label';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Anchor from './Anchor';
import Layer from './Layer';
import Video from './Video';
import WatchIcon from './icons/base/Watch';

const CLASS_ROOT = CSSClassnames.CARD;
const TEXT_OPTIONS = {
  xlarge: {
    label: 'large',
    heading: 'h1',
    description: 'large'
  },
  large: {
    label: 'medium',
    heading: 'h1',
    description: 'large'
  },
  medium: {
    label: 'medium',
    heading: 'h2',
    description: 'medium'
  },
  small: {
    label: 'small',
    heading: 'h3',
    description: 'small'
  }
};

export default class Card extends Component {
  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this.state = { activeVideo: false };
  }

  _onClick (event) {
    const { video } = this.props;
    if (video) {
      event.preventDefault();
      this.setState({ activeVideo : !this.state.activeVideo });
    }
  }

  _renderLink () {
    const { link } = this.props;
    let result;
    if (link) {
      result = (
        <Box pad={{vertical: "small"}}>
          {link}
        </Box>
      );
    }
    return result;
  }

  _renderVideo () {
    const { video } = this.props;
    const { activeVideo } = this.state;
    let layerContent;
    let videoLayer;

    if (video && activeVideo) {
      if (video.source) {
        layerContent = (
          <Video>
            <source src={video.source} type={`video/${video.type}`}/>
          </Video>
        );
      } else {
        layerContent = video;
      }

      videoLayer = (
        <Layer onClose={this._onClick} closer={true} flush={true}>
          {layerContent}
        </Layer>
      );
    }

    return videoLayer;
  }

  _renderDescription (description, textSize, key="0") {
    let result;
    if (Array.isArray(description)) {
      result = contents.map((item, index) => {
        return this._renderDescription(item, textSize, index);
      });
    }
    if (typeof description === 'string') {
      result = (
        <Paragraph key={key} className={`${CLASS_ROOT}__description`}
          size={textSize} >
          {description}
        </Paragraph>
      );
    } else {
      result = description;
    }
    return result;
  }

  render () {
    const { children, className, contentPad, description,
      direction, heading, headingStrong, label, onClick, reverse,
      textSize, thumbnail, video } = this.props;
    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--direction-${direction}`]: direction, /// revisit
        [`${CLASS_ROOT}--selectable`]: (onClick || video), /// revisit
        [`${CLASS_ROOT}--${textSize}`]: textSize /// rename -> --text-{size}?
      },
      className
    );

    let onCardClick = onClick;
    if (!onCardClick && video) {
      onCardClick = this._onClick;
    }

    const options = TEXT_OPTIONS[textSize];

    let labelContent;
    if (label) {
      labelContent = (
        <Label className={`${CLASS_ROOT}__label`}
          size={options.label} margin="none" uppercase={true}>
          {label}
        </Label>
      );
    }

    let headingContent;
    if (heading) {
      headingContent = (
        <Heading className={`${CLASS_ROOT}__heading`}
          tag={options.heading} strong={headingStrong}>
          {heading}
        </Heading>
      );
    }

    const textContainer = (
      <Box className={`${CLASS_ROOT}__content`} pad={contentPad}>
        {labelContent}
        {headingContent}
        {this._renderDescription(description, options.description)}
        {children}
        {this._renderLink()}
      </Box>
    );

    let thumbnailContainer;
    if (thumbnail) {
      const basis = 'row' === this.props.direction ? '1/3' : 'small';
      thumbnailContainer = (
        <Box className={`${CLASS_ROOT}__thumbnail`}
          backgroundImage={`url(${thumbnail})`} basis={basis} flex={false}
          justify="center" align="center">
          {(video) ? <Anchor icon={<WatchIcon size="xlarge" />} /> : null}
        </Box>
      );
    }

    let cardJustify;
    if (reverse) {
      // align thumbnail to bottom/right of card for bottom cardPlacement
      cardJustify = 'between';
    }

    if (! this.props.size) {
      if (this.props.direction === 'row') {
        boxProps.size = { width: 'xlarge' };
      } else {
        boxProps.size = { width: 'medium' };
      }
    }

    return (
      <Box {...boxProps} className={classes} justify={cardJustify}
        onClick={onCardClick}>
        {thumbnailContainer}
        {textContainer}
        {this._renderVideo()}
      </Box>
    );
  }
};

Card.propTypes = {
  contentPad: Box.propTypes.pad,
  description: PropTypes.node,
  heading: PropTypes.string,
  headingStrong: PropTypes.bool,
  label: PropTypes.string,
  link: PropTypes.element,
  textSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  thumbnail: PropTypes.string,
  video: PropTypes.oneOfType([
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    PropTypes.element
  ]),
  ...Box.propTypes
};

Card.defaultProps = {
  colorIndex: 'light-1',
  contentPad: 'medium',
  headingStrong: true,
  textSize: 'medium'
};
