// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _iconsSpinning = require('./icons/Spinning');

var _iconsSpinning2 = _interopRequireDefault(_iconsSpinning);

var _utilsInfiniteScroll = require('../utils/InfiniteScroll');

var _utilsInfiniteScroll2 = _interopRequireDefault(_utilsInfiniteScroll);

var CLASS_ROOT = "list";

var List = (function (_Component) {
  _inherits(List, _Component);

  function List() {
    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this);

    this._onClickItem = this._onClickItem.bind(this);
  }

  _createClass(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onMore) {
        this._scroll = _utilsInfiniteScroll2['default'].startListeningForScroll(this.refs.more, this.props.onMore);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this._scroll) {
        _utilsInfiniteScroll2['default'].stopListeningForScroll(this._scroll);
        this._scroll = null;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.onMore && !this._scroll) {
        this._scroll = _utilsInfiniteScroll2['default'].startListeningForScroll(this.refs.more, this.props.onMore);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._scroll) {
        _utilsInfiniteScroll2['default'].stopListeningForScroll(this._scroll);
      }
    }
  }, {
    key: '_onClickItem',
    value: function _onClickItem(item) {
      if (this.props.onSelect) {
        this.props.onSelect(item);
      }
    }
  }, {
    key: '_renderValue',
    value: function _renderValue(item, scheme) {
      var result;
      var value = item[scheme.attribute] || scheme['default'];
      if (scheme.image) {
        if (typeof value === 'string') {
          result = _react2['default'].createElement('img', { src: value, alt: scheme.label || 'image' });
        } else {
          result = value;
        }
      } else if (scheme.timestamp) {
        result = _react2['default'].createElement(_reactIntl.FormattedTime, { value: value,
          day: 'numeric',
          month: 'narrow',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit' });
      } else {
        result = value;
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (true || this.props.fill) {
        classes.push(CLASS_ROOT + "--fill");
      }
      if (true || this.props.flush) {
        classes.push(CLASS_ROOT + "--flush");
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var items = this.props.data.map(function (item) {
        var uid;
        var image;
        var primary;
        var secondary;
        var selected;
        var onClick;

        this.props.schema.forEach(function (scheme) {
          if (scheme.image) {
            image = this._renderValue(item, scheme);
          } else if (scheme.primary) {
            primary = this._renderValue(item, scheme);
          } else if (scheme.secondary) {
            secondary = this._renderValue(item, scheme);
          }
          if (scheme.uid) {
            uid = item[scheme.attribute];
            if (uid === this.props.selected) {
              selected = true;
            }
          }
        }, this);

        if (this.props.onSelect) {
          onClick = this._onClickItem.bind(this, item);
        }

        return _react2['default'].createElement(_ListItem2['default'], { key: uid, image: image, label: primary,
          annotation: secondary, selected: selected,
          direction: this.props.itemDirection, onClick: onClick });
      }, this);

      var more;
      if (this.props.onMore) {
        classes.push(CLASS_ROOT + "--moreable");
        more = _react2['default'].createElement(
          'li',
          { ref: 'more', className: CLASS_ROOT + "__more" },
          _react2['default'].createElement(_iconsSpinning2['default'], null)
        );
      }

      var empty;
      if (this.props.data.length === 0) {
        empty = _react2['default'].createElement(
          'li',
          { className: CLASS_ROOT + "__empty" },
          this.props.emptyIndicator
        );
      }

      return _react2['default'].createElement(
        'ul',
        { className: classes.join(' ') },
        empty,
        items,
        more
      );
    }
  }]);

  return List;
})(_react.Component);

exports['default'] = List;

List.propTypes = {
  data: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
  emptyIndicator: _react.PropTypes.node,
  itemDirection: _react.PropTypes.oneOf(['row', 'column']),
  large: _react.PropTypes.bool,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  schema: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    attribute: _react.PropTypes.string,
    'default': _react.PropTypes.node,
    image: _react.PropTypes.bool,
    label: _react.PropTypes.string,
    primary: _react.PropTypes.bool,
    secondary: _react.PropTypes.bool,
    timestamp: _react.PropTypes.bool,
    uid: _react.PropTypes.bool
  })).isRequired,
  selected: _react.PropTypes.oneOfType([_react.PropTypes.string, // uid
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  small: _react.PropTypes.bool
};

List.defaultProps = {
  small: false,
  itemDirection: 'row'
};
module.exports = exports['default'];