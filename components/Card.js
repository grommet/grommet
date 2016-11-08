'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _Heading = require('./Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Headline = require('./Headline');

var _Headline2 = _interopRequireDefault(_Headline);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _CirclePlay = require('./icons/base/CirclePlay');

var _CirclePlay2 = _interopRequireDefault(_CirclePlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CARD; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var LABEL_SIZES = {
  xlarge: 'medium',
  large: 'medium',
  medium: 'medium',
  small: 'medium',
  xsmall: 'small'
};

var HEADLINE_SIZES = {
  xlarge: 'medium',
  large: 'medium'
};

var HEADING_TAGS = {
  medium: 'h1',
  small: 'h2',
  xsmall: 'h3'
};

var PARAGRAPH_SIZES = {
  xlarge: 'xlarge',
  large: 'xlarge',
  medium: 'large',
  small: 'large',
  xsmall: 'medium'
};

var PARAGRAPH_MARGINS = {
  xlarge: 'large',
  large: 'large',
  medium: 'medium',
  small: 'medium',
  xsmall: 'small'
};

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card(props) {
    (0, _classCallCheck3.default)(this, Card);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    _this.state = { activeVideo: false };
    return _this;
  }

  (0, _createClass3.default)(Card, [{
    key: '_onClick',
    value: function _onClick(event) {
      var video = this.props.video;

      if (video) {
        event.preventDefault();
        this.setState({ activeVideo: !this.state.activeVideo });
      }
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel() {
      var _props = this.props,
          label = _props.label,
          textSize = _props.textSize;

      var result = label;
      if (typeof label === 'string') {
        result = _react2.default.createElement(
          _Label2.default,
          { size: LABEL_SIZES[textSize], margin: 'none', uppercase: true },
          label
        );
      }
      return result;
    }
  }, {
    key: '_renderHeading',
    value: function _renderHeading() {
      var _props2 = this.props,
          heading = _props2.heading,
          headingStrong = _props2.headingStrong,
          textSize = _props2.textSize;

      var result = heading;
      if (typeof heading === 'string') {
        if (HEADLINE_SIZES[textSize]) {
          result = _react2.default.createElement(
            _Headline2.default,
            { size: HEADLINE_SIZES[textSize], strong: headingStrong },
            heading
          );
        } else {
          result = _react2.default.createElement(
            _Heading2.default,
            { tag: HEADING_TAGS[textSize], strong: headingStrong },
            heading
          );
        }
      }
      return result;
    }
  }, {
    key: '_renderLink',
    value: function _renderLink() {
      var link = this.props.link;

      return link;
    }
  }, {
    key: '_renderThumbnail',
    value: function _renderThumbnail() {
      var _props3 = this.props,
          thumbnail = _props3.thumbnail,
          video = _props3.video;

      var result = thumbnail;
      if (typeof thumbnail === 'string') {
        var basis = 'row' === this.props.direction ? '1/3' : 'small';
        var videoIcon = video ? _react2.default.createElement(_Anchor2.default, { icon: _react2.default.createElement(_CirclePlay2.default, { responsive: false, colorIndex: 'brand',
            size: 'xlarge' }) }) : undefined;

        result = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__thumbnail',
            backgroundImage: 'url(' + thumbnail + ')', basis: basis, flex: false,
            justify: 'center', align: 'center' },
          videoIcon
        );
      }
      return result;
    }
  }, {
    key: '_renderVideoLayer',
    value: function _renderVideoLayer() {
      var video = this.props.video;
      var activeVideo = this.state.activeVideo;

      var result = void 0;

      if (video && activeVideo) {
        var layerContent = void 0;
        if (video.source) {
          layerContent = _react2.default.createElement(
            _Video2.default,
            null,
            _react2.default.createElement('source', { src: video.source, type: 'video/' + video.type })
          );
        } else {
          layerContent = video;
        }

        result = _react2.default.createElement(
          _Layer2.default,
          { onClose: this._onClick, closer: true, flush: true },
          layerContent
        );
      }

      return result;
    }
  }, {
    key: '_renderDescription',
    value: function _renderDescription() {
      var _props4 = this.props,
          description = _props4.description,
          textSize = _props4.textSize;

      var result = description;
      if (typeof description === 'string') {
        var components = {
          p: { props: {
              margin: PARAGRAPH_MARGINS[textSize],
              size: PARAGRAPH_SIZES[textSize]
            } }
        };
        result = _react2.default.createElement(_Markdown2.default, { components: components, content: description });
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2;

      var _props5 = this.props,
          a11yTitle = _props5.a11yTitle,
          children = _props5.children,
          className = _props5.className,
          contentPad = _props5.contentPad,
          onClick = _props5.onClick,
          reverse = _props5.reverse,
          truncate = _props5.truncate,
          video = _props5.video;

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Card.propTypes));

      var classes = (0, _classnames4.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--selectable', onClick || video), className);

      var onCardClick = onClick;
      if (!onCardClick && video) {
        onCardClick = this._onClick;
      }

      var thumbnail = this._renderThumbnail();
      var label = this._renderLabel();
      var heading = this._renderHeading();
      var description = this._renderDescription();
      var link = this._renderLink();
      var videoLayer = this._renderVideoLayer();

      var contentClasses = (0, _classnames4.default)((_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__content', true), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__content--truncate', truncate), _classnames2));

      var text = _react2.default.createElement(
        _Box2.default,
        { className: contentClasses, flex: true, pad: contentPad },
        label,
        heading,
        description,
        children,
        link
      );

      var cardJustify = void 0;
      if (reverse) {
        // align thumbnail to bottom/right of card for bottom cardPlacement
        cardJustify = 'between';
      }

      if (!this.props.size) {
        if (this.props.direction === 'row') {
          boxProps.size = { width: 'xlarge' };
        } else {
          boxProps.size = { width: 'medium' };
        }
      }

      return _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, boxProps, restProps, { className: classes,
          justify: cardJustify, onClick: onCardClick, a11yTitle: a11yTitle }),
        thumbnail,
        text,
        videoLayer
      );
    }
  }]);
  return Card;
}(_react.Component);

Card.displayName = 'Card';
exports.default = Card;
;

Card.propTypes = (0, _extends3.default)({
  contentPad: _Box2.default.propTypes.pad,
  description: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  heading: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  headingStrong: _react.PropTypes.bool,
  label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  link: _react.PropTypes.element,
  textSize: _react.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  thumbnail: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  truncate: _react.PropTypes.bool,
  video: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    source: _react.PropTypes.string.isRequired,
    type: _react.PropTypes.string
  }), _react.PropTypes.element])
}, _Box2.default.propTypes);

Card.defaultProps = {
  a11yTitle: 'Card',
  contentPad: 'medium',
  headingStrong: true,
  textSize: 'small'
};
module.exports = exports['default'];