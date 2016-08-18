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
import LinkNextIcon from './icons/base/LinkNext';
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
    const { video, link } = this.props;

    if (video) {
      event.preventDefault();
      this.setState({ activeVideo : !this.state.activeVideo });
    } else if (link) {
      window.location.href = link;
    }
  }

  _renderChildren () {
    const { children, socialIcon } = this.props;

    if (socialIcon) {
      return (
        <Box className="flex" pad={{between: 'large'}}>
          {children}
          <Box className={`${CLASS_ROOT}__social-icon`} align="end">
            {socialIcon}
          </Box>
        </Box>
      );
    }

    return children;
  }

  _renderLinkMarkup () {
    const { link, linkIcon, linkText, onClick, video } = this.props;

    let linkMarkup;
    let anchorLabel = linkText;
    if (!linkText) {
      anchorLabel = video ? 'Watch Now' : 'Learn More';
    }

    let anchorIcon = linkIcon;
    if (!linkIcon) {
      anchorIcon = video ? <WatchIcon /> : <LinkNextIcon />;
    }

    if (link || onClick || video) {
      linkMarkup = (
        <Box pad={{vertical: "small"}}>
          <Anchor href={link} icon={anchorIcon} label={anchorLabel}
            onClick={this._handleClick} />
        </Box>
      );
    }

    return linkMarkup;
  }

  _renderVideoMarkup () {
    const { video } = this.props;
    const { activeVideo } = this.state;
    let videoMarkup;

    if (video && video.source && activeVideo) {
      videoMarkup = (
        <Layer onClose={this._handleClick} closer={true} flush={true}>
          <Video>
            <source src={video.source} type={`video/${video.type}`}/>
          </Video>
        </Layer>
      );
    }

    return videoMarkup;
  }

  render () {
    const { thumbnail, description, heading, overline, link, onClick, video,
      socialIcon, direction, contentPlacement, pad, className} = this.props;
    const tileProps = Props.pick(this.props, Object.keys(Tile.propTypes));
    delete tileProps.onClick;
    delete tileProps.pad;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--direction-${direction}`]: direction,
        [`${CLASS_ROOT}--selectable`]: (link || onClick || video)
      },
      className
    );

    let onContentCardClick = onClick;
    if (!onContentCardClick && (link || video)) {
      onContentCardClick = this._handleClick;
    }

    const contentMarkup = (
      <Box className={`${CLASS_ROOT}__content`} pad="medium">
        <Heading tag="h5" uppercase={true} margin="none">{overline}</Heading>
        <Heading tag="h2" strong={true}>{heading}</Heading>
        <Paragraph margin="none">{description}</Paragraph>
        {this._renderChildren()}
        {(!socialIcon) ? this._renderLinkMarkup() : null}
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

    if (contentPlacement === 'bottom') {
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
  overline: PropTypes.string,
  link: PropTypes.string,
  linkIcon: PropTypes.element,
  linkText: PropTypes.string,
  video: PropTypes.shape({
    source: PropTypes.string.isRequired,
    type: PropTypes.string
  }),
  contentPlacement: PropTypes.oneOf(['top', 'bottom']),
  socialIcon: PropTypes.element,
  ...Tile.propTypes
};

ContentCard.defaultProps = {
  contentPlacement: 'top',
  direction: 'column'
};
