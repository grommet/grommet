'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "topology";

var Label = (function (_Component) {
  _inherits(Label, _Component);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Label).apply(this, arguments));
  }

  _createClass(Label, [{
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
})(_react.Component);

var Part = (function (_Component2) {
  _inherits(Part, _Component2);

  function Part() {
    _classCallCheck(this, Part);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Part).apply(this, arguments));
  }

  _createClass(Part, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT + "__part"];
      classes.push(CLASS_ROOT + "__part--direction-" + this.props.direction);
      classes.push(CLASS_ROOT + "__part--justify-" + this.props.justify);
      classes.push(CLASS_ROOT + "__part--align-" + this.props.align);
      if (this.props.demarcate) {
        classes.push(CLASS_ROOT + "__part--demarcate");
      }
      if (this.props.reverse) {
        classes.push(CLASS_ROOT + "__part--reverse");
      }
      // handle undefined children
      var realChildren = 0;
      _react2.default.Children.forEach(this.props.children, function (child) {
        if (child) {
          realChildren += 1;
        }
      });
      if (!this.props.status && !this.props.label && realChildren === 0) {
        classes.push(CLASS_ROOT + "__part--empty");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var status;
      if (this.props.status) {
        status = _react2.default.createElement(_Status2.default, { value: this.props.status, small: true });
      }
      var label;
      if (this.props.label) {
        label = _react2.default.createElement(
          Label,
          null,
          this.props.label
        );
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), id: this.props.id,
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave },
        status,
        label,
        this.props.children
      );
    }
  }]);

  return Part;
})(_react.Component);

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

var Parts = (function (_Component3) {
  _inherits(Parts, _Component3);

  function Parts() {
    _classCallCheck(this, Parts);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Parts).apply(this, arguments));
  }

  _createClass(Parts, [{
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
      if (this.props.uniform) {
        var parts = this.refs.component.children;
        // clear old basis
        for (var i = 0; i < parts.length; i += 1) {
          parts[i].style.webkitFlexBasis = null;
          parts[i].style.flexBasis = null;
        }
        // find max
        var max = 0;
        for (var i = 0; i < parts.length; i += 1) {
          if ('column' === this.props.direction) {
            max = Math.max(max, parts[i].offsetHeight);
          } else {
            max = Math.max(max, parts[i].offsetWidth);
          }
        }
        // set basis
        for (var i = 0; i < parts.length; i += 1) {
          parts[i].style.webkitFlexBasis = '' + max + 'px';
          parts[i].style.flexBasis = '' + max + 'px';
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT + "__parts"];
      classes.push(CLASS_ROOT + "__parts--direction-" + this.props.direction);
      if (this.props.align) {
        classes.push(CLASS_ROOT + "__parts--align-" + this.props.align);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return _react2.default.createElement(
        'div',
        { ref: 'component', className: classes.join(' ') },
        this.props.children
      );
    }
  }]);

  return Parts;
})(_react.Component);

Parts.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
  direction: _react.PropTypes.oneOf(['row', 'column']).isRequired,
  uniform: _react.PropTypes.bool
};

Parts.defaultProps = {
  direction: 'column'
};

var Topology = (function (_Component4) {
  _inherits(Topology, _Component4);

  function Topology() {
    _classCallCheck(this, Topology);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Topology).call(this));

    _this4._layout = _this4._layout.bind(_this4);
    _this4._onResize = _this4._onResize.bind(_this4);
    _this4._onMouseMove = _this4._onMouseMove.bind(_this4);
    _this4._onMouseLeave = _this4._onMouseLeave.bind(_this4);

    _this4.state = {
      canvasWidth: 100,
      canvasHeight: 100,
      highlighting: false,
      highlights: {}
    };
    return _this4;
  }

  _createClass(Topology, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var topology = this.refs.topology;
      topology.addEventListener('mousemove', this._onMouseMove);
      topology.addEventListener('mouseleave', this._onMouseLeave);
      window.addEventListener('resize', this._onResize);
      this._layout();
      this._cacheLinkIds(this.props.links);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._cacheLinkIds(nextProps.links);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._layout();
      this._draw();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var topology = this.refs.topology;
      topology.removeEventListener('mousemove', this._onMouseMove);
      topology.removeEventListener('mouseleave', this._onMouseLeave);
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_coords',
    value: function _coords(id, canvasRect) {
      var result;
      var element = document.getElementById(id);
      if (!element) {
        console.log('!!! Topology is unable to find the link target with id:', id);
        result = [0, 0];
      } else {
        var rect = element.getBoundingClientRect();
        // see if the element has a status child, use that if it does
        var statusElements = element.querySelectorAll('.status-icon');
        if (statusElements.length === 1) {
          rect = statusElements[0].getBoundingClientRect();
        }
        result = [rect.left - canvasRect.left + rect.width / 2, rect.top - canvasRect.top + rect.height / 2];
      }
      return result;
    }
  }, {
    key: '_draw',
    value: function _draw() {
      var canvasElement = this.refs.canvas;
      // don't draw if we don't have a canvas to draw on, such as a unit test
      if (canvasElement.getContext) {
        var context = canvasElement.getContext('2d');
        var canvasRect = canvasElement.getBoundingClientRect();
        context.clearRect(0, 0, canvasRect.width, canvasRect.height);
        var linkOffset = this.props.linkOffset;

        this.props.links.forEach(function (link, linkIndex) {

          var key = this.refs[link.colorIndex];
          var style = window.getComputedStyle((0, _reactDom.findDOMNode)(key));
          var color = style.getPropertyValue('background-color');
          context.strokeStyle = color;
          context.lineWidth = 2;
          if (this.state.highlighting) {
            context.lineWidth = 1;
          }
          context.lineCap = 'round';
          var p1 = this._coords(link.ids[0], canvasRect);
          if (this.state.highlights[link.ids[0]]) {
            context.lineWidth = 4;
          }

          link.ids.forEach(function (id, idIndex) {
            if (idIndex > 0) {
              var p2 = this._coords(id, canvasRect);
              var delta = [Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1])];
              context.beginPath();
              context.moveTo(p1[0], p1[1]);
              var cp1 = undefined;
              var cp2 = undefined;

              if (this.state.highlights[id]) {
                context.lineWidth = 4;
              }

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

              context.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
              context.stroke();
            }
          }, this);
        }, this);
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var element = this.refs.contents;
      if (element.scrollWidth !== this.state.canvasWidth || element.scrollHeight !== this.state.canvasHeight) {
        this.setState({
          canvasWidth: element.scrollWidth,
          canvasHeight: element.scrollHeight
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
    key: '_highlight',
    value: function _highlight(element) {
      var topology = this.refs.topology;
      var highlighting = false;
      var highlights = {};
      while (element && element !== topology) {
        var id = element.getAttribute('id');
        if (id && this.state.linkIds[id]) {
          // see if we are linking to this id
          highlighting = true;
          highlights[id] = true;
        }
        element = element.parentNode;
      }
      this.setState({ highlighting: highlighting, highlights: highlights });
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      // debounce
      clearTimeout(this._mouseMoveTimer);
      this._mouseMoveTimer = setTimeout(this._highlight.bind(this, event.target), 100);
    }
  }, {
    key: '_onMouseLeave',
    value: function _onMouseLeave() {
      this.setState({ highlights: {} });
    }
  }, {
    key: '_cacheLinkIds',
    value: function _cacheLinkIds(links) {
      // Remember which ids are used in links. This makes highlighting faster.
      var linkIds = {};
      links.forEach(function (link) {
        link.ids.forEach(function (id) {
          linkIds[id] = true;
        });
      });
      this.setState({ linkIds: linkIds });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var colorKeys = [];
      var colors = {};
      this.props.links.forEach(function (link) {
        if (link.colorIndex && !colors[link.colorIndex]) {
          colorKeys.push(_react2.default.createElement('div', { key: link.colorIndex, ref: link.colorIndex,
            className: "background-color-index-" + link.colorIndex }));
          colors[link.colorIndex] = true;
        }
      });

      return _react2.default.createElement(
        'div',
        { ref: 'topology', className: classes.join(' ') },
        _react2.default.createElement('canvas', { ref: 'canvas', className: CLASS_ROOT + "__canvas",
          width: this.state.canvasWidth, height: this.state.canvasHeight }),
        _react2.default.createElement(
          'div',
          { ref: 'contents', className: CLASS_ROOT + "__contents" },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__color-key" },
          colorKeys
        )
      );
    }
  }]);

  return Topology;
})(_react.Component);

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