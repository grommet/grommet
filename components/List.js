'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LIST;
var LIST_ITEM = _CSSClassnames2.default.LIST_ITEM;
var SELECTED_CLASS = CLASS_ROOT + "-item--selected";

var List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, props));

    _this._onClick = _this._onClick.bind(_this);

    _this.state = {
      selected: _Selection2.default.normalizeIndexes(props.selected)
    };
    return _this;
  }

  _createClass(List, [{
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
      if (JSON.stringify(this.state.selected) !== JSON.stringify(prevState.selected)) {
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