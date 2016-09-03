// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import Box from './Box';
import Tile from './Tile';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Anchor from './Anchor';
import Layer from './Layer';
import Video from './Video';
import WatchIcon from './icons/base/Watch';

const CLASS_ROOT = CSSClassnames.CARD;

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
    const { link, linkIcon, linkText } = this.props;

    if (link) {
      return (
        <Anchor className={`${CLASS_ROOT}__link`} primary={true} href={link}
          target="_blank" icon={linkIcon}>
          {linkText}
        </Anchor>
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
    const { children, thumbnail, description, heading, headingStrong, label,
      onClick, video, direction, reverse, pad, className, textSize, paragraph
    } = this.props;
    const tileProps = Props.pick(this.props, Object.keys(Tile.propTypes));
    delete tileProps.onClick;
    delete tileProps.pad;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--direction-${direction}`]: direction,
        [`${CLASS_ROOT}--selectable`]: (onClick || video)
      },
      className
    );

    let labelTag;
    let headingTag;
    let paragraphSize;
    let descriptionSize;
    if (textSize === 'xlarge') {
      labelTag = 'h3';
      headingTag = 'h1';
      paragraphSize = 'xlarge';
      descriptionSize = 'large';
    } else if (textSize === 'large') {
      labelTag = 'h4';
      headingTag = 'h1';
      paragraphSize = 'xlarge';
      descriptionSize = 'large';
    } else if (textSize === 'medium') {
      labelTag = 'h4';
      headingTag = 'h2';
      paragraphSize = 'large';
      descriptionSize = 'medium';
    } else {
      labelTag = 'h5';
      headingTag = 'h3';
      paragraphSize = 'medium';
      descriptionSize = 'small';
    }

    let onCardClick = onClick;
    if (!onCardClick && video) {
      onCardClick = this._onClick;
    }

    const contentContainer = (
      <Box className={`${CLASS_ROOT}__content`} pad="medium">
        {label &&
          <Heading className={`${CLASS_ROOT}__label`}
            tag={labelTag} margin="none" uppercase={true}>
            {label}
          </Heading>
        }
        {heading &&
          <Heading className={`${CLASS_ROOT}__heading`}
            tag={headingTag} strong={headingStrong} margin="none">
            {heading}
          </Heading>
        }
        {this._renderParagraph(paragraph, paragraphSize, 'paragraph')}
        {this._renderParagraph(description, descriptionSize, 'description')}
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
          full={cardFull} colorIndex="light-1">
          {first}
          {second}
          {this._renderVideo()}
        </Box>
      </Tile>
    );
  }
};

Card.propTypes = {
  thumbnail: PropTypes.string,
  textSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  label: PropTypes.string,
  heading: PropTypes.string,
  headingStrong: PropTypes.bool,
  paragraph: PropTypes.string,
  description: PropTypes.string,
  video: PropTypes.oneOfType([
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    PropTypes.element
  ]),
  reverse: PropTypes.bool,
  link: PropTypes.string,
  linkText: PropTypes.string,
  linkIcon: PropTypes.element,
  onClick: PropTypes.func,
  ...Tile.propTypes
};

Card.defaultProps = {
  direction: 'column',
  textSize: 'medium',
  headingStrong: true,
  linkText: 'Learn More'
};
