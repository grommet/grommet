// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _lodashLangIsEqual = require('lodash/lang/isEqual');

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

var _lodashObjectPick = require('lodash/object/pick');

var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _iconsSpinning = require('./icons/Spinning');

var _iconsSpinning2 = _interopRequireDefault(_iconsSpinning);

var _iconsBaseLinkPrevious = require('./icons/base/LinkPrevious');

var _iconsBaseLinkPrevious2 = _interopRequireDefault(_iconsBaseLinkPrevious);

var _iconsBaseLinkNext = require('./icons/base/LinkNext');

var _iconsBaseLinkNext2 = _interopRequireDefault(_iconsBaseLinkNext);

var _utilsScroll = require('../utils/Scroll');

var _utilsScroll2 = _interopRequireDefault(_utilsScroll);

var _utilsInfiniteScroll = require('../utils/InfiniteScroll');

var _utilsInfiniteScroll2 = _interopRequireDefault(_utilsInfiniteScroll);

var _utilsSelection = require('../utils/Selection');

var _utilsSelection2 = _interopRequireDefault(_utilsSelection);

var CLASS_ROOT = "tiles";
var SELECTED_CLASS = "tile--selected";

var Tiles = (function (_Component) {
  _inherits(Tiles, _Component);

  function Tiles(props) {
    _classCallCheck(this, Tiles);

    _get(Object.getPrototypeOf(Tiles.prototype), 'constructor', this).call(this, props);
    this._onLeft = this._onLeft.bind(this);
    this._onRight = this._onRight.bind(this);
    this._onScrollHorizontal = this._onScrollHorizontal.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      overflow: false,
      selected: _utilsSelection2['default'].normalizeIndexes(props.selected)
    };
  }

  _createClass(Tiles, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setSelection();
      if (this.props.onMore) {
        this._scroll = _utilsInfiniteScroll2['default'].startListeningForScroll(this.refs.more, this.props.onMore);
      }
      if ('row' === this.props.direction) {
        window.addEventListener('resize', this._onResize);
        document.addEventListener('wheel', this._onWheel);
        this._trackHorizontalScroll();
        // give browser a chance to stabilize
        setTimeout(this._layout, 10);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selected) {
        this.setState({ selected: _utilsSelection2['default'].normalizeIndexes(nextProps.selected) });
      }
      if (this._scroll) {
        _utilsInfiniteScroll2['default'].stopListeningForScroll(this._scroll);
        this._scroll = null;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (!(0, _lodashLangIsEqual2['default'])(this.state.selected, prevState.selected)) {
        this._setSelection();
      }
      if (this.props.onMore && !this._scroll) {
        this._scroll = _utilsInfiniteScroll2['default'].startListeningForScroll(this.refs.more, this.props.onMore);
      }
      if ('row' === this.props.direction) {
        this._trackHorizontalScroll();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._scroll) {
        _utilsInfiniteScroll2['default'].stopListeningForScroll(this._scroll);
      }
      if ('row' === this.props.direction) {
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('wheel', this._onWheel);
        if (this._tracking) {
          var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
          tiles.removeEventListener('scroll', this._onScrollHorizontal);
        }
      }
    }
  }, {
    key: '_onLeft',
    value: function _onLeft() {
      var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
      _utilsScroll2['default'].scrollBy(tiles, 'scrollLeft', -tiles.offsetWidth);
    }
  }, {
    key: '_onRight',
    value: function _onRight() {
      var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
      _utilsScroll2['default'].scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
    }
  }, {
    key: '_onScrollHorizontal',
    value: function _onScrollHorizontal() {
      // debounce
      clearTimeout(this._scrollTimer);
      this._scrollTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_onWheel',
    value: function _onWheel(event) {
      if (Math.abs(event.deltaX) > 100) {
        clearInterval(this._scrollTimer);
      } else if (event.deltaX > 5) {
        this._onRight();
      } else if (event.deltaX < -5) {
        this._onLeft();
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      if ('row' === this.props.direction) {
        // determine if we have more tiles than room to fit
        var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
        // 20 is to allow some fuzziness as scrollbars come and go
        this.setState({
          overflow: tiles.scrollWidth > tiles.offsetWidth + 20,
          overflowStart: tiles.scrollLeft <= 20,
          overflowEnd: tiles.scrollLeft >= tiles.scrollWidth - tiles.offsetWidth
        });

        // mark any tiles that might be clipped
        var rect = tiles.getBoundingClientRect();
        var children = tiles.querySelectorAll('.tile');
        for (var i = 0; i < children.length; i += 1) {
          var child = children[i];
          var childRect = child.getBoundingClientRect();
          // 12 accounts for padding
          if (childRect.left + 12 < rect.left || childRect.right - 12 > rect.right) {
            child.classList.add('tile--eclipsed');
          } else {
            child.classList.remove('tile--eclipsed');
          }
        }
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_trackHorizontalScroll',
    value: function _trackHorizontalScroll() {
      if (this.state.overflow && !this._tracking) {
        var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
        tiles.addEventListener('scroll', this._onScrollHorizontal);
        this._tracking = true;
      }
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      _utilsSelection2['default'].setClassFromIndexes({
        containerElement: (0, _reactDom.findDOMNode)(this.refs.tiles),
        childSelector: '.tile',
        selectedClass: SELECTED_CLASS,
        selectedIndexes: this.state.selected
      });
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      if (!this.props.selectable) {
        return;
      }

      var selected = _utilsSelection2['default'].onClick(event, {
        containerElement: (0, _reactDom.findDOMNode)(this.refs.tiles),
        childSelector: '.tile',
        selectedClass: SELECTED_CLASS,
        multiSelect: 'multiple' === this.props.selectable,
        priorSelectedIndexes: this.state.selected
      });
      // only set the selected state and classes if the caller isn't managing it.
      if (!this.props.selected) {
        this.setState({ selected: selected }, this._setSelection);
      }

      if (this.props.onSelect) {
        // notify caller that the selection has changed
        if (selected.length === 1) {
          selected = selected[0];
        }
        this.props.onSelect(selected);
      }
    }

    // children should be an array of Tile
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.fill) {
        classes.push(CLASS_ROOT + "--fill");
      }
      if (this.props.flush) {
        classes.push(CLASS_ROOT + "--flush");
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      }
      if (this.props.selectable) {
        classes.push(CLASS_ROOT + "--selectable");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var other = (0, _lodashObjectPick2['default'])(this.props, (0, _lodashObjectKeys2['default'])(_Box2['default'].propTypes));

      var more = null;
      if (this.props.onMore) {
        classes.push(CLASS_ROOT + "--moreable");
        more = _react2['default'].createElement(
          'div',
          { ref: 'more', className: CLASS_ROOT + "__more" },
          _react2['default'].createElement(_iconsSpinning2['default'], null)
        );
      }

      var contents = _react2['default'].createElement(
        _Box2['default'],
        _extends({ ref: 'tiles' }, other, {
          wrap: this.props.direction ? false : true,
          direction: this.props.direction ? this.props.direction : 'row',
          className: classes.join(' '),
          onClick: this._onClick }),
        this.props.children,
        more
      );

      if (this.state.overflow) {
        classes.push(CLASS_ROOT + "--overflowed");
        if (!this.state.overflowStart) {
          var left = _react2['default'].createElement(
            _Button2['default'],
            { className: CLASS_ROOT + "__left", type: 'icon',
              onClick: this._onLeft },
            _react2['default'].createElement(_iconsBaseLinkPrevious2['default'], null)
          );
        }
        if (!this.state.overflowEnd) {
          var right = _react2['default'].createElement(
            _Button2['default'],
            { className: CLASS_ROOT + "__right", type: 'icon',
              onClick: this._onRight },
            _react2['default'].createElement(_iconsBaseLinkNext2['default'], null)
          );
        }

        contents = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__container" },
          left,
          contents,
          right
        );
      }

      return contents;
    }
  }]);

  return Tiles;
})(_react.Component);

exports['default'] = Tiles;

Tiles.propTypes = _extends({
  fill: _react.PropTypes.bool,
  flush: _react.PropTypes.bool,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2['default'].propTypes);

Tiles.defaultProps = {
  flush: true,
  justify: 'start'
};
module.exports = exports['default'];