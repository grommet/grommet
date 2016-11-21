'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _Spinning = require('./icons/Spinning');

var _Spinning2 = _interopRequireDefault(_Spinning);

var _InfiniteScroll = require('../utils/InfiniteScroll');

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _Selection = require('../utils/Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.LIST; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var LIST_ITEM = _CSSClassnames2.default.LIST_ITEM;
var SELECTED_CLASS = CLASS_ROOT + '-item--selected';
var ACTIVE_CLASS = CLASS_ROOT + '-item--active';

var List = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List(props, context) {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props, context));

    _this._onClick = _this._onClick.bind(_this);
    _this._fireClick = _this._fireClick.bind(_this);
    _this._announceItem = _this._announceItem.bind(_this);
    _this._onPreviousItem = _this._onPreviousItem.bind(_this);
    _this._onNextItem = _this._onNextItem.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);

    _this.state = {
      activeItem: undefined,
      mouseActive: false,
      selected: _Selection2.default.normalizeIndexes(props.selected)
    };
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onMore = _props.onMore,
          selectable = _props.selectable;

      this._setSelection();
      if (onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      if (selectable) {
        // only listen for navigation keys if the list row can be selected
        this._keyboardHandlers = {
          left: this._onPreviousItem,
          up: this._onPreviousItem,
          right: this._onNextItem,
          down: this._onNextItem,
          enter: this._onEnter,
          space: this._onEnter
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
        this._scroll = undefined;
      }
      if (nextProps.hasOwnProperty('selected')) {
        this.setState({
          selected: _Selection2.default.normalizeIndexes(nextProps.selected)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          onMore = _props2.onMore,
          selectable = _props2.selectable;
      var selected = this.state.selected;

      if ((0, _stringify2.default)(selected) !== (0, _stringify2.default)(prevState.selected)) {
        this._setSelection();
      }
      if (onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      if (selectable) {
        // only listen for navigation keys if the list row can be selected
        this._keyboardHandlers = {
          left: this._onPreviousItem,
          up: this._onPreviousItem,
          right: this._onNextItem,
          down: this._onNextItem,
          enter: this._onEnter,
          space: this._onEnter
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var selectable = this.props.selectable;

      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
      }
      if (selectable) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: '_announceItem',
    value: function _announceItem(label) {
      var intl = this.context.intl;

      var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
      (0, _Announcer.announce)(label + ' ' + enterSelectMessage);
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      if (this.listRef) {
        _Selection2.default.setClassFromIndexes({
          containerElement: this.listRef,
          childSelector: '.' + LIST_ITEM,
          selectedClass: SELECTED_CLASS,
          selectedIndexes: this.state.selected
        });
      };
    }
  }, {
    key: '_onPreviousItem',
    value: function _onPreviousItem(event) {
      var _this2 = this;

      if (this.listRef.contains(document.activeElement)) {
        var _ret = function () {
          event.preventDefault();
          var activeItem = _this2.state.activeItem;

          var rows = _this2.listRef.querySelectorAll('ul li');
          if (rows && rows.length > 0) {
            if (activeItem === undefined) {
              rows[0].classList.add(ACTIVE_CLASS);
              _this2.setState({ activeItem: 0 }, function () {
                _this2._announceItem(rows[_this2.state.activeItem].innerText);
              });
            } else if (activeItem - 1 >= 0) {
              rows[activeItem].classList.remove(ACTIVE_CLASS);
              rows[activeItem - 1].classList.add(ACTIVE_CLASS);
              _this2.setState({ activeItem: activeItem - 1 }, function () {
                _this2._announceItem(rows[_this2.state.activeItem].innerText);
              });
            }
          }

          //stop event propagation
          return {
            v: true
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: '_onNextItem',
    value: function _onNextItem(event) {
      var _this3 = this;

      if (this.listRef.contains(document.activeElement)) {
        var _ret2 = function () {
          event.preventDefault();
          var activeItem = _this3.state.activeItem;

          var rows = _this3.listRef.querySelectorAll('ul li');
          if (rows && rows.length > 0) {
            if (activeItem === undefined) {
              rows[0].classList.add(ACTIVE_CLASS);
              _this3.setState({ activeItem: 0 }, function () {
                _this3._announceItem(rows[_this3.state.activeItem].innerText);
              });
            } else if (activeItem + 1 <= rows.length - 1) {
              rows[activeItem].classList.remove(ACTIVE_CLASS);
              rows[activeItem + 1].classList.add(ACTIVE_CLASS);
              _this3.setState({ activeItem: activeItem + 1 }, function () {
                _this3._announceItem(rows[_this3.state.activeItem].innerText);
              });
            }
          }

          //stop event propagation
          return {
            v: true
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
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
      var activeItem = this.state.activeItem;
      var intl = this.context.intl;

      if (this.listRef.contains(document.activeElement) && activeItem !== undefined) {
        var rows = this.listRef.querySelectorAll('ul li');
        this._fireClick(rows[activeItem], event.shiftKey);
        rows[activeItem].classList.remove(ACTIVE_CLASS);
        var label = rows[activeItem].innerText;
        var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
        (0, _Announcer.announce)(label + ' ' + selectedMessage);
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      var _props3 = this.props,
          onSelect = _props3.onSelect,
          selectable = _props3.selectable,
          selected = _props3.selected;

      if (!this.props.selectable) {
        return;
      }

      var selection = _Selection2.default.onClick(event, {
        containerElement: this.listRef,
        childSelector: '.' + LIST_ITEM,
        selectedClass: SELECTED_CLASS,
        multiSelect: 'multiple' === selectable,
        priorSelectedIndexes: this.state.selected
      });

      // only set the selected state and classes if the caller isn't managing it.
      if (selected === undefined) {
        this.setState({ selected: selection }, this._setSelection);
      }

      if (onSelect) {
        onSelect(selection.length === 1 ? selection[0] : selection);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this4 = this;

      var _props4 = this.props,
          a11yTitle = _props4.a11yTitle,
          children = _props4.children,
          className = _props4.className,
          emptyIndicator = _props4.emptyIndicator,
          _onBlur = _props4.onBlur,
          _onFocus = _props4.onFocus,
          onMore = _props4.onMore,
          _onMouseDown = _props4.onMouseDown,
          _onMouseUp = _props4.onMouseUp,
          selectable = _props4.selectable,
          props = (0, _objectWithoutProperties3.default)(_props4, ['a11yTitle', 'children', 'className', 'emptyIndicator', 'onBlur', 'onFocus', 'onMore', 'onMouseDown', 'onMouseUp', 'selectable']);
      var _state = this.state,
          activeItem = _state.activeItem,
          focus = _state.focus,
          mouseActive = _state.mouseActive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--focus', focus), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', selectable), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--moreable', onMore), _classnames), className);

      var empty = void 0;
      if (emptyIndicator) {
        empty = _react2.default.createElement(
          'li',
          { className: CLASS_ROOT + '__empty' },
          emptyIndicator
        );
      }

      var more = void 0;
      if (onMore) {
        more = _react2.default.createElement(
          'li',
          { ref: function ref(_ref) {
              return _this4.moreRef = _ref;
            }, className: CLASS_ROOT + '__more' },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      var selectableProps = void 0;
      if (selectable) {
        var multiSelectMessage = selectable === 'multiple' ? '(' + _Intl2.default.getMessage(intl, 'Multi Select') + ')' : '';
        var listMessage = a11yTitle || _Intl2.default.getMessage(intl, 'List');
        var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');
        selectableProps = {
          'aria-label': listMessage + ' ' + multiSelectMessage + ' ' + navigationHelpMessage,
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
            if (activeItem) {
              var rows = _this4.listRef.querySelectorAll('ul li');
              rows[activeItem].classList.remove(ACTIVE_CLASS);
            }
            _this4.setState({ focus: false, activeItem: undefined });
            if (_onBlur) {
              _onBlur(event);
            }
          }
        };
      }

      return _react2.default.createElement(
        'ul',
        (0, _extends3.default)({}, props, { ref: function ref(_ref2) {
            return _this4.listRef = _ref2;
          }, className: classes
        }, selectableProps),
        empty,
        children,
        more
      );
    }
  }]);
  return List;
}(_react.Component);

List.displayName = 'List';
exports.default = List;


List.contextTypes = {
  intl: _react.PropTypes.object
};

List.propTypes = {
  emptyIndicator: _react.PropTypes.node,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)])
};

List.defaultProps = {
  role: 'list'
};
module.exports = exports['default'];