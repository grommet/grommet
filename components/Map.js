'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.MAP;

var ResourceMap = function (_Component) {
  (0, _inherits3.default)(ResourceMap, _Component);

  function ResourceMap() {
    (0, _classCallCheck3.default)(this, ResourceMap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ResourceMap).call(this));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._draw = _this._draw.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onLeave = _this._onLeave.bind(_this);

    _this.state = {
      canvasWidth: 100,
      canvasHeight: 100
    };
    return _this;
  }

  (0, _createClass3.default)(ResourceMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
      clearTimeout(this._drawTimer);
      this._drawTimer = setTimeout(this._draw, 50);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._layout();
      clearTimeout(this._drawTimer);
      this._drawTimer = setTimeout(this._draw, 50);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_coords',
    value: function _coords(id, canvasRect) {
      var element = document.getElementById(id);
      var rect = element.getBoundingClientRect();
      return [rect.left - canvasRect.left + rect.width / 2, rect.top - canvasRect.top + rect.height / 2];
    }
  }, {
    key: '_draw',
    value: function _draw() {
      var canvasElement = this.refs.canvas;
      var highlightCanvasElement = this.refs.highlightCanvas;
      // don't draw if we don't have a canvas to draw on, such as a unit test
      if (canvasElement.getContext) {
        var context = canvasElement.getContext('2d');
        var highlightContext = highlightCanvasElement.getContext('2d');
        var canvasRect = canvasElement.getBoundingClientRect();
        context.clearRect(0, 0, canvasRect.width, canvasRect.height);
        highlightContext.clearRect(0, 0, canvasRect.width, canvasRect.height);

        context.strokeStyle = '#000000';
        context.lineWidth = 1;
        highlightContext.strokeStyle = '#000000';
        highlightContext.lineWidth = 2;

        this.props.data.links.forEach(function (link) {
          var parentCoords = this._coords(link.parentId, canvasRect);
          var childCoords = this._coords(link.childId, canvasRect);

          if (this.state.activeId === link.parentId || this.state.activeId === link.childId) {
            highlightContext.beginPath();
            highlightContext.moveTo(parentCoords[0], parentCoords[1]);
            highlightContext.lineTo(childCoords[0], childCoords[1]);
            highlightContext.stroke();
          } else {
            context.beginPath();
            context.moveTo(parentCoords[0], parentCoords[1]);
            context.lineTo(childCoords[0], childCoords[1]);
            context.stroke();
          }
        }, this);
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var mapElement = this.refs.map;
      if (mapElement.scrollWidth !== this.state.canvasWidth || mapElement.scrollHeight !== this.state.canvasHeight) {
        this.setState({
          canvasWidth: mapElement.scrollWidth,
          canvasHeight: mapElement.scrollHeight
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
    key: '_onEnter',
    value: function _onEnter(id) {
      this.setState({ activeId: id });
    }
  }, {
    key: '_onLeave',
    value: function _onLeave() {
      this.setState({ activeId: null });
    }
  }, {
    key: '_renderItems',
    value: function _renderItems(items) {
      return items.map(function (item, index) {
        var classes = [CLASS_ROOT + "__item"];
        var active = this.state.activeId === item.id || this.props.data.links.some(function (link) {
          return (link.parentId === item.id || link.childId === item.id) && (link.parentId === this.state.activeId || link.childId === this.state.activeId);
        }, this);
        if (active) {
          classes.push(CLASS_ROOT + "__item--active");
        }
        return _react2.default.createElement(
          'li',
          { key: index, id: item.id, className: classes.join(' '),
            onMouseEnter: this._onEnter.bind(this, item.id),
            onMouseLeave: this._onLeave.bind(this, item.id) },
          item.node
        );
      }, this);
    }
  }, {
    key: '_renderCategories',
    value: function _renderCategories(categories) {
      var result = categories.map(function (category) {
        return _react2.default.createElement(
          'li',
          { key: category.id, className: CLASS_ROOT + "__category" },
          _react2.default.createElement(
            'ul',
            { className: CLASS_ROOT + "__category-items" },
            this._renderItems(category.items)
          ),
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + "__category-label" },
            category.label
          )
        );
      }, this);
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var categories = [];
      if (this.props.data.categories) {
        categories = this._renderCategories(this.props.data.categories);
      }

      return _react2.default.createElement(
        'div',
        { ref: 'map', className: classes.join(' ') },
        _react2.default.createElement('canvas', { ref: 'canvas', className: CLASS_ROOT + "__canvas",
          width: this.state.canvasWidth, height: this.state.canvasHeight }),
        _react2.default.createElement('canvas', { ref: 'highlightCanvas', className: CLASS_ROOT + "__canvas " + CLASS_ROOT + "__canvas--highlight",
          width: this.state.canvasWidth, height: this.state.canvasHeight }),
        _react2.default.createElement(
          'ol',
          { className: CLASS_ROOT + "__categories" },
          categories
        )
      );
    }
  }]);
  return ResourceMap;
}(_react.Component);

ResourceMap.displayName = 'ResourceMap';
exports.default = ResourceMap;


ResourceMap.propTypes = {
  data: _react.PropTypes.shape({
    categories: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      id: _react.PropTypes.string,
      label: _react.PropTypes.node,
      items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        id: _react.PropTypes.string,
        node: _react.PropTypes.node
      }))
    })),
    links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      parentId: _react.PropTypes.string,
      childId: _react.PropTypes.string
    }))
  }).isRequired
};
module.exports = exports['default'];