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

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TABLE;
var SELECTED_CLASS = CLASS_ROOT + '-row--selected';
var ACTIVE_CLASS = CLASS_ROOT + '-row--active';
// empirical number describing a minimum cell width for a
// table to be presented in column-mode.
var MIN_CELL_WIDTH = 120;

function getTotalCellCount(cells) {
  var cellCount = 0;
  [].forEach.call(cells, function (cell) {
    var colspan = cell.getAttribute('colspan');
    cellCount += colspan ? parseInt(colspan) : 1;
  });

  return cellCount;
}

// function that filters the items that are not
// an immediate child of its parent
function immediateTableChildOnly(result, tableParent) {
  var immediateChild = [];
  [].forEach.call(result, function (item) {
    var currentParent = item.parentNode;
    while (currentParent) {
      if (currentParent.tagName.toLowerCase() === 'table') {
        if (currentParent === tableParent) {
          immediateChild.push(item);
        }
        break;
      }
      currentParent = currentParent.parentNode;
    }
  });
  return immediateChild;
}

function findHead(children) {
  if (!children) {
    return undefined;
  }

  var childElements = _react.Children.toArray(children);

  var head = void 0;
  childElements.some(function (child) {
    if (child.type && (child.type === 'thead' || child.type === _TableHeader2.default || child.type.displayName === _TableHeader2.default.displayName)) {
      head = child;
      return true;
    } else if (child.props && child.props.children) {
      head = findHead(child.props.children);
      if (head) {
        return true;
      }
    }
    return false;
  });

  return head;
}

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props, context) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props, context));

    _this._onClick = _this._onClick.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._onPreviousRow = _this._onPreviousRow.bind(_this);
    _this._onNextRow = _this._onNextRow.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._fireClick = _this._fireClick.bind(_this);
    _this._announceRow = _this._announceRow.bind(_this);
    _this._onViewPortChange = _this._onViewPortChange.bind(_this);

    _this.state = {
      activeRow: undefined,
      mouseActive: false,
      selected: _Selection2.default.normalizeIndexes(props.selected),
      columnMode: false,
      small: false
    };
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onMore = _props.onMore,
          selectable = _props.selectable,
          scrollable = _props.scrollable;
      var _state = this.state,
          columnMode = _state.columnMode,
          small = _state.small;

      this._setSelection();
      if (scrollable && !columnMode && !small) {
        this._alignMirror();
      }
      if (this.props.onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, onMore);
      }
      this._adjustBodyCells();
      setTimeout(this._layout, 50);
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

      this._responsive = _Responsive2.default.start(this._onViewPortChange);
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
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          onMore = _props2.onMore,
          selectable = _props2.selectable,
          scrollable = _props2.scrollable;
      var _state2 = this.state,
          columnMode = _state2.columnMode,
          selected = _state2.selected,
          small = _state2.small;

      if (JSON.stringify(selected) !== JSON.stringify(prevState.selected)) {
        this._setSelection();
      }
      if (scrollable && !columnMode && !small) {
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

      this._responsive.stop();
    }
  }, {
    key: '_onViewPortChange',
    value: function _onViewPortChange(small) {
      this.setState({ small: small });
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
      var columnMode = this.state.columnMode;

      if (this.containerRef && this.tableRef) {
        var availableSize = this.containerRef.offsetWidth;
        var numberOfCells = getTotalCellCount(immediateTableChildOnly(this.tableRef.querySelectorAll('thead th'), this.tableRef));

        if (numberOfCells * MIN_CELL_WIDTH > availableSize) {
          if (columnMode === false) {
            this.setState({ columnMode: true });
          }
        } else {
          if (columnMode === true) {
            this.setState({ columnMode: false });
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
        event.preventDefault();
        var activeRow = this.state.activeRow;

        var rows = immediateTableChildOnly(this.tableRef.querySelectorAll('tbody tr'), this.tableRef);
        if (rows && rows.length > 0) {
          if (activeRow === undefined) {
            rows[0].classList.add(ACTIVE_CLASS);
            this.setState({ activeRow: 0 }, function () {
              _this2._announceRow(rows[_this2.state.activeRow].innerText);
            });
          } else if (activeRow - 1 >= 0) {
            rows[activeRow].classList.remove(ACTIVE_CLASS);
            rows[activeRow - 1].classList.add(ACTIVE_CLASS);
            this.setState({ activeRow: activeRow - 1 }, function () {
              _this2._announceRow(rows[_this2.state.activeRow].innerText);
            });
          }
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_onNextRow',
    value: function _onNextRow(event) {
      var _this3 = this;

      if (this.tableRef.contains(document.activeElement)) {
        event.preventDefault();
        var activeRow = this.state.activeRow;

        var rows = immediateTableChildOnly(this.tableRef.querySelectorAll('tbody tr'), this.tableRef);
        if (rows && rows.length > 0) {
          if (activeRow === undefined) {
            rows[0].classList.add(ACTIVE_CLASS);
            this.setState({ activeRow: 0 }, function () {
              _this3._announceRow(rows[_this3.state.activeRow].innerText);
            });
          } else if (activeRow + 1 <= rows.length - 1) {
            rows[activeRow].classList.remove(ACTIVE_CLASS);
            rows[activeRow + 1].classList.add(ACTIVE_CLASS);
            this.setState({ activeRow: activeRow + 1 }, function () {
              _this3._announceRow(rows[_this3.state.activeRow].innerText);
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
      var activeRow = this.state.activeRow;
      var intl = this.context.intl;

      if (this.tableRef.contains(document.activeElement) && activeRow !== undefined) {
        var rows = immediateTableChildOnly(this.tableRef.querySelectorAll('tbody tr'), this.tableRef);
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
      // adjust table body cells to have link to the header
      // so that in responsive mode it displays the text as content in css.
      // IMPORTANT: non-text header cells, such as icon, are rendered as empty
      // headers.
      if (this.tableRef) {
        var headerCells = immediateTableChildOnly(this.tableRef.querySelectorAll('thead th'), this.tableRef);
        var totalHeaderCells = getTotalCellCount(headerCells);
        if (headerCells.length > 0) {
          var increments = [];
          headerCells.forEach(function (cell) {
            var colspan = cell.getAttribute('colspan');
            increments.push(colspan ? parseInt(colspan) : 1);
          });

          var rows = immediateTableChildOnly(this.tableRef.querySelectorAll('tbody tr'), this.tableRef);

          rows.forEach(function (row) {
            var incrementCount = 0;
            var headerIndex = 0;

            if (getTotalCellCount(row.cells) !== totalHeaderCells) {
              console.error('Table row cells do not match length of header cells.');
            }

            [].forEach.call(row.cells, function (cell) {
              var colspan = cell.getAttribute('colspan');
              var cellCount = colspan ? parseInt(colspan) : 1;
              if (cellCount < totalHeaderCells) {
                // only set the header if the cell colspan is smaller
                // than the total header cells
                cell.setAttribute('data-th', headerCells[headerIndex].innerText || headerCells[headerIndex].textContent);
              }

              incrementCount++;
              if (incrementCount === increments[headerIndex]) {
                incrementCount = 0;
                headerIndex++;
              }
            });
          });
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
    key: '_layout',
    value: function _layout() {
      var scrollable = this.props.scrollable;
      var small = this.state.small;

      if (scrollable && !small) {
        this._alignMirror();
      }
      this._onResponsive();
    }
  }, {
    key: '_alignMirror',
    value: function _alignMirror() {
      var mirrorElement = this.mirrorRef;
      if (mirrorElement) {
        var mirrorCells = immediateTableChildOnly(mirrorElement.querySelectorAll('thead tr th'), mirrorElement);
        if (this.mirrorRef && mirrorCells.length > 0) {
          var tableElement = this.tableRef;
          var cells = immediateTableChildOnly(tableElement.querySelectorAll('thead tr th'), tableElement);

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
          _onBlur = _props4.onBlur,
          _onFocus = _props4.onFocus,
          onMore = _props4.onMore,
          _onMouseDown = _props4.onMouseDown,
          _onMouseUp = _props4.onMouseUp,
          responsive = _props4.responsive,
          scrollable = _props4.scrollable,
          selectable = _props4.selectable,
          props = _objectWithoutProperties(_props4, ['a11yTitle', 'children', 'className', 'onBlur', 'onFocus', 'onMore', 'onMouseDown', 'onMouseUp', 'responsive', 'scrollable', 'selectable']);

      delete props.onSelect;
      delete props.selected;
      var _state3 = this.state,
          activeRow = _state3.activeRow,
          columnMode = _state3.columnMode,
          focus = _state3.focus,
          mouseActive = _state3.mouseActive,
          small = _state3.small;
      var intl = this.context.intl;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--small', responsive && columnMode), _defineProperty(_classnames, CLASS_ROOT + '--selectable', selectable), _defineProperty(_classnames, CLASS_ROOT + '--scrollable', scrollable && !small), _classnames), className);

      var mirror = void 0;
      if (scrollable && !small) {
        var head = findHead(children);
        mirror = _react2.default.createElement(
          'table',
          { ref: function ref(_ref) {
              return _this4.mirrorRef = _ref;
            },
            className: CLASS_ROOT + '__mirror' },
          head
        );
      }

      var more = void 0;
      if (onMore) {
        more = _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this4.moreRef = _ref2;
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
            if (activeRow) {
              var rows = immediateTableChildOnly(_this4.tableRef.querySelectorAll('tbody tr'), _this4.tableRef);
              rows[activeRow].classList.remove(ACTIVE_CLASS);
            }
            _this4.setState({ focus: false, activeRow: undefined });
            if (_onBlur) {
              _onBlur(event);
            }
          }
        };
      }

      var tableClasses = (0, _classnames4.default)(CLASS_ROOT + '__table', _defineProperty({}, CLASS_ROOT + '__table--focus', focus));

      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref4) {
            return _this4.containerRef = _ref4;
          } }, props, { className: classes }),
        mirror,
        _react2.default.createElement(
          'table',
          _extends({ ref: function ref(_ref3) {
              return _this4.tableRef = _ref3;
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
  intl: _propTypes2.default.object
};

Table.propTypes = {
  a11yTitle: _propTypes2.default.string,
  onMore: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  responsive: _propTypes2.default.bool,
  scrollable: _propTypes2.default.bool,
  selectable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['multiple'])]),
  selected: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)])
};

Table.defaultProps = {
  responsive: true
};
module.exports = exports['default'];