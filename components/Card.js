'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _Paragraph = require('./Paragraph');

var _Paragraph2 = _interopRequireDefault(_Paragraph);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _CirclePlay = require('./icons/base/CirclePlay');

var _CirclePlay2 = _interopRequireDefault(_CirclePlay);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CARD;

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
  _inherits(Card, _Component);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    _this._onResponsive = _this._onResponsive.bind(_this);
    _this.state = { activeVideo: false, small: false };
    return _this;
  }

  _createClass(Card, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._responsive = _Responsive2.default.start(this._onResponsive);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._responsive) {
        this._responsive.stop();
      }
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      this.setState({ small: !!small });
    }
  }, {
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
          direction = _props3.direction,
          thumbnail = _props3.thumbnail,
          video = _props3.video;
      var small = this.state.small;

      var result = thumbnail;
      if (typeof thumbnail === 'string') {
        var size = small ? 'large' : 'xlarge';
        var videoIcon = video ? _react2.default.createElement(_Anchor2.default, { icon: _react2.default.createElement(_CirclePlay2.default, { responsive: false,
            colorIndex: 'brand', size: size }) }) : undefined;

        var flex = 'row' === direction ? 'grow' : undefined;

        result = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__thumbnail', flex: flex,
            backgroundImage: 'url(' + thumbnail + ')', basis: 'small',
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
        result = _react2.default.createElement(
          _Paragraph2.default,
          {
            margin: PARAGRAPH_MARGINS[textSize],
            size: PARAGRAPH_SIZES[textSize]
          },
          description
        );
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
          truncate = _props5.truncate;

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));
      var restProps = _Props2.default.omit(this.props, Object.keys(Card.propTypes));

      var classes = (0, _classnames4.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--selectable', onClick), className);

      var thumbnail = this._renderThumbnail();
      var label = this._renderLabel();
      var heading = this._renderHeading();
      var description = this._renderDescription();
      var link = this._renderLink();
      var videoLayer = this._renderVideoLayer();

      var contentClasses = (0, _classnames4.default)((_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '__content', true), _defineProperty(_classnames2, CLASS_ROOT + '__content--truncate', truncate), _classnames2));

      var basis = 'row' === this.props.direction ? '2/3' : undefined;
      var text = _react2.default.createElement(
        _Box2.default,
        { className: contentClasses, pad: contentPad,
          basis: basis },
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
        _extends({}, boxProps, restProps, { className: classes, wrap: true,
          justify: cardJustify, onClick: onClick, a11yTitle: a11yTitle }),
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


Card.propTypes = _extends({
  contentPad: _Box2.default.propTypes.pad,
  description: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  heading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  headingStrong: _propTypes2.default.bool,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  link: _propTypes2.default.element,
  textSize: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  thumbnail: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  truncate: _propTypes2.default.bool,
  video: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    source: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string
  }), _propTypes2.default.element])
}, _Box2.default.propTypes);

Card.defaultProps = {
  a11yTitle: 'Card',
  contentPad: 'medium',
  headingStrong: true,
  textSize: 'small'
};
module.exports = exports['default'];