// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import Box from './Box';
import Label from './Label';
import Heading from './Heading';
import Headline from './Headline';
import Markdown from './Markdown';
import Anchor from './Anchor';
import Layer from './Layer';
import Video from './Video';
import CirclePlayIcon from './icons/base/CirclePlay';
import Responsive from '../utils/Responsive';

const CLASS_ROOT = CSSClassnames.CARD;

const LABEL_SIZES = {
  xlarge: 'medium',
  large: 'medium',
  medium: 'medium',
  small: 'medium',
  xsmall: 'small'
};

const HEADLINE_SIZES = {
  xlarge: 'medium',
  large: 'medium'
};

const HEADING_TAGS = {
  medium: 'h1',
  small: 'h2',
  xsmall: 'h3'
};

const PARAGRAPH_SIZES = {
  xlarge: 'xlarge',
  large: 'xlarge',
  medium: 'large',
  small: 'large',
  xsmall: 'medium'
};

const PARAGRAPH_MARGINS = {
  xlarge: 'large',
  large: 'large',
  medium: 'medium',
  small: 'medium',
  xsmall: 'small'
};

export default class Card extends Component {

  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this._onResponsive = this._onResponsive.bind(this);
    this.state = { activeVideo: false, small: false };
  }

  componentDidMount () {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount () {
    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _onResponsive (small) {
    this.setState({ small: !!small });
  }

  _onClick (event) {
    const { video } = this.props;
    if (video) {
      event.preventDefault();
      this.setState({ activeVideo : !this.state.activeVideo });
    }
  }

  _renderLabel () {
    const { label, textSize } = this.props;
    let result = label;
    if (typeof label === 'string') {
      result = (
        <Label size={LABEL_SIZES[textSize]} margin="none" uppercase={true}>
          {label}
        </Label>
      );
    }
    return result;
  }

  _renderHeading () {
    const { heading, headingStrong, textSize } = this.props;
    let result = heading;
    if (typeof heading === 'string') {
      if (HEADLINE_SIZES[textSize]) {
        result = (
          <Headline size={HEADLINE_SIZES[textSize]} strong={headingStrong}>
            {heading}
          </Headline>
        );
      } else {
        result = (
          <Heading tag={HEADING_TAGS[textSize]} strong={headingStrong}>
            {heading}
          </Heading>
        );
      }
    }
    return result;
  }

  _renderLink () {
    const { link } = this.props;
    return link;
  }

  _renderThumbnail () {
    const { direction, thumbnail, video } = this.props;
    const { small } = this.state;
    let result = thumbnail;
    if (typeof thumbnail === 'string') {
      const size = small ? 'large' : 'xlarge';
      const videoIcon = (video) ?
        (
          <Anchor icon={<CirclePlayIcon responsive={false} 
            colorIndex='brand' size={size} />} />
        ):
        undefined;

      const flex = 'row' === direction ? 'grow' : undefined;

      result = (
        <Box className={`${CLASS_ROOT}__thumbnail`} flex={flex}
          backgroundImage={`url(${thumbnail})`} basis='small'
          justify="center" align="center">
          {videoIcon}
        </Box>
      );
    }
    return result;
  }

  _renderVideoLayer () {
    const { video } = this.props;
    const { activeVideo } = this.state;
    let result;

    if (video && activeVideo) {
      let layerContent;
      if (video.source) {
        layerContent = (
          <Video>
            <source src={video.source} type={`video/${video.type}`}/>
          </Video>
        );
      } else {
        layerContent = video;
      }

      result = (
        <Layer onClose={this._onClick} closer={true} flush={true}>
          {layerContent}
        </Layer>
      );
    }

    return result;
  }

  _renderDescription () {
    const { description, textSize } = this.props;
    let result = description;
    if (typeof description === 'string') {
      console.warn(`Grommet Deprecation Notice: Card description's Markdown \
support will be removed in Grommet's next major release.`);
      const components = {
        p: { props: {
          margin: PARAGRAPH_MARGINS[textSize],
          size: PARAGRAPH_SIZES[textSize]
        } }
      };
      result = <Markdown components={components} content={description} />;
    }
    return result;
  }

  render () {
    const { a11yTitle, children, className, contentPad,
      onClick, reverse, truncate } = this.props;
    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    const restProps = Props.omit(this.props, Object.keys(Card.propTypes));

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--selectable`]: (onClick)
      },
      className
    );

    let thumbnail = this._renderThumbnail();
    let label = this._renderLabel();
    let heading = this._renderHeading();
    let description = this._renderDescription();
    let link = this._renderLink();
    let videoLayer = this._renderVideoLayer();

    const contentClasses = classnames(
      {
        [`${CLASS_ROOT}__content`]: true,
        [`${CLASS_ROOT}__content--truncate`]: truncate
      }
    );

    const basis = 'row' === this.props.direction ? '2/3' : undefined;
    const text = (
      <Box className={contentClasses} pad={contentPad}
        basis={basis}>
        {label}
        {heading}
        {description}
        {children}
        {link}
      </Box>
    );

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
      <Box {...boxProps} {...restProps} className={classes} wrap={true}
        justify={cardJustify} onClick={onClick} a11yTitle={a11yTitle}>
        {thumbnail}
        {text}
        {videoLayer}
      </Box>
    );
  }
}

Card.propTypes = {
  contentPad: Box.propTypes.pad,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  headingStrong: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  link: PropTypes.element,
  textSize: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  thumbnail: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  truncate: PropTypes.bool,
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
  a11yTitle: 'Card',
  contentPad: 'medium',
  headingStrong: true,
  textSize: 'small'
};
