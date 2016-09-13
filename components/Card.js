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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

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

var _Paragraph = require('./Paragraph');

var _Paragraph2 = _interopRequireDefault(_Paragraph);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Watch = require('./icons/base/Watch');

var _Watch2 = _interopRequireDefault(_Watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CARD;
var TEXT_OPTIONS = {
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
    key: '_renderLink',
    value: function _renderLink() {
      var link = this.props.link;

      var result = void 0;
      if (link) {
        result = _react2.default.createElement(
          _Box2.default,
          { pad: { vertical: "small" } },
          link
        );
      }
      return result;
    }
  }, {
    key: '_renderVideo',
    value: function _renderVideo() {
      var video = this.props.video;
      var activeVideo = this.state.activeVideo;

      var layerContent = void 0;
      var videoLayer = void 0;

      if (video && activeVideo) {
        if (video.source) {
          layerContent = _react2.default.createElement(
            _Video2.default,
            null,
            _react2.default.createElement('source', { src: video.source, type: 'video/' + video.type })
          );
        } else {
          layerContent = video;
        }

        videoLayer = _react2.default.createElement(
          _Layer2.default,
          { onClose: this._onClick, closer: true, flush: true },
          layerContent
        );
      }

      return videoLayer;
    }
  }, {
    key: '_renderDescription',
    value: function _renderDescription(description, textSize) {
      var _this2 = this;

      var key = arguments.length <= 2 || arguments[2] === undefined ? "0" : arguments[2];

      var result = void 0;
      if (Array.isArray(description)) {
        result = contents.map(function (item, index) {
          return _this2._renderDescription(item, textSize, index);
        });
      }
      if (typeof description === 'string') {
        result = _react2.default.createElement(
          _Paragraph2.default,
          { key: key, className: CLASS_ROOT + '__description',
            size: textSize },
          description
        );
      } else {
        result = description;
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var contentPad = _props.contentPad;
      var description = _props.description;
      var direction = _props.direction;
      var heading = _props.heading;
      var headingStrong = _props.headingStrong;
      var label = _props.label;
      var onClick = _props.onClick;
      var reverse = _props.reverse;
      var textSize = _props.textSize;
      var thumbnail = _props.thumbnail;
      var video = _props.video;

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--direction-' + direction, direction), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', onClick || video), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + textSize, textSize), _classnames), className);

      var onCardClick = onClick;
      if (!onCardClick && video) {
        onCardClick = this._onClick;
      }

      var options = TEXT_OPTIONS[textSize];

      var labelContent = void 0;
      if (label) {
        labelContent = _react2.default.createElement(
          _Label2.default,
          { className: CLASS_ROOT + '__label',
            size: options.label, margin: 'none', uppercase: true },
          label
        );
      }

      var headingContent = void 0;
      if (heading) {
        headingContent = _react2.default.createElement(
          _Heading2.default,
          { className: CLASS_ROOT + '__heading',
            tag: options.heading, strong: headingStrong },
          heading
        );
      }

      var textContainer = _react2.default.createElement(
        _Box2.default,
        { className: CLASS_ROOT + '__content', pad: contentPad },
        labelContent,
        headingContent,
        this._renderDescription(description, options.description),
        children,
        this._renderLink()
      );

      var thumbnailContainer = void 0;
      if (thumbnail) {
        var basis = 'row' === this.props.direction ? '1/3' : 'small';
        thumbnailContainer = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__thumbnail',
            backgroundImage: 'url(' + thumbnail + ')', basis: basis, flex: false,
            justify: 'center', align: 'center' },
          video ? _react2.default.createElement(_Anchor2.default, { icon: _react2.default.createElement(_Watch2.default, { size: 'xlarge' }) }) : null
        );
      }

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
        (0, _extends3.default)({}, boxProps, { className: classes, justify: cardJustify,
          onClick: onCardClick }),
        thumbnailContainer,
        textContainer,
        this._renderVideo()
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
  description: _react.PropTypes.node,
  heading: _react.PropTypes.node,
  headingStrong: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  link: _react.PropTypes.element,
  textSize: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  thumbnail: _react.PropTypes.string,
  video: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    source: _react.PropTypes.string.isRequired,
    type: _react.PropTypes.string
  }), _react.PropTypes.element])
}, _Box2.default.propTypes);

Card.defaultProps = {
  colorIndex: 'light-1',
  contentPad: 'medium',
  headingStrong: true,
  textSize: 'medium'
};
module.exports = exports['default'];