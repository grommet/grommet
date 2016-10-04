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

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TOPOLOGY; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var STATUS_ICON = _CSSClassnames2.default.STATUS_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Label = function (_Component) {
  (0, _inherits3.default)(Label, _Component);

  function Label() {
    (0, _classCallCheck3.default)(this, Label);
    return (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).apply(this, arguments));
  }

  (0, _createClass3.default)(Label, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + "__label" },
        this.props.children
      );
    }
  }]);
  return Label;
}(_react.Component);

Label.displayName = 'Label';

var Part = function (_Component2) {
  (0, _inherits3.default)(Part, _Component2);

  function Part() {
    (0, _classCallCheck3.default)(this, Part);
    return (0, _possibleConstructorReturn3.default)(this, (Part.__proto__ || (0, _getPrototypeOf2.default)(Part)).apply(this, arguments));
  }

  (0, _createClass3.default)(Part, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var align = _props.align;
      var children = _props.children;
      var className = _props.className;
      var demarcate = _props.demarcate;
      var direction = _props.direction;
      var justify = _props.justify;
      var label = _props.label;
      var reverse = _props.reverse;
      var status = _props.status;
      var props = (0, _objectWithoutProperties3.default)(_props, ['align', 'children', 'className', 'demarcate', 'direction', 'justify', 'label', 'reverse', 'status']);

      var realChildren = 0;
      _react.Children.forEach(children, function (child) {
        if (child) {
          realChildren += 1;
        }
      });
      var classes = (0, _classnames5.default)(CLASS_ROOT + '__part', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__part--direction-' + direction, direction), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__part--justify-' + justify, justify), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__part--align-' + align, align), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__part--demarcate', demarcate), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__part--reverse', reverse), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__part--empty', !status && !label && realChildren === 0), _classnames), className);

      var statusIcon = void 0;
      if (status) {
        statusIcon = _react2.default.createElement(_Status2.default, { value: status, size: 'small' });
      }

      var labelLabel = void 0;
      if (label) {
        labelLabel = _react2.default.createElement(
          Label,
          null,
          label
        );
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { className: classes,
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave }),
        statusIcon,
        labelLabel,
        children
      );
    }
  }]);
  return Part;
}(_react.Component);

Part.displayName = 'Part';


Part.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
  demarcate: _react.PropTypes.bool,
  direction: _react.PropTypes.oneOf(['row', 'column']).isRequired,
  id: _react.PropTypes.string,
  justify: _react.PropTypes.oneOf(['start', 'center', 'between', 'end']),
  label: _react.PropTypes.string,
  reverse: _react.PropTypes.bool,
  status: _react.PropTypes.string
};

Part.defaultProps = {
  demarcate: true,
  direction: 'row',
  justify: 'center',
  align: 'stretch'
};

var Parts = function (_Component3) {
  (0, _inherits3.default)(Parts, _Component3);

  function Parts() {
    (0, _classCallCheck3.default)(this, Parts);
    return (0, _possibleConstructorReturn3.default)(this, (Parts.__proto__ || (0, _getPrototypeOf2.default)(Parts)).apply(this, arguments));
  }

  (0, _createClass3.default)(Parts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._makeUniform();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._makeUniform();
    }
  }, {
    key: '_makeUniform',
    value: function _makeUniform() {
      var _props2 = this.props;
      var direction = _props2.direction;
      var uniform = _props2.uniform;

      if (uniform) {
        var parts = this._componentRef.children;
        // clear old basis
        for (var i = 0; i < parts.length; i += 1) {
          parts[i].style.flexBasis = null;
        }
        // find max
        var max = 0;
        for (var _i = 0; _i < parts.length; _i += 1) {
          if ('column' === direction) {
            max = Math.max(max, parts[_i].offsetHeight);
          } else {
            max = Math.max(max, parts[_i].offsetWidth);
          }
        }
        // set basis
        for (var _i2 = 0; _i2 < parts.length; _i2 += 1) {
          parts[_i2].style.flexBasis = '' + max + 'px';
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2,
          _this4 = this;

      var _props3 = this.props;
      var align = _props3.align;
      var children = _props3.children;
      var className = _props3.className;
      var direction = _props3.direction;

      var classes = (0, _classnames5.default)(CLASS_ROOT + '__parts', (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__parts--direction-' + direction, direction), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__part--align-' + align, align), _classnames2), className);
      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this4._componentRef = _ref;
          }, className: classes },
        children
      );
    }
  }]);
  return Parts;
}(_react.Component);

Parts.displayName = 'Parts';


Parts.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
  direction: _react.PropTypes.oneOf(['row', 'column']).isRequired,
  uniform: _react.PropTypes.bool
};

Parts.defaultProps = {
  direction: 'column'
};

var Topology = function (_Component4) {
  (0, _inherits3.default)(Topology, _Component4);

  function Topology(props, context) {
    (0, _classCallCheck3.default)(this, Topology);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (Topology.__proto__ || (0, _getPrototypeOf2.default)(Topology)).call(this, props, context));

    _this5._layout = _this5._layout.bind(_this5);
    _this5._onResize = _this5._onResize.bind(_this5);
    _this5._onMouseMove = _this5._onMouseMove.bind(_this5);
    _this5._onMouseLeave = _this5._onMouseLeave.bind(_this5);

    _this5.state = {
      height: 100,
      activeIds: {},
      paths: [],
      width: 100
    };
    return _this5;
  }

  (0, _createClass3.default)(Topology, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._layout();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_coords',
    value: function _coords(id, containerRect) {
      var result;
      var element = document.getElementById(id);
      if (!element) {
        console.log('!!! Topology is unable to find the link target with id:', id);
        result = [0, 0];
      } else {
        var rect = element.getBoundingClientRect();
        // see if the element has a status child, use that if it does
        var statusElements = element.querySelectorAll('.' + STATUS_ICON);
        if (statusElements.length === 1) {
          rect = statusElements[0].getBoundingClientRect();
        }
        result = [rect.left - containerRect.left + rect.width / 2, rect.top - containerRect.top + rect.height / 2];
      }
      return result;
    }
  }, {
    key: '_buildPaths',
    value: function _buildPaths(contents) {
      var _this6 = this;

      var _props4 = this.props;
      var linkOffset = _props4.linkOffset;
      var links = _props4.links;
      var activeIds = this.state.activeIds;

      var rect = contents.getBoundingClientRect();

      var paths = links.map(function (link, linkIndex) {
        var _classnames3;

        var commands = '';
        var active = false;

        var p1 = _this6._coords(link.ids[0], rect);
        link.ids.forEach(function (id, idIndex) {
          if (activeIds[id]) {
            active = true;
          }
          if (idIndex > 0) {
            var p2 = _this6._coords(id, rect);
            var delta = [Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1])];
            commands += ' M' + p1[0] + ',' + p1[1];
            var cp1 = void 0;
            var cp2 = void 0;

            if (delta[0] > delta[1]) {
              // larger X delta
              cp1 = [p1[0], Math.min(p1[1], p2[1]) + Math.max(linkOffset, delta[1] / 2) + linkIndex * 2];
              cp2 = [p2[0], cp1[1]];
            } else {
              // larger Y delta or equal
              var cp1xDelta = Math.max(linkOffset, delta[0] / 2 + linkIndex * 2);
              if (p1[0] > p2[0]) {
                cp1 = [p2[0] + cp1xDelta, p1[1]];
              } else {
                cp1 = [p1[0] - cp1xDelta, p1[1]];
              }
              cp2 = [cp1[0], p2[1]];
            }

            commands += ' C' + cp1[0] + ',' + cp1[1] + ' ' + cp2[0] + ',' + cp2[1] + ' ' + p2[0] + ',' + p2[1];
            p1 = p2;
          }
        });

        var classes = (0, _classnames5.default)(CLASS_ROOT + '__path', (_classnames3 = {}, (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '__path--active', active), (0, _defineProperty3.default)(_classnames3, COLOR_INDEX + '-' + link.colorIndex, link.colorIndex), _classnames3));

        return _react2.default.createElement('path', { key: linkIndex, fill: 'none', className: classes, d: commands });
      });

      return paths;
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var contents = (0, _reactDom.findDOMNode)(this._contentsRef);
      if (contents) {
        this.setState({
          width: contents.scrollWidth,
          height: contents.scrollHeight,
          paths: this._buildPaths(contents)
        });
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
    key: '_activate',
    value: function _activate(element) {
      var topology = this._topologyRef;
      var activeIds = {};
      while (element && element !== topology) {
        var id = element.getAttribute('id');
        if (id) {
          activeIds[id] = true;
        }
        element = element.parentNode;
      }
      this.setState({ activeIds: activeIds }, this._layout);
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      // debounce
      clearTimeout(this._mouseMoveTimer);
      this._mouseMoveTimer = setTimeout(this._activate.bind(this, event.target), 100);
    }
  }, {
    key: '_onMouseLeave',
    value: function _onMouseLeave() {
      clearTimeout(this._mouseMoveTimer);
      this.setState({ activeIds: {} }, this._layout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _props5 = this.props;
      var children = _props5.children;
      var className = _props5.className;
      var links = _props5.links;
      var props = (0, _objectWithoutProperties3.default)(_props5, ['children', 'className', 'links']);

      delete props.linkOffset;
      var _state = this.state;
      var height = _state.height;
      var paths = _state.paths;
      var width = _state.width;

      var classes = (0, _classnames5.default)(CLASS_ROOT, {}, className);

      var colorKeys = [];
      var colors = {};
      links.forEach(function (link) {
        if (link.colorIndex && !colors[link.colorIndex]) {
          colorKeys.push(_react2.default.createElement('div', { key: link.colorIndex,
            className: BACKGROUND_COLOR_INDEX + '-' + link.colorIndex }));
          colors[link.colorIndex] = true;
        }
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref3) {
            return _this7._topologyRef = _ref3;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'svg',
          { className: CLASS_ROOT + '__links',
            width: width, height: height, viewBox: '0 0 ' + width + ' ' + height,
            preserveAspectRatio: 'xMidYMid meet' },
          paths
        ),
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this7._contentsRef = _ref2;
            },
            className: CLASS_ROOT + '__contents',
            onMouseMove: this._onMouseMove,
            onMouseLeave: this._onMouseLeave },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__color-key' },
          colorKeys
        )
      );
    }
  }]);
  return Topology;
}(_react.Component);

Topology.displayName = 'Topology';
exports.default = Topology;


Topology.propTypes = {
  links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    colorIndex: _react.PropTypes.string,
    ids: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired
  })),
  linkOffset: _react.PropTypes.number
};

Topology.defaultProps = {
  links: [],
  linkOffset: 18
};

Topology.Parts = Parts;
Topology.Part = Part;
Topology.Label = Label;
module.exports = exports['default'];