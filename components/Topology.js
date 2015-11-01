// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Status = require('./icons/Status');

var CLASS_ROOT = "topology";

var Label = React.createClass({
  displayName: 'Label',

  render: function render() {
    return React.createElement(
      'span',
      { className: CLASS_ROOT + "__label" },
      this.props.children
    );
  }
});

var Part = React.createClass({
  displayName: 'Part',

  propTypes: {
    align: React.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
    demarcate: React.PropTypes.bool,
    direction: React.PropTypes.oneOf(['row', 'column']).isRequired,
    id: React.PropTypes.string,
    justify: React.PropTypes.oneOf(['start', 'center', 'between', 'end']),
    label: React.PropTypes.string,
    reverse: React.PropTypes.bool,
    status: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      demarcate: true,
      direction: 'row',
      justify: 'center',
      align: 'stretch'
    };
  },

  render: function render() {
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
    React.Children.forEach(this.props.children, function (child) {
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
      status = React.createElement(Status, { value: this.props.status, small: true });
    }
    var label;
    if (this.props.label) {
      label = React.createElement(
        Label,
        null,
        this.props.label
      );
    }

    return React.createElement(
      'div',
      { className: classes.join(' '), id: this.props.id,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave },
      status,
      label,
      this.props.children
    );
  }
});

var Parts = React.createClass({
  displayName: 'Parts',

  propTypes: {
    align: React.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
    direction: React.PropTypes.oneOf(['row', 'column']).isRequired,
    uniform: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      direction: 'column'
    };
  },

  componentDidMount: function componentDidMount() {
    this._makeUniform();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._makeUniform();
  },

  _makeUniform: function _makeUniform() {
    if (this.props.uniform) {
      var parts = ReactDOM.findDOMNode(this.refs.component).children;
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
  },

  render: function render() {
    var classes = [CLASS_ROOT + "__parts"];
    classes.push(CLASS_ROOT + "__parts--direction-" + this.props.direction);
    if (this.props.align) {
      classes.push(CLASS_ROOT + "__parts--align-" + this.props.align);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return React.createElement(
      'div',
      { ref: 'component', className: classes.join(' ') },
      this.props.children
    );
  }
});

var Topology = React.createClass({
  displayName: 'Topology',

  propTypes: {
    links: React.PropTypes.arrayOf(React.PropTypes.shape({
      colorIndex: React.PropTypes.string,
      ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    })),
    linkOffset: React.PropTypes.number
  },

  statics: {
    Parts: Parts,
    Part: Part,
    Label: Label
  },

  getDefaultProps: function getDefaultProps() {
    return {
      links: [],
      linkOffset: 18
    };
  },

  getInitialState: function getInitialState() {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
      highlighting: false,
      highlights: {}
    };
  },

  componentDidMount: function componentDidMount() {
    var topology = React.findDOMNode(this.refs.topology);
    topology.addEventListener('mousemove', this._onMouseMove);
    topology.addEventListener('mouseleave', this._onMouseLeave);
    window.addEventListener('resize', this._onResize);
    this._layout();
    this._cacheLinkIds(this.props.links);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this._cacheLinkIds(newProps.links);
  },

  componentDidUpdate: function componentDidUpdate() {
    this._layout();
    this._draw();
  },

  componentWillUnmount: function componentWillUnmount() {
    var topology = React.findDOMNode(this.refs.topology);
    topology.removeEventListener('mousemove', this._onMouseMove);
    topology.removeEventListener('mouseleave', this._onMouseLeave);
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  _coords: function _coords(id, canvasRect) {
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
  },

  _draw: function _draw() {
    var canvasElement = ReactDOM.findDOMNode(this.refs.canvas);
    // don't draw if we don't have a canvas to draw on, such as a unit test
    if (canvasElement.getContext) {
      var context = canvasElement.getContext('2d');
      var canvasRect = canvasElement.getBoundingClientRect();
      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
      var linkOffset = this.props.linkOffset;

      this.props.links.forEach(function (link, linkIndex) {

        var key = this.refs[link.colorIndex];
        var style = window.getComputedStyle(React.findDOMNode(key));
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
  },

  _layout: function _layout() {
    var element = ReactDOM.findDOMNode(this.refs.contents);
    if (element.scrollWidth !== this.state.canvasWidth || element.scrollHeight !== this.state.canvasHeight) {
      this.setState({
        canvasWidth: element.scrollWidth,
        canvasHeight: element.scrollHeight
      });
    }
  },

  _onResize: function _onResize() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _highlight: function _highlight(element) {
    var topology = React.findDOMNode(this.refs.topology);
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
  },

  _onMouseMove: function _onMouseMove(event) {
    // debounce
    clearTimeout(this._mouseMoveTimer);
    this._mouseMoveTimer = setTimeout(this._highlight.bind(this, event.target), 100);
  },

  _onMouseLeave: function _onMouseLeave() {
    this.setState({ highlights: {} });
  },

  _cacheLinkIds: function _cacheLinkIds(links) {
    // Remember which ids are used in links. This makes highlighting faster.
    var linkIds = {};
    links.forEach(function (link) {
      link.ids.forEach(function (id) {
        linkIds[id] = true;
      });
    });
    this.setState({ linkIds: linkIds });
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var colorKeys = [];
    var colors = {};
    this.props.links.forEach(function (link) {
      if (link.colorIndex && !colors[link.colorIndex]) {
        colorKeys.push(React.createElement('div', { key: link.colorIndex, ref: link.colorIndex,
          className: "background-color-index-" + link.colorIndex }));
        colors[link.colorIndex] = true;
      }
    });

    return React.createElement(
      'div',
      { ref: 'topology', className: classes.join(' ') },
      React.createElement('canvas', { ref: 'canvas', className: CLASS_ROOT + "__canvas",
        width: this.state.canvasWidth, height: this.state.canvasHeight }),
      React.createElement(
        'div',
        { ref: 'contents', className: CLASS_ROOT + "__contents" },
        this.props.children
      ),
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__color-key" },
        colorKeys
      )
    );
  }

});

module.exports = Topology;