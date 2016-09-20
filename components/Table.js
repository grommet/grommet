'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TABLE;
var SELECTED_CLASS = CLASS_ROOT + '-row--selected';
// empirical number describing a minimum cell width for a
// table to be presented in column-mode.
var MIN_CELL_WIDTH = 96;

var Table = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props, context) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props, context));

    _this._onClick = _this._onClick.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);

    _this.state = {
      selected: _Selection2.default.normalizeIndexes(props.selected),
      rebuildMirror: props.scrollable,
      small: false
    };
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setSelection();
      if (this.props.scrollable && !this.state.small) {
        this._buildMirror();
        this._alignMirror();
      }
      if (this.props.onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, this.props.onMore);
      }
      this._adjustBodyCells();
      window.addEventListener('resize', this._onResize);
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
      this.setState({ rebuildMirror: nextProps.scrollable });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if ((0, _stringify2.default)(this.state.selected) !== (0, _stringify2.default)(prevState.selected)) {
        this._setSelection();
      }
      if (this.state.rebuildMirror && !this.state.small) {
        this._buildMirror();
        this.setState({ rebuildMirror: false });
      }
      if (this.props.scrollable && !this.state.small) {
        this._alignMirror();
      }
      if (this.props.onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, this.props.onMore);
      }
      this._adjustBodyCells();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
      }
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_container',
    value: function _container() {
      var containerElement = this.tableRef;
      if (containerElement) {
        var tableBodies = containerElement.getElementsByTagName("TBODY");
        if (tableBodies.length > 0) {
          containerElement = tableBodies[0];
        }
      }
      return containerElement;
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      _Selection2.default.setClassFromIndexes({
        containerElement: this._container(),
        childSelector: 'tr',
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

      var selected = _Selection2.default.onClick(event, {
        containerElement: this._container(),
        childSelector: 'tr',
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
  }, {
    key: '_adjustBodyCells',
    value: function _adjustBodyCells() {
      var _this2 = this;

      // adjust table body cells to have link to the header
      // so that in responsive mode it displays the text as content in css.
      // IMPORTANT: non-text header cells, such as icon, are rendered as empty
      // headers.
      if (this.tableRef) {
        (function () {
          var headerCells = _this2.tableRef.querySelectorAll('thead th');
          if (headerCells.length > 0) {
            var rows = _this2.tableRef.querySelectorAll('tbody tr');

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

      var availableSize = this.containerRef.offsetWidth;
      var numberOfCells = this.tableRef.querySelectorAll('thead th').lengthRef;

      if (numberOfCells * MIN_CELL_WIDTH > availableSize) {
        this.setState({ small: true });
      } else {
        this.setState({ small: false });
      }
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
          _this3 = this;

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--small', this.state.small), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', this.props.selectable), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--scrollable', this.props.scrollable), _classnames));

      var mirror = void 0;
      if (this.props.scrollable) {
        mirror = _react2.default.createElement(
          'table',
          { ref: function ref(_ref) {
              return _this3.mirrorRef = _ref;
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
      if (this.props.onMore) {
        more = _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this3.moreRef = _ref2;
            }, className: CLASS_ROOT + '__more' },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref4) {
            return _this3.containerRef = _ref4;
          }, className: classes },
        mirror,
        _react2.default.createElement(
          'table',
          { ref: function ref(_ref3) {
              return _this3.tableRef = _ref3;
            },
            className: CLASS_ROOT + '__table', onClick: this._onClick },
          this.props.children
        ),
        more
      );
    }
  }]);
  return Table;
}(_react.Component);

Table.displayName = 'Table';
exports.default = Table;


Table.propTypes = {
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  scrollable: _react.PropTypes.bool,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)])
};
module.exports = exports['default'];