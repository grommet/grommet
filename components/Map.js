'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactDom = require('react-dom');

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.MAP; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var ResourceMap = function (_Component) {
  (0, _inherits3.default)(ResourceMap, _Component);

  function ResourceMap(props, context) {
    (0, _classCallCheck3.default)(this, ResourceMap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResourceMap.__proto__ || (0, _getPrototypeOf2.default)(ResourceMap)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onLeave = _this._onLeave.bind(_this);

    _this.state = (0, _extends3.default)({}, _this._stateFromProps(props), {
      height: 100, width: 100, paths: [] });
    return _this;
  }

  (0, _createClass3.default)(ResourceMap, [{
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
        var classes = (0, _classnames5.default)(CLASS_ROOT + '__path', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__path--active', activeId === link.parentId || activeId === link.childId), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + pathColorIndex, pathColorIndex), _classnames));

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
        var classes = (0, _classnames5.default)(CLASS_ROOT + '__item', (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__item--active', active), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__item--plain', item.node && typeof item.node !== 'string'), _classnames2));

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
          props = (0, _objectWithoutProperties3.default)(_props2, ['className', 'data', 'vertical']);

      delete props.active;
      delete props.colorIndex;
      delete props.linkColorIndex;
      delete props.onActive;
      var _state2 = this.state,
          height = _state2.height,
          paths = _state2.paths,
          width = _state2.width;

      var classes = (0, _classnames5.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--vertical', vertical), className);

      var categories = void 0;
      if (data.categories) {
        categories = this._renderCategories(data.categories);
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref) {
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
  intl: _react.PropTypes.object
};

ResourceMap.propTypes = {
  active: _react.PropTypes.string,
  data: _react.PropTypes.shape({
    categories: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      id: _react.PropTypes.string,
      label: _react.PropTypes.node,
      items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        id: _react.PropTypes.string,
        label: _react.PropTypes.string,
        node: _react.PropTypes.node
      }))
    })),
    links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      childId: _react.PropTypes.string.isRequired,
      colorIndex: _react.PropTypes.string,
      parentId: _react.PropTypes.string.isRequired
    }))
  }).isRequired,
  linkColorIndex: _react.PropTypes.string,
  onActive: _react.PropTypes.func,
  vertical: _react.PropTypes.bool
};

ResourceMap.defaultProps = {
  linkColorIndex: 'graph-1'
};
module.exports = exports['default'];