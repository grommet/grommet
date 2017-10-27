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

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Spinning = require('./icons/Spinning');

var _Spinning2 = _interopRequireDefault(_Spinning);

var _Scroll = require('../utils/Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _InfiniteScroll = require('../utils/InfiniteScroll');

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _Selection = require('../utils/Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TILES;
var TILE = _CSSClassnames2.default.TILE;
var SELECTED_CLASS = TILE + '--selected';
var ACTIVE_CLASS = TILE + '--active';

var Tiles = function (_Component) {
  _inherits(Tiles, _Component);

  function Tiles(props, context) {
    _classCallCheck(this, Tiles);

    var _this = _possibleConstructorReturn(this, (Tiles.__proto__ || Object.getPrototypeOf(Tiles)).call(this, props, context));

    _this._onLeft = _this._onLeft.bind(_this);
    _this._onRight = _this._onRight.bind(_this);
    _this._onScrollHorizontal = _this._onScrollHorizontal.bind(_this);
    _this._onWheel = _this._onWheel.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onClick = _this._onClick.bind(_this);
    _this._fireClick = _this._fireClick.bind(_this);
    _this._announceTile = _this._announceTile.bind(_this);
    _this._onPreviousTile = _this._onPreviousTile.bind(_this);
    _this._onNextTile = _this._onNextTile.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);

    _this.state = {
      activeTile: undefined,
      mouseActive: false,
      overflow: false,
      selected: _Selection2.default.normalizeIndexes(props.selected)
    };
    return _this;
  }

  _createClass(Tiles, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          direction = _props.direction,
          onMore = _props.onMore,
          selectable = _props.selectable;

      if (onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      if ('row' === direction) {
        window.addEventListener('resize', this._onResize);
        document.addEventListener('wheel', this._onWheel, { passive: true });
        this._trackHorizontalScroll();
        // give browser a chance to stabilize
        this._layoutTimer = setTimeout(this._layout, 10);
      }
      if (selectable) {
        // only listen for navigation keys if the tile row can be selected
        this._keyboardHandlers = {
          left: this._onPreviousTile,
          up: this._onPreviousTile,
          right: this._onNextTile,
          down: this._onNextTile,
          enter: this._onEnter,
          space: this._onEnter
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selected !== undefined) {
        this.setState({
          selected: _Selection2.default.normalizeIndexes(nextProps.selected)
        });
      }
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
        this._scroll = undefined;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          direction = _props2.direction,
          onMore = _props2.onMore,
          selectable = _props2.selectable;

      if (onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      if ('row' === direction) {
        this._trackHorizontalScroll();
        // give browser a chance to stabilize
        this._layoutTimer = setTimeout(this._layout, 10);
      }
      if (selectable) {
        // only listen for navigation keys if the list row can be selected
        this._keyboardHandlers = {
          left: this._onPreviousTile,
          up: this._onPreviousTile,
          right: this._onNextTile,
          down: this._onNextTile,
          enter: this._onEnter,
          space: this._onEnter
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props3 = this.props,
          direction = _props3.direction,
          selectable = _props3.selectable;

      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
      }
      if ('row' === direction) {
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('wheel', this._onWheel);
        if (this._tracking) {
          var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
          tiles.removeEventListener('scroll', this._onScrollHorizontal);
        }
      }
      if (selectable) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      }
      if (this._layoutTimer) {
        clearTimeout(this._layoutTimer);
      }
    }
  }, {
    key: '_announceTile',
    value: function _announceTile(label) {
      var intl = this.context.intl;

      var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
      // avoid a long text to be read by the screen reader
      var labelMessage = label.length > 15 ? label.substring(0, 15) + '...' : label;
      (0, _Announcer.announce)(labelMessage + ' ' + enterSelectMessage);
    }
  }, {
    key: '_onPreviousTile',
    value: function _onPreviousTile(event) {
      var _this2 = this;

      if ((0, _reactDom.findDOMNode)(this.tilesRef).contains(document.activeElement)) {
        event.preventDefault();
        var activeTile = this.state.activeTile;

        var rows = (0, _reactDom.findDOMNode)(this.tilesRef).querySelectorAll('.' + TILE);
        if (rows && rows.length > 0) {
          if (activeTile === undefined) {
            rows[0].classList.add(ACTIVE_CLASS);
            this.setState({ activeTile: 0 }, function () {
              _this2._announceTile(rows[_this2.state.activeTile].innerText);
            });
          } else if (activeTile - 1 >= 0) {
            rows[activeTile].classList.remove(ACTIVE_CLASS);
            rows[activeTile - 1].classList.add(ACTIVE_CLASS);
            this.setState({ activeTile: activeTile - 1 }, function () {
              _this2._announceTile(rows[_this2.state.activeTile].innerText);
            });
          }
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_onNextTile',
    value: function _onNextTile(event) {
      var _this3 = this;

      if ((0, _reactDom.findDOMNode)(this.tilesRef).contains(document.activeElement)) {
        event.preventDefault();
        var activeTile = this.state.activeTile;

        var rows = (0, _reactDom.findDOMNode)(this.tilesRef).querySelectorAll('.' + TILE);
        if (rows && rows.length > 0) {
          if (activeTile === undefined) {
            rows[0].classList.add(ACTIVE_CLASS);
            this.setState({ activeTile: 0 }, function () {
              _this3._announceTile(rows[_this3.state.activeTile].innerText);
            });
          } else if (activeTile + 1 <= rows.length - 1) {
            rows[activeTile].classList.remove(ACTIVE_CLASS);
            rows[activeTile + 1].classList.add(ACTIVE_CLASS);
            this.setState({ activeTile: activeTile + 1 }, function () {
              _this3._announceTile(rows[_this3.state.activeTile].innerText);
            });
          }
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_fireClick',
    value: function _fireClick(element, shiftKey) {
      var event = void 0;
      try {
        event = new MouseEvent('click', {
          'bubbles': true,
          'cancelable': true,
          'shiftKey': shiftKey
        });
      } catch (e) {
        // IE11 workaround.
        event = document.createEvent('Event');
        event.initEvent('click', true, true);
      }
      // We use dispatchEvent to have the browser fill out the event fully.
      element.dispatchEvent(event);
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      var activeTile = this.state.activeTile;
      var intl = this.context.intl;

      if ((0, _reactDom.findDOMNode)(this.tilesRef).contains(document.activeElement) && activeTile !== undefined) {
        var rows = (0, _reactDom.findDOMNode)(this.tilesRef).querySelectorAll('.' + TILE);
        this._fireClick(rows[activeTile], event.shiftKey);
        rows[activeTile].classList.remove(ACTIVE_CLASS);
        var label = rows[activeTile].innerText;
        // avoid a long text to be read by the screen reader
        var labelMessage = label.length > 15 ? label.substring(0, 15) + '...' : label;
        var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
        (0, _Announcer.announce)(labelMessage + ' ' + selectedMessage);
      }
    }
  }, {
    key: '_onLeft',
    value: function _onLeft() {
      var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
      _Scroll2.default.scrollBy(tiles, 'scrollLeft', -tiles.offsetWidth);
    }
  }, {
    key: '_onRight',
    value: function _onRight() {
      var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
      _Scroll2.default.scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
    }
  }, {
    key: '_onScrollHorizontal',
    value: function _onScrollHorizontal() {
      // debounce
      clearTimeout(this._layoutTimer);
      this._layoutTimer = setTimeout(this._layout, 50);
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
      var direction = this.props.direction;


      if ('row' === direction) {
        // determine if we have more tiles than room to fit
        var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);

        // 20 is to allow some fuzziness as scrollbars come and go
        var newState = {
          overflow: tiles.scrollWidth > tiles.offsetWidth + 20,
          overflowStart: tiles.scrollLeft <= 20,
          overflowEnd: tiles.scrollLeft >= tiles.scrollWidth - tiles.offsetWidth,
          scrollWidth: tiles.scrollWidth
        };

        var state = {
          overflow: this.state.overflow,
          overflowStart: this.state.overflowStart,
          overflowEnd: this.state.overflowEnd,
          scrollWidth: this.state.scrollWidth
        };

        // Shallow compare states.
        if (JSON.stringify(newState) !== JSON.stringify(state)) {
          this.setState(_extends({}, newState));
        }

        // mark any tiles that might be clipped
        var rect = tiles.getBoundingClientRect();
        var children = tiles.querySelectorAll('.' + TILE);

        Array.from(children).map(function (child, index) {
          var childRect = child.getBoundingClientRect();
          // 12 accounts for padding
          if (childRect.left + 12 < rect.left || childRect.right - 12 > rect.right) {
            child.classList.add(TILE + '--eclipsed');
          } else {
            child.classList.remove(TILE + '--eclipsed');
          }
        });
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._layoutTimer);
      this._layoutTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_trackHorizontalScroll',
    value: function _trackHorizontalScroll() {
      var overflow = this.state.overflow;

      if (overflow && !this._tracking) {
        var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
        tiles.addEventListener('scroll', this._onScrollHorizontal);
        this._tracking = true;
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      var _props4 = this.props,
          onSelect = _props4.onSelect,
          selectable = _props4.selectable,
          selected = _props4.selected;

      var selection = _Selection2.default.onClick(event, {
        containerElement: (0, _reactDom.findDOMNode)(this.tilesRef),
        childSelector: '.' + TILE,
        selectedClass: SELECTED_CLASS,
        multiSelect: 'multiple' === selectable,
        priorSelectedIndexes: this.state.selected
      });
      // only set the selected state and classes if the caller isn't managing it.
      if (selected === undefined) {
        this.setState({ selected: selection });
      }

      if (onSelect) {
        onSelect(selection.length === 1 ? selection[0] : selection);
      }
    }
  }, {
    key: '_renderChild',
    value: function _renderChild(element, elementIndex) {
      var flush = this.props.flush;
      var selectedArray = this.state.selected;

      var selected = element.props.selected;

      if (selectedArray && selectedArray.indexOf(elementIndex) > -1) {
        selected = true;
      }

      if (element) {
        // only clone tile children
        if (element.type && element.type._tile) {
          var elementClone = _react2.default.cloneElement(element, {
            hoverBorder: !flush,
            selected: selected
          });

          return elementClone;
        }
        return element;
      }

      return undefined;
    }

    // children should be an array of Tile

  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this4 = this;

      var _props5 = this.props,
          a11yTitle = _props5.a11yTitle,
          className = _props5.className,
          children = _props5.children,
          direction = _props5.direction,
          fill = _props5.fill,
          flush = _props5.flush,
          _onBlur = _props5.onBlur,
          _onFocus = _props5.onFocus,
          onMore = _props5.onMore,
          _onMouseDown = _props5.onMouseDown,
          _onMouseUp = _props5.onMouseUp,
          selectable = _props5.selectable;
      var _state = this.state,
          activeTile = _state.activeTile,
          focus = _state.focus,
          mouseActive = _state.mouseActive,
          overflow = _state.overflow,
          overflowEnd = _state.overflowEnd,
          overflowStart = _state.overflowStart;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--fill', fill), _defineProperty(_classnames, CLASS_ROOT + '--flush', flush), _defineProperty(_classnames, CLASS_ROOT + '--focus', focus), _defineProperty(_classnames, CLASS_ROOT + '--selectable', selectable), _defineProperty(_classnames, CLASS_ROOT + '--moreable', onMore), _defineProperty(_classnames, CLASS_ROOT + '--overflowed', overflow), _classnames), className);

      var other = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));

      var more = void 0;
      if (onMore) {
        more = _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this4.moreRef = _ref;
            }, className: CLASS_ROOT + '__more' },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      var tileContents = _react.Children.toArray(children).filter(function (child) {
        return child;
      }).map(function (element, index) {
        return _this4._renderChild(element, index);
      });

      var selectableProps = void 0;
      if (selectable) {
        var multiSelectMessage = selectable === 'multiple' ? '(' + _Intl2.default.getMessage(intl, 'Multi Select') + ')' : '';
        var tilesMessage = a11yTitle || _Intl2.default.getMessage(intl, 'Tiles');
        var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');
        selectableProps = {
          'aria-label': tilesMessage + ' ' + multiSelectMessage + ' ' + navigationHelpMessage,
          tabIndex: '0',
          onClick: this._onClick,
          onMouseDown: function onMouseDown(event) {
            _this4.setState({ mouseActive: true });
            if (_onMouseDown) {
              _onMouseDown(event);
            }
          },
          onMouseUp: function onMouseUp(event) {
            _this4.setState({ mouseActive: false });
            if (_onMouseUp) {
              _onMouseUp(event);
            }
          },
          onFocus: function onFocus(event) {
            if (mouseActive === false) {
              _this4.setState({ focus: true });
            }
            if (_onFocus) {
              _onFocus(event);
            }
          },
          onBlur: function onBlur(event) {
            if (activeTile) {
              var rows = (0, _reactDom.findDOMNode)(_this4.tilesRef).querySelectorAll('.' + TILE);
              rows[activeTile].classList.remove(ACTIVE_CLASS);
            }
            _this4.setState({ focus: false, activeTile: undefined });
            if (_onBlur) {
              _onBlur(event);
            }
          }
        };
      }

      var contents = _react2.default.createElement(
        _Box2.default,
        _extends({ ref: function ref(_ref2) {
            return _this4.tilesRef = _ref2;
          } }, other, {
          wrap: direction ? false : true,
          direction: direction ? direction : 'row',
          className: classes, focusable: false }, selectableProps),
        tileContents,
        more
      );

      if (overflow) {
        var left = void 0;
        var right = void 0;

        if (!overflowStart) {
          var previousTilesMessage = _Intl2.default.getMessage(intl, 'Previous Tiles');
          left = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__left',
            icon: _react2.default.createElement(_LinkPrevious2.default, null),
            a11yTitle: previousTilesMessage, onClick: this._onLeft });
        }
        if (!overflowEnd) {
          var nextTilesMessage = _Intl2.default.getMessage(intl, 'Next Tiles');
          right = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__right',
            icon: _react2.default.createElement(_LinkNext2.default, null),
            a11yTitle: nextTilesMessage, onClick: this._onRight });
        }

        contents = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__container' },
          left,
          contents,
          right
        );
      }

      return contents;
    }
  }]);

  return Tiles;
}(_react.Component);

Tiles.displayName = 'Tiles';
exports.default = Tiles;


Tiles.contextTypes = {
  intl: _propTypes2.default.object
};

Tiles.propTypes = _extends({
  fill: _propTypes2.default.bool,
  flush: _propTypes2.default.bool,
  onMore: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  selectable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['multiple'])]),
  selected: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)])
}, _Box2.default.propTypes);

Tiles.defaultProps = {
  flush: true,
  justify: 'start',
  pad: 'small'
};
module.exports = exports['default'];