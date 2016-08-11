'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Spinning = require('./icons/Spinning');

var _Spinning2 = _interopRequireDefault(_Spinning);

var _InfiniteScroll = require('../utils/InfiniteScroll');

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _Selection = require('../utils/Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.LIST; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var LIST_ITEM = _CSSClassnames2.default.LIST_ITEM;
var SELECTED_CLASS = CLASS_ROOT + "-item--selected";

var List = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List(props, context) {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(List).call(this, props, context));

    _this._onClick = _this._onClick.bind(_this);

    _this.state = {
      selected: _Selection2.default.normalizeIndexes(props.selected)
    };
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setSelection();
      if (this.props.onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.refs.more, this.props.onMore);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
        this._scroll = null;
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
      if ((0, _stringify2.default)(this.state.selected) !== (0, _stringify2.default)(prevState.selected)) {
        this._setSelection();
      }
      if (this.props.onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.refs.more, this.props.onMore);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
      }
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      _Selection2.default.setClassFromIndexes({
        containerElement: this.refs.list,
        childSelector: '.' + LIST_ITEM,
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
        containerElement: this.refs.list,
        childSelector: '.' + LIST_ITEM,
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
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.selectable) {
        classes.push(CLASS_ROOT + "--selectable");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var empty = void 0;
      if (this.props.emptyIndicator) {
        empty = _react2.default.createElement(
          'li',
          { className: CLASS_ROOT + "__empty" },
          this.props.emptyIndicator
        );
      }

      var more;
      if (this.props.onMore) {
        classes.push(CLASS_ROOT + "--moreable");
        more = _react2.default.createElement(
          'li',
          { ref: 'more', className: CLASS_ROOT + "__more" },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      return _react2.default.createElement(
        'ul',
        { ref: 'list', className: classes.join(' '), onClick: this._onClick },
        empty,
        this.props.children,
        more
      );
    }
  }]);
  return List;
}(_react.Component);

List.displayName = 'List';
exports.default = List;


List.propTypes = {
  emptyIndicator: _react.PropTypes.node,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)])
};
module.exports = exports['default'];