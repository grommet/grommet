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

var _lodashLangIsEqual = require('lodash/lang/isEqual');

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

var _iconsSpinning = require('./icons/Spinning');

var _iconsSpinning2 = _interopRequireDefault(_iconsSpinning);

var _utilsInfiniteScroll = require('../utils/InfiniteScroll');

var _utilsInfiniteScroll2 = _interopRequireDefault(_utilsInfiniteScroll);

var _utilsSelection = require('../utils/Selection');

var _utilsSelection2 = _interopRequireDefault(_utilsSelection);

var CLASS_ROOT = "table";
var SELECTED_CLASS = CLASS_ROOT + "-row--selected";

var Table = (function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    _get(Object.getPrototypeOf(Table.prototype), 'constructor', this).call(this, props);

    this._onClick = this._onClick.bind(this);
    this._onResize = this._onResize.bind(this);

    if (props.selection) {
      console.warn('The "selection" property of Table has been deprecated.' + ' Instead, use the "selected" property. The behavior is the same.' + ' The property name was changed to align with List and Tiles.');
    }
    this.state = {
      selected: _utilsSelection2['default'].normalize(props.selected || props.selection),
      rebuildMirror: props.scrollable
    };
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setSelection();
      if (this.props.scrollable) {
        this._buildMirror();
        this._alignMirror();
      }
      if (this.props.onMore) {
        this._scroll = _utilsInfiniteScroll2['default'].startListeningForScroll(this.refs.more, this.props.onMore);
      }
      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this._scroll) {
        _utilsInfiniteScroll2['default'].stopListeningForScroll(this._scroll);
        this._scroll = null;
      }
      if (nextProps.hasOwnProperty('selected') || nextProps.hasOwnProperty('selection')) {
        this.setState({
          selected: _utilsSelection2['default'].normalize(nextProps.selected || nextProps.selection)
        });
      }
      this.setState({ rebuildMirror: nextProps.scrollable });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (!(0, _lodashLangIsEqual2['default'])(this.state.selected, prevState.selected)) {
        this._setSelection();
      }
      if (this.state.rebuildMirror) {
        this._buildMirror();
        this.setState({ rebuildMirror: false });
      }
      if (this.props.scrollable) {
        this._alignMirror();
      }
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
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_container',
    value: function _container() {
      var containerElement = this.refs.table;
      var tableBodies = containerElement.getElementsByTagName("TBODY");
      if (tableBodies.length > 0) {
        containerElement = tableBodies[0];
      }
      return containerElement;
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      _utilsSelection2['default'].set({
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

      var selected = _utilsSelection2['default'].click(event, {
        containerElement: this._container(),
        childSelector: 'tr',
        selectedClass: SELECTED_CLASS,
        multiSelect: 'multiple' === this.props.selectable,
        priorSelectedIndexes: this.state.selected
      });
      this.setState({ selected: selected });

      if (this.props.onSelect) {
        // notify caller that the selection has changed
        if (selected.length === 1) {
          selected = selected[0];
        }
        this.props.onSelect(selected);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this._alignMirror();
    }
  }, {
    key: '_buildMirror',
    value: function _buildMirror() {
      var tableElement = this.refs.table;
      var cells = tableElement.querySelectorAll('thead tr th');
      var mirrorElement = this.refs.mirror;
      var mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
      while (mirrorRow.hasChildNodes()) {
        mirrorRow.removeChild(mirrorRow.lastChild);
      }
      for (var i = 0; i < cells.length; i++) {
        mirrorRow.appendChild(cells[i].cloneNode(true));
      }
    }
  }, {
    key: '_alignMirror',
    value: function _alignMirror() {
      if (this.refs.mirror) {
        var tableElement = this.refs.table;
        var cells = tableElement.querySelectorAll('thead tr th');
        var mirrorElement = this.refs.mirror;
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
      var classes = [CLASS_ROOT];
      if (this.props.selectable) {
        classes.push(CLASS_ROOT + "--selectable");
      }
      if (this.props.scrollable) {
        classes.push(CLASS_ROOT + "--scrollable");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var mirror = null;
      if (this.props.scrollable) {
        mirror = _react2['default'].createElement(
          'table',
          { ref: 'mirror', className: CLASS_ROOT + "__mirror" },
          _react2['default'].createElement(
            'thead',
            null,
            _react2['default'].createElement('tr', null)
          )
        );
      }

      var more = null;
      if (this.props.onMore) {
        more = _react2['default'].createElement(
          'div',
          { ref: 'more', className: CLASS_ROOT + "__more" },
          _react2['default'].createElement(_iconsSpinning2['default'], null)
        );
      }

      return _react2['default'].createElement(
        'div',
        { ref: 'container', className: classes.join(' ') },
        mirror,
        _react2['default'].createElement(
          'table',
          { ref: 'table', className: CLASS_ROOT + "__table", onClick: this._onClick },
          this.props.children
        ),
        more
      );
    }
  }]);

  return Table;
})(_react.Component);

exports['default'] = Table;

Table.propTypes = {
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  scrollable: _react.PropTypes.bool,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)])
};
module.exports = exports['default'];