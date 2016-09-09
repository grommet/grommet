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

var _Tile = require('./Tile');

var _Tile2 = _interopRequireDefault(_Tile);

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

var CLASS_ROOT = _CSSClassnames2.default.CARD; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var TEXT_TAGS = {
  xlarge: {
    label: 'large',
    heading: 'h1',
    text: 'large'
  },
  large: {
    label: 'medium',
    heading: 'h1',
    text: 'large'
  },
  medium: {
    label: 'medium',
    heading: 'h2',
    text: 'medium'
  },
  small: {
    label: 'small',
    heading: 'h3',
    text: 'small'
  }
};

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card(props) {
    (0, _classCallCheck3.default)(this, Card);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    _this.state = {
      activeVideo: false
    };
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


      if (link) {
        return _react2.default.createElement(
          _Box2.default,
          { pad: { vertical: "small" } },
          link
        );
      }

      return null;
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
    key: '_renderParagraph',
    value: function _renderParagraph(contents, textSize, type) {
      if (typeof contents === 'string') {
        return _react2.default.createElement(
          _Paragraph2.default,
          {
            className: CLASS_ROOT + '__' + type,
            size: textSize,
            margin: 'none'
          },
          contents
        );
      } else if (Array.isArray(contents)) {
        return contents.map(function (content, index) {
          return _react2.default.createElement(
            _Paragraph2.default,
            {
              key: type + '_' + index,
              className: CLASS_ROOT + '__' + type,
              size: textSize,
              margin: 'none'
            },
            content
          );
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var contentPad = _props.contentPad;
      var description = _props.description;
      var direction = _props.direction;
      var heading = _props.heading;
      var headingStrong = _props.headingStrong;
      var label = _props.label;
      var onClick = _props.onClick;
      var pad = _props.pad;
      var reverse = _props.reverse;
      var text = _props.text;
      var textSize = _props.textSize;
      var thumbnail = _props.thumbnail;
      var video = _props.video;

      var tileProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Tile2.default.propTypes));
      delete tileProps.colorIndex;
      delete tileProps.onClick;
      delete tileProps.pad;

      if (description) {
        console.warn('\'description\' prop has been renamed to \'text\'.' + ' Support for \'description\' will be removed in a future release.');
      }

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--direction-' + direction, direction), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', onClick || video), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + textSize, textSize), _classnames), className);

      var onCardClick = onClick;
      if (!onCardClick && video) {
        onCardClick = this._onClick;
      }

      var tag = TEXT_TAGS[textSize];

      var contentContainer = _react2.default.createElement(
        _Box2.default,
        { className: CLASS_ROOT + '__content', pad: contentPad },
        label && _react2.default.createElement(
          _Label2.default,
          { className: CLASS_ROOT + '__label',
            size: tag.label, margin: 'none', uppercase: true },
          label
        ),
        heading && _react2.default.createElement(
          _Heading2.default,
          { className: CLASS_ROOT + '__heading',
            tag: tag.heading, strong: headingStrong, margin: 'none' },
          heading
        ),
        this._renderParagraph(text || description, tag.text, 'text'),
        children,
        this._renderLink()
      );

      var thumbnailContainer = void 0;
      if (thumbnail) {
        thumbnailContainer = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__thumbnail',
            backgroundImage: 'url(' + thumbnail + ')',
            justify: 'center', align: 'center' },
          video ? _react2.default.createElement(_Anchor2.default, { icon: _react2.default.createElement(_Watch2.default, { size: 'xlarge' }) }) : null
        );
      }

      var first = thumbnailContainer;
      var second = contentContainer;
      var cardJustify = void 0;

      if (reverse) {
        first = contentContainer;
        second = thumbnailContainer;
        // align thumbnail to bottom of card for bottom cardPlacement
        cardJustify = 'between';
      }

      var cardPad = 'small';
      var cardFull = void 0;
      if (direction === 'row') {
        cardPad = { vertical: 'small' };
        cardFull = 'horizontal';
      }

      return _react2.default.createElement(
        _Tile2.default,
        (0, _extends3.default)({ className: classes, onClick: onCardClick,
          pad: pad || cardPad }, tileProps),
        _react2.default.createElement(
          _Box2.default,
          { className: 'flex', direction: direction, justify: cardJustify,
            full: cardFull, colorIndex: colorIndex },
          first,
          second,
          this._renderVideo()
        )
      );
    }
  }]);
  return Card;
}(_react.Component);

Card.displayName = 'Card';
exports.default = Card;
;

Card.propTypes = (0, _extends3.default)({
  contentPad: _react.PropTypes.oneOf(['small', 'medium', 'large', 'none']),
  description: _react.PropTypes.string,
  heading: _react.PropTypes.string,
  headingStrong: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  link: _react.PropTypes.element,
  onClick: _react.PropTypes.func,
  reverse: _react.PropTypes.bool,
  text: _react.PropTypes.node,
  textSize: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  thumbnail: _react.PropTypes.string,
  video: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    source: _react.PropTypes.string.isRequired,
    type: _react.PropTypes.string
  }), _react.PropTypes.element])
}, _Tile2.default.propTypes);

Card.defaultProps = {
  colorIndex: 'light-1',
  direction: 'column',
  headingStrong: true,
  textSize: 'medium'
};
module.exports = exports['default'];