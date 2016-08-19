// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Props from '../utils/Props';
import Box from './Box';
import Tile from './Tile';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Anchor from './Anchor';
import Layer from './Layer';
import Video from './Video';
import WatchIcon from './icons/base/Watch';

const CLASS_ROOT = 'content-card';

export default class ContentCard extends Component {
  constructor (props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      activeVideo: false
    };
  }

  _handleClick (event) {
    const { video } = this.props;

    if (video) {
      event.preventDefault();
      this.setState({ activeVideo : !this.state.activeVideo });
    }
  }

  _renderLinkMarkup () {
    const { link } = this.props;
    let linkMarkup;

    if (link) {
      linkMarkup = (
        <Box pad={{vertical: "small"}}>
          {link}
        </Box>
      );
    }

    return linkMarkup;
  }

  _renderVideoMarkup () {
    const { video } = this.props;
    const { activeVideo } = this.state;
    let videoMarkup;
    let layerMarkup;

    if (video && activeVideo) {
      if (video.source) {
        videoMarkup = (
          <Video>
            <source src={video.source} type={`video/${video.type}`}/>
          </Video>
        );
      } else {
        videoMarkup = video;
      }

      layerMarkup = (
        <Layer onClose={this._handleClick} closer={true} flush={true}>
          {videoMarkup}
        </Layer>
      );
    }

    return layerMarkup;
  }

  render () {
    const { children, thumbnail, description, heading, label, onClick, video,
      direction, reverse, pad, className} = this.props;
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

    let onContentCardClick = onClick;
    if (!onContentCardClick && video) {
      onContentCardClick = this._handleClick;
    }

    const contentMarkup = (
      <Box className={`${CLASS_ROOT}__content`} pad="medium">
        <Heading tag="h5" uppercase={true} margin="none">{label}</Heading>
        <Heading tag="h2" strong={true}>{heading}</Heading>
        <Paragraph margin="none">{description}</Paragraph>
        {children}
        {this._renderLinkMarkup()}
      </Box>
    );

    let thumbnailMarkup;
    if (thumbnail) {
      thumbnailMarkup = (
        <Box className={`${CLASS_ROOT}__thumbnail`}
          backgroundImage={`url(${thumbnail})`}
          justify="center" align="center">
          {(video) ? <Anchor icon={<WatchIcon size="xlarge" />} /> : null}}
        </Box>
      );
    }

    let first = thumbnailMarkup;
    let second = contentMarkup;
    let cardJustify;

    if (reverse) {
      first = contentMarkup;
      second = thumbnailMarkup;
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
      <Tile className={classes} onClick={onContentCardClick}
        pad={pad || cardPad} {...tileProps}>
        <Box className="flex" direction={direction} justify={cardJustify}
          full={cardFull} colorIndex="light-1">
          {first}
          {second}
          {this._renderVideoMarkup()}
        </Box>
      </Tile>
    );
  }
};

ContentCard.propTypes = {
  thumbnail: PropTypes.string,
  description: PropTypes.string,
  heading: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.element,
  video: PropTypes.oneOfType([
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    PropTypes.element
  ]),
  reverse: PropTypes.bool,
  ...Tile.propTypes
};

ContentCard.defaultProps = {
  direction: 'column'
};
