// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import Box from './Box';
import Tile from './Tile';
import Label from './Label';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Anchor from './Anchor';
import Layer from './Layer';
import Video from './Video';
import WatchIcon from './icons/base/Watch';

const CLASS_ROOT = CSSClassnames.CARD;
const TEXT_TAGS = {
  xlarge: {
    label: 'large',
    heading: 'h1',
    summary: 'xlarge',
    details: 'large'
  },
  large: {
    label: 'medium',
    heading: 'h1',
    summary: 'xlarge',
    details: 'large'
  },
  medium: {
    label: 'medium',
    heading: 'h2',
    summary: 'large',
    details: 'medium'
  },
  small: {
    label: 'small',
    heading: 'h3',
    summary: 'medium',
    details: 'small'
  }
};

export default class Card extends Component {
  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this.state = {
      activeVideo: false
    };
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

    if (link) {
      return (
        <Box pad={{vertical: "small"}}>
          {link}
        </Box>
      );
    }

    return null;
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

  _renderParagraph (contents, textSize, type) {
    if (typeof contents === 'string') {
      return (
        <Paragraph
          className={`${CLASS_ROOT}__${type}`}
          size={textSize}
          margin="none"
        >
          {contents}
        </Paragraph>
      );
    } else if (Array.isArray(contents)) {
      return contents.map((content, index) => (
        <Paragraph
          key={`${type}_${index}`}
          className={`${CLASS_ROOT}__${type}`}
          size={textSize}
          margin="none"
        >
          {content}
        </Paragraph>
      ));
    }
    return null;
  }

  render () {
    const { children, className, colorIndex, details, direction, heading,
      headingStrong, label, onClick, pad, reverse, summary, textSize, thumbnail,
      video } = this.props;
    const tileProps = Props.pick(this.props, Object.keys(Tile.propTypes));
    delete tileProps.colorIndex;
    delete tileProps.onClick;
    delete tileProps.pad;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--direction-${direction}`]: direction,
        [`${CLASS_ROOT}--selectable`]: (onClick || video),
        [`${CLASS_ROOT}--${textSize}`]: textSize
      },
      className
    );

    let onCardClick = onClick;
    if (!onCardClick && video) {
      onCardClick = this._onClick;
    }

    const tag = TEXT_TAGS[textSize];

    const contentContainer = (
      <Box className={`${CLASS_ROOT}__content`} pad="medium">
        {label &&
          <Label className={`${CLASS_ROOT}__label`}
            size={tag.label} margin="none" uppercase={true}>
            {label}
          </Label>
        }
        {heading &&
          <Heading className={`${CLASS_ROOT}__heading`}
            tag={tag.heading} strong={headingStrong} margin="none">
            {heading}
          </Heading>
        }
        {this._renderParagraph(summary, tag.summary, 'summary')}
        {this._renderParagraph(details, tag.details, 'details')}
        {children}
        {this._renderLink()}
      </Box>
    );

    let thumbnailContainer;
    if (thumbnail) {
      thumbnailContainer = (
        <Box className={`${CLASS_ROOT}__thumbnail`}
          backgroundImage={`url(${thumbnail})`}
          justify="center" align="center">
          {(video) ? <Anchor icon={<WatchIcon size="xlarge" />} /> : null}
        </Box>
      );
    }

    let first = thumbnailContainer;
    let second = contentContainer;
    let cardJustify;

    if (reverse) {
      first = contentContainer;
      second = thumbnailContainer;
      // align thumbnail to bottom of card for bottom cardPlacement
      cardJustify = 'between';
    }

    let cardPad = 'small';
    let cardFull;
    if (direction === 'row') {
      cardPad = {vertical: 'small'};
      cardFull = 'horizontal';
    }

    return (
      <Tile className={classes} onClick={onCardClick}
        pad={pad || cardPad} {...tileProps}>
        <Box className="flex" direction={direction} justify={cardJustify}
          full={cardFull} colorIndex={colorIndex}>
          {first}
          {second}
          {this._renderVideo()}
        </Box>
      </Tile>
    );
  }
};

Card.propTypes = {
  details: PropTypes.node,
  heading: PropTypes.string,
  headingStrong: PropTypes.bool,
  label: PropTypes.string,
  link: PropTypes.element,
  onClick: PropTypes.func,
  reverse: PropTypes.bool,
  summary: PropTypes.node,
  textSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  thumbnail: PropTypes.string,
  video: PropTypes.oneOfType([
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    PropTypes.element
  ]),
  ...Tile.propTypes
};

Card.defaultProps = {
  colorIndex: 'light-1',
  direction: 'column',
  headingStrong: true,
  textSize: 'medium'
};
