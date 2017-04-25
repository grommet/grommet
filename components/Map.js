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

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.MAP;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var ResourceMap = function (_Component) {
  _inherits(ResourceMap, _Component);

  function ResourceMap(props, context) {
    _classCallCheck(this, ResourceMap);

    var _this = _possibleConstructorReturn(this, (ResourceMap.__proto__ || Object.getPrototypeOf(ResourceMap)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onLeave = _this._onLeave.bind(_this);

    _this.state = _extends({}, _this._stateFromProps(props), {
      height: 100, width: 100, paths: [] });
    return _this;
  }

  _createClass(ResourceMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this._stateFromProps(nextProps), this._layout);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_hashItems',
    value: function _hashItems(data) {
      var result = {};
      data.categories.forEach(function (category) {
        category.items.forEach(function (item) {
          result[item.id] = item;
        });
      });
      return result;
    }
  }, {
    key: '_children',
    value: function _children(parentId, links, items) {
      var result = [];
      links.forEach(function (link) {
        if (link.parentId === parentId) {
          result.push(items[link.childId]);
        }
      });
      return result;
    }
  }, {
    key: '_parents',
    value: function _parents(childId, links, items) {
      var result = [];
      links.forEach(function (link) {
        if (link.childId === childId) {
          result.push(items[link.parentId]);
        }
      });
      return result;
    }
  }, {
    key: '_buildAriaLabels',
    value: function _buildAriaLabels(data, items) {
      var _this2 = this;

      var intl = this.context.intl;

      var labels = {};
      data.categories.forEach(function (category) {
        category.items.forEach(function (item) {

          var children = _this2._children(item.id, data.links, items);
          var parents = _this2._parents(item.id, data.links, items);

          var message = '';
          if (children.length === 0 && parents.length === 0) {
            message = _Intl2.default.getMessage(intl, 'No Relationship');
          } else {
            if (parents.length > 0) {
              var prefix = _Intl2.default.getMessage(intl, 'Parents');
              var _labels = parents.map(function (item) {
                return item.label || item.node;
              }).join();
              message += prefix + ': (' + _labels + ')';
            }
            if (children.length > 0) {
              if (parents.length > 0) {
                message += ', ';
              }
              var _prefix = _Intl2.default.getMessage(intl, 'Children');
              var _labels2 = children.map(function (item) {
                return item.label || item.node;
              }).join();
              message += _prefix + ': (' + _labels2 + ')';
            }
          }

          labels[item.id] = message;
        });
      });
      return labels;
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var activeId = props.hasOwnProperty('active') ? props.active : state.activeId;

      var items = this._hashItems(props.data);

      return {
        activeId: activeId,
        ariaLabels: this._buildAriaLabels(props.data, items),
        items: items
      };
    }
  }, {
    key: '_coords',
    value: function _coords(id, containerRect) {
      var element = document.getElementById(id);
      var rect = element.getBoundingClientRect();
      var left = rect.left - containerRect.left;
      var top = rect.top - containerRect.top;
      var midX = left + rect.width / 2;
      var midY = top + rect.height / 2;
      return {
        top: [midX, top],
        bottom: [midX, top + rect.height],
        left: [left, midY],
        right: [left + rect.width, midY]
      };
    }
  }, {
    key: '_buildPaths',
    value: function _buildPaths(map) {
      var _this3 = this;

      var _props = this.props,
          linkColorIndex = _props.linkColorIndex,
          links = _props.data.links,
          vertical = _props.vertical;
      var activeId = this.state.activeId;

      var rect = map.getBoundingClientRect();

      var paths = links.map(function (link, index) {
        var _classnames;

        var parentCoords = _this3._coords(link.parentId, rect);
        var childCoords = _this3._coords(link.childId, rect);

        var p1 = void 0,
            p2 = void 0;
        if (vertical) {
          if (parentCoords.right[0] < childCoords.left[0]) {
            p1 = parentCoords.right;
            p2 = childCoords.left;
          } else {
            p1 = parentCoords.left;
            p2 = childCoords.right;
          }
        } else {
          if (parentCoords.bottom[1] < childCoords.top[1]) {
            p1 = parentCoords.bottom;
            p2 = childCoords.top;
          } else {
            p1 = parentCoords.top;
            p2 = childCoords.bottom;
          }
        }

        var commands = 'M' + p1[0] + ',' + p1[1];
        var midX = p1[0] + (p2[0] - p1[0]) / 2;
        var midY = p1[1] + (p2[1] - p1[1]) / 2;
        if (vertical) {
          commands += ' Q ' + (midX + (p1[0] - midX) / 2) + ',' + p1[1] + (' ' + midX + ',' + midY);
          commands += ' Q ' + (midX - (p1[0] - midX) / 2) + ',' + p2[1] + (' ' + p2[0] + ',' + p2[1]);
        } else {
          commands += ' Q ' + p1[0] + ',' + (midY + (p1[1] - midY) / 2) + (' ' + midX + ',' + midY);
          commands += ' Q ' + p2[0] + ',' + (midY - (p1[1] - midY) / 2) + (' ' + p2[0] + ',' + p2[1]);
        }

        var pathColorIndex = link.colorIndex || linkColorIndex;
        var classes = (0, _classnames5.default)(CLASS_ROOT + '__path', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__path--active', activeId === link.parentId || activeId === link.childId), _defineProperty(_classnames, COLOR_INDEX + '-' + pathColorIndex, pathColorIndex), _classnames));

        return _react2.default.createElement('path', { key: index, fill: 'none', className: classes, d: commands });
      });

      return paths;
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var map = (0, _reactDom.findDOMNode)(this._mapRef);
      if (map) {
        this.setState({
          width: map.scrollWidth,
          height: map.scrollHeight,
          paths: this._buildPaths(map)
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
      this.setState({ activeId: id }, this._layout);
      if (this.props.onActive) {
        this.props.onActive(id);
      }
    }
  }, {
    key: '_onLeave',
    value: function _onLeave() {
      this.setState({ activeId: undefined }, this._layout);
      if (this.props.onActive) {
        this.props.onActive(undefined);
      }
    }
  }, {
    key: '_renderItems',
    value: function _renderItems(items) {
      var _this4 = this;

      var data = this.props.data;
      var _state = this.state,
          activeId = _state.activeId,
          ariaLabels = _state.ariaLabels;

      return items.map(function (item, index) {
        var _classnames2;

        var active = activeId === item.id || data.links.some(function (link) {
          return (link.parentId === item.id || link.childId === item.id) && (link.parentId === activeId || link.childId === activeId);
        });
        var classes = (0, _classnames5.default)(CLASS_ROOT + '__item', (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '__item--active', active), _defineProperty(_classnames2, CLASS_ROOT + '__item--plain', item.node && typeof item.node !== 'string'), _classnames2));

        return _react2.default.createElement(
          'li',
          { key: index, id: item.id, className: classes,
            'aria-label': (item.label || item.node) + ', ' + ariaLabels[item.id],
            onMouseEnter: _this4._onEnter.bind(_this4, item.id),
            onMouseLeave: _this4._onLeave.bind(_this4, item.id) },
          item.node || item.label
        );
      });
    }
  }, {
    key: '_renderCategories',
    value: function _renderCategories(categories) {
      var _this5 = this;

      return categories.map(function (category) {
        return _react2.default.createElement(
          'li',
          { key: category.id, className: CLASS_ROOT + '__category' },
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__category-label' },
            category.label
          ),
          _react2.default.createElement(
            'ul',
            { className: CLASS_ROOT + '__category-items' },
            _this5._renderItems(category.items)
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props2 = this.props,
          className = _props2.className,
          data = _props2.data,
          vertical = _props2.vertical,
          props = _objectWithoutProperties(_props2, ['className', 'data', 'vertical']);

      delete props.active;
      delete props.colorIndex;
      delete props.linkColorIndex;
      delete props.onActive;
      var _state2 = this.state,
          height = _state2.height,
          paths = _state2.paths,
          width = _state2.width;

      var classes = (0, _classnames5.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--vertical', vertical), className);

      var categories = void 0;
      if (data.categories) {
        categories = this._renderCategories(data.categories);
      }

      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref) {
            return _this6._mapRef = _ref;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'svg',
          { className: CLASS_ROOT + '__links',
            width: width, height: height, viewBox: '0 0 ' + width + ' ' + height,
            preserveAspectRatio: 'xMidYMid meet' },
          paths
        ),
        _react2.default.createElement(
          'ol',
          { className: CLASS_ROOT + '__categories' },
          categories
        )
      );
    }
  }]);

  return ResourceMap;
}(_react.Component);

ResourceMap.displayName = 'ResourceMap';
exports.default = ResourceMap;


ResourceMap.contextTypes = {
  intl: _propTypes2.default.object
};

ResourceMap.propTypes = {
  active: _propTypes2.default.string,
  data: _propTypes2.default.shape({
    categories: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      id: _propTypes2.default.string,
      label: _propTypes2.default.node,
      items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string,
        label: _propTypes2.default.string,
        node: _propTypes2.default.node
      }))
    })),
    links: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      childId: _propTypes2.default.string.isRequired,
      colorIndex: _propTypes2.default.string,
      parentId: _propTypes2.default.string.isRequired
    }))
  }).isRequired,
  linkColorIndex: _propTypes2.default.string,
  onActive: _propTypes2.default.func,
  vertical: _propTypes2.default.bool
};

ResourceMap.defaultProps = {
  linkColorIndex: 'graph-1'
};
module.exports = exports['default'];