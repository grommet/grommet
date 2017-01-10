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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

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

var CLASS_ROOT = _CSSClassnames2.default.TABLE; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var SELECTED_CLASS = CLASS_ROOT + '-row--selected';
var ACTIVE_CLASS = CLASS_ROOT + '-row--active';
// empirical number describing a minimum cell width for a
// table to be presented in column-mode.
var MIN_CELL_WIDTH = 120;

var Table = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props, context) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props, context));

    _this._onClick = _this._onClick.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._onPreviousRow = _this._onPreviousRow.bind(_this);
    _this._onNextRow = _this._onNextRow.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._fireClick = _this._fireClick.bind(_this);
    _this._announceRow = _this._announceRow.bind(_this);

    _this.state = {
      activeRow: undefined,
      mouseActive: false,
      selected: _Selection2.default.normalizeIndexes(props.selected),
      small: false,
      rebuildMirror: props.scrollable
    };
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onMore = _props.onMore,
          selectable = _props.selectable,
          scrollable = _props.scrollable;
      var small = this.state.small;

      this._setSelection();
      if (scrollable && !small) {
        this._buildMirror();
        this._alignMirror();
      }
      if (this.props.onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      this._adjustBodyCells();
      this._layout();
      window.addEventListener('resize', this._onResize);

      if (selectable) {
        // only listen for navigation keys if the table row can be selected
        this._keyboardHandlers = {
          left: this._onPreviousRow,
          up: this._onPreviousRow,
          right: this._onNextRow,
          down: this._onNextRow,
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
      if (nextProps.selected !== undefined) {
        this.setState({
          selected: _Selection2.default.normalizeIndexes(nextProps.selected)
        });
      }

      this.setState({
        rebuildMirror: nextProps.scrollable
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          onMore = _props2.onMore,
          selectable = _props2.selectable,
          scrollable = _props2.scrollable;
      var _state = this.state,
          rebuildMirror = _state.rebuildMirror,
          selected = _state.selected,
          small = _state.small;

      if ((0, _stringify2.default)(selected) !== (0, _stringify2.default)(prevState.selected)) {
        this._setSelection();
      }
      if (rebuildMirror && !small) {
        this._buildMirror();
        this.setState({ rebuildMirror: false });
      }
      if (scrollable && !small) {
        this._alignMirror();
      }
      if (onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      this._adjustBodyCells();
      this._layout();

      if (selectable) {
        // only listen for navigation keys if the table row can be selected
        this._keyboardHandlers = {
          left: this._onPreviousRow,
          up: this._onPreviousRow,
          right: this._onNextRow,
          down: this._onNextRow,
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
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);

      if (selectable) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: '_announceRow',
    value: function _announceRow(label) {
      var intl = this.context.intl;

      var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
      (0, _Announcer.announce)(label + ' ' + enterSelectMessage);
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive() {
      var small = this.state.small;

      if (this.containerRef && this.tableRef) {
        var availableSize = this.containerRef.offsetWidth;
        var numberOfCells = this.tableRef.querySelectorAll('thead th').length;

        if (numberOfCells * MIN_CELL_WIDTH > availableSize) {
          if (small === false) {
            this.setState({ small: true });
          }
        } else {
          if (small === true) {
            this.setState({ small: false });
          }
        }
      }
    }
  }, {
    key: '_container',
    value: function _container() {
      var containerElement = this.tableRef;
      if (containerElement) {
        var tableBodies = containerElement.getElementsByTagName('TBODY');
        if (tableBodies.length > 0) {
          containerElement = tableBodies[0];
        }
      }
      return containerElement;
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      var selected = this.state.selected;

      _Selection2.default.setClassFromIndexes({
        containerElement: this._container(),
        childSelector: 'tr',
        selectedClass: SELECTED_CLASS,
        selectedIndexes: selected
      });
    }
  }, {
    key: '_onPreviousRow',
    value: function _onPreviousRow(event) {
      var _this2 = this;

      if (this.tableRef.contains(document.activeElement)) {
        var _ret = function () {
          event.preventDefault();
          var activeRow = _this2.state.activeRow;

          var rows = _this2.tableRef.querySelectorAll('tbody tr');
          if (rows && rows.length > 0) {
            if (activeRow === undefined) {
              rows[0].classList.add(ACTIVE_CLASS);
              _this2.setState({ activeRow: 0 }, function () {
                _this2._announceRow(rows[_this2.state.activeRow].innerText);
              });
            } else if (activeRow - 1 >= 0) {
              rows[activeRow].classList.remove(ACTIVE_CLASS);
              rows[activeRow - 1].classList.add(ACTIVE_CLASS);
              _this2.setState({ activeRow: activeRow - 1 }, function () {
                _this2._announceRow(rows[_this2.state.activeRow].innerText);
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
    key: '_onNextRow',
    value: function _onNextRow(event) {
      var _this3 = this;

      if (this.tableRef.contains(document.activeElement)) {
        var _ret2 = function () {
          event.preventDefault();
          var activeRow = _this3.state.activeRow;

          var rows = _this3.tableRef.querySelectorAll('tbody tr');
          if (rows && rows.length > 0) {
            if (activeRow === undefined) {
              rows[0].classList.add(ACTIVE_CLASS);
              _this3.setState({ activeRow: 0 }, function () {
                _this3._announceRow(rows[_this3.state.activeRow].innerText);
              });
            } else if (activeRow + 1 <= rows.length - 1) {
              rows[activeRow].classList.remove(ACTIVE_CLASS);
              rows[activeRow + 1].classList.add(ACTIVE_CLASS);
              _this3.setState({ activeRow: activeRow + 1 }, function () {
                _this3._announceRow(rows[_this3.state.activeRow].innerText);
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
      var activeRow = this.state.activeRow;
      var intl = this.context.intl;

      if (this.tableRef.contains(document.activeElement) && activeRow !== undefined) {
        var rows = this.tableRef.querySelectorAll('tbody tr');
        this._fireClick(rows[activeRow], event.shiftKey);
        rows[activeRow].classList.remove(ACTIVE_CLASS);
        var label = rows[activeRow].innerText;
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


      var selection = _Selection2.default.onClick(event, {
        containerElement: this._container(),
        childSelector: 'tr',
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
    key: '_adjustBodyCells',
    value: function _adjustBodyCells() {
      var _this4 = this;

      // adjust table body cells to have link to the header
      // so that in responsive mode it displays the text as content in css.
      // IMPORTANT: non-text header cells, such as icon, are rendered as empty
      // headers.
      if (this.tableRef) {
        (function () {
          var headerCells = _this4.tableRef.querySelectorAll('thead th');
          if (headerCells.length > 0) {
            var rows = _this4.tableRef.querySelectorAll('tbody tr');

            [].forEach.call(rows, function (row) {
              [].forEach.call(row.cells, function (cell, index) {
                cell.setAttribute('data-th', headerCells[index].innerText || headerCells[index].textContent);
              });
            });
          }
        })();
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
    key: '_layout',
    value: function _layout() {
      this._alignMirror();
      this._onResponsive();
    }
  }, {
    key: '_buildMirror',
    value: function _buildMirror() {
      var tableElement = this.tableRef;
      if (tableElement) {
        var cells = tableElement.querySelectorAll('thead tr th');
        var mirrorElement = this.mirrorRef;
        if (mirrorElement) {
          var mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
          while (mirrorRow.hasChildNodes()) {
            mirrorRow.removeChild(mirrorRow.lastChild);
          }
          for (var i = 0; i < cells.length; i++) {
            mirrorRow.appendChild(cells[i].cloneNode(true));
          }
        }
      }
    }
  }, {
    key: '_alignMirror',
    value: function _alignMirror() {
      if (this.mirrorRef) {
        var tableElement = this.tableRef;
        var cells = tableElement.querySelectorAll('thead tr th');
        var mirrorElement = this.mirrorRef;
        var mirrorCells = mirrorElement.querySelectorAll('thead tr th');

        var rect = tableElement.getBoundingClientRect();
        mirrorElement.style.width = '' + Math.floor(rect.right - rect.left) + 'px';

        var height = 0;
        for (var i = 0; i < cells.length; i++) {
          rect = cells[i].getBoundingClientRect();
          mirrorCells[i].style.width = '' + Math.floor(rect.right - rect.left) + 'px';
          mirrorCells[i].style.height = '' + Math.floor(rect.bottom - rect.top) + 'px';
          height = Math.max(height, Math.floor(rect.bottom - rect.top));
        }
        mirrorElement.style.height = '' + height + 'px';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this5 = this;

      var _props4 = this.props,
          a11yTitle = _props4.a11yTitle,
          children = _props4.children,
          className = _props4.className,
          _onBlur = _props4.onBlur,
          _onFocus = _props4.onFocus,
          onMore = _props4.onMore,
          _onMouseDown = _props4.onMouseDown,
          _onMouseUp = _props4.onMouseUp,
          scrollable = _props4.scrollable,
          selectable = _props4.selectable,
          props = (0, _objectWithoutProperties3.default)(_props4, ['a11yTitle', 'children', 'className', 'onBlur', 'onFocus', 'onMore', 'onMouseDown', 'onMouseUp', 'scrollable', 'selectable']);

      delete props.onSelect;
      delete props.selected;
      var _state2 = this.state,
          activeRow = _state2.activeRow,
          focus = _state2.focus,
          mouseActive = _state2.mouseActive,
          small = _state2.small;
      var intl = this.context.intl;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--small', small), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', selectable), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--scrollable', scrollable), _classnames), className);

      var mirror = void 0;
      if (scrollable) {
        mirror = _react2.default.createElement(
          'table',
          { ref: function ref(_ref) {
              return _this5.mirrorRef = _ref;
            },
            className: CLASS_ROOT + '__mirror' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement('tr', null)
          )
        );
      }

      var more = void 0;
      if (onMore) {
        more = _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this5.moreRef = _ref2;
            }, className: CLASS_ROOT + '__more' },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      var selectableProps = void 0;
      if (selectable) {
        var multiSelectMessage = selectable === 'multiple' ? '(' + _Intl2.default.getMessage(intl, 'Multi Select') + ')' : '';
        var tableMessage = a11yTitle || _Intl2.default.getMessage(intl, 'Table');
        var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');
        selectableProps = {
          'aria-label': tableMessage + ' ' + multiSelectMessage + ' ' + navigationHelpMessage,
          tabIndex: '0',
          onClick: this._onClick,
          onMouseDown: function onMouseDown(event) {
            _this5.setState({ mouseActive: true });
            if (_onMouseDown) {
              _onMouseDown(event);
            }
          },
          onMouseUp: function onMouseUp(event) {
            _this5.setState({ mouseActive: false });
            if (_onMouseUp) {
              _onMouseUp(event);
            }
          },
          onFocus: function onFocus(event) {
            if (mouseActive === false) {
              _this5.setState({ focus: true });
            }
            if (_onFocus) {
              _onFocus(event);
            }
          },
          onBlur: function onBlur(event) {
            if (activeRow) {
              var rows = _this5.tableRef.querySelectorAll('tbody tr');
              rows[activeRow].classList.remove(ACTIVE_CLASS);
            }
            _this5.setState({ focus: false, activeRow: undefined });
            if (_onBlur) {
              _onBlur(event);
            }
          }
        };
      }

      var tableClasses = (0, _classnames4.default)(CLASS_ROOT + '__table', (0, _defineProperty3.default)({}, CLASS_ROOT + '__table--focus', focus));

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref4) {
            return _this5.containerRef = _ref4;
          } }, props, { className: classes }),
        mirror,
        _react2.default.createElement(
          'table',
          (0, _extends3.default)({ ref: function ref(_ref3) {
              return _this5.tableRef = _ref3;
            } }, selectableProps, {
            className: tableClasses }),
          children
        ),
        more
      );
    }
  }]);
  return Table;
}(_react.Component);

Table.displayName = 'Table';
exports.default = Table;


Table.contextTypes = {
  intl: _react.PropTypes.object
};

Table.propTypes = {
  a11yTitle: _react.PropTypes.string,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  scrollable: _react.PropTypes.bool,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)])
};
module.exports = exports['default'];