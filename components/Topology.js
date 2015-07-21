// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Status = require('./icons/Status');

var CLASS_ROOT = "topology";

var Label = React.createClass({
  render: function () {
    return (<span className={CLASS_ROOT + "__label"}>{this.props.children}</span>);
  }
});

var Part = React.createClass({

  propTypes: {
    demarcate: React.PropTypes.bool,
    direction: React.PropTypes.oneOf(['row', 'column']).isRequired,
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    reverse: React.PropTypes.bool,
    status: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      demarcate: true,
      direction: 'row'
    };
  },

  render: function () {
    var classes = [CLASS_ROOT + "__part"];
    classes.push(CLASS_ROOT + "__part--direction-" + this.props.direction);
    if (this.props.demarcate) {
      classes.push(CLASS_ROOT + "__part--demarcate");
    }
    if (this.props.reverse) {
      classes.push(CLASS_ROOT + "__part--reverse");
    }
    if (! this.props.status && ! this.props.label
      && React.Children.count(this.props.children) === 0) {
      classes.push(CLASS_ROOT + "__part--empty");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var status;
    if (this.props.status) {
      status = <Status value={this.props.status} small={true} />;
    }
    var label;
    if (this.props.label) {
      label = <Label>{this.props.label}</Label>;
    }

    return (
      <div className={classes.join(' ')} id={this.props.id}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}>
        {status}
        {label}
        {this.props.children}
      </div>
    );
  }
});

var Parts = React.createClass({
  propTypes: {
    direction: React.PropTypes.oneOf(['row', 'column']).isRequired
  },

  getDefaultProps: function () {
    return {
      direction: 'column'
    };
  },

  render: function () {
    var classes = [CLASS_ROOT + "__parts"];
    classes.push(CLASS_ROOT + "__parts--direction-" + this.props.direction);
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

var Topology = React.createClass({

  statics: {
    Parts: Parts,
    Part: Part,
    Label: Label
  },

  propTypes: {
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        colorIndex: React.PropTypes.string,
        ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
      })
    )
  },

  getDefaultProps: function () {
    return {links: []};
  },

  _coords: function (id, canvasRect) {
    var result;
    let element = document.getElementById(id);
    if (! element) {
      console.log('!!! Topology is unable to find the link target with id:', id);
      result = [0, 0];
    } else {
      let rect = element.getBoundingClientRect();
      // see if the element has a status child, use that if it does
      let statusElements = element.querySelectorAll('.status-icon');
      if (statusElements.length === 1) {
        rect = statusElements[0].getBoundingClientRect();
      }
      result = [
        rect.left - canvasRect.left + (rect.width / 2),
        rect.top - canvasRect.top + (rect.height / 2)
      ];
    }
    return result;
  },

  _draw: function () {
    var canvasElement = this.refs.canvas.getDOMNode();
    // don't draw if we don't have a canvas to draw on, such as a unit test
    if (canvasElement.getContext) {
      var context = canvasElement.getContext('2d');
      var canvasRect = canvasElement.getBoundingClientRect();
      context.clearRect(0, 0, canvasRect.width, canvasRect.height);

      this.props.links.forEach(function (link, linkIndex) {

        let key = this.refs[link.colorIndex];
        let style = window.getComputedStyle(React.findDOMNode(key));
        let color = style.getPropertyValue('background-color');
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
            let p2 = this._coords(id, canvasRect);
            var delta = [Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1])];
            context.beginPath();
            context.moveTo(p1[0], p1[1]);
            let cp1;
            let cp2;

            if (this.state.highlights[id]) {
              context.lineWidth = 4;
            }

            if (delta[0] > delta[1]) {
              // larger X delta
              cp1 = [p1[0],
                Math.min(p1[1], p2[1]) + Math.max(18, (delta[1] / 2)) + (linkIndex * 2)];
              cp2 = [p2[0], cp1[1]];
            } else {
              // larger Y delta or equal
              cp1 = [Math.min(p1[0], p2[0]) + Math.max(18, (delta[0] / 2) + (linkIndex * 2)),
                p1[1]];
              cp2 = [cp1[0], p2[1]];
            }

            context.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
            context.stroke();
          }
        }, this);
      }, this);
    }
  },

  _layout: function () {
    var element = this.refs.topology.getDOMNode();
    if (element.clientWidth !== this.state.canvasWidth ||
      element.clientHeight !== this.state.canvasHeight) {
      this.setState({
        canvasWidth: element.clientWidth,
        canvasHeight: element.clientHeight
      });
    }
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _highlight: function (element) {
    let topology = React.findDOMNode(this.refs.topology);
    let highlighting = false;
    let highlights = {};
    while (element && element !== topology) {
      let id = element.getAttribute('id');
      if (id && this.state.linkIds[id]) {
        // see if we are linking to this id
        highlighting = true;
        highlights[id] = true;
      }
      element = element.parentNode;
    }
    this.setState({highlighting: highlighting, highlights: highlights});
  },

  _onMouseMove: function (event) {
    // debounce
    clearTimeout(this._mouseMoveTimer);
    this._mouseMoveTimer = setTimeout(this._highlight.bind(this, event.target), 100);
  },

  _onMouseLeave: function () {
    this.setState({highlights: {}});
  },

  _cacheLinkIds: function (links) {
    // Remember which ids are used in links. This makes highlighting faster.
    var linkIds = {};
    links.forEach(function (link) {
      link.ids.forEach(function (id) {
        linkIds[id] = true;
      });
    });
    this.setState({linkIds: linkIds});
  },

  getInitialState: function () {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
      highlighting: false,
      highlights: {}
    };
  },

  componentDidMount: function () {
    var topology = React.findDOMNode(this.refs.topology);
    topology.addEventListener('mousemove', this._onMouseMove);
    topology.addEventListener('mouseleave', this._onMouseLeave);
    window.addEventListener('resize', this._onResize);
    this._layout();
    this._cacheLinkIds(this.props.links);
  },

  componentWillReceiveProps: function (newProps) {
    this._cacheLinkIds(newProps.links);
  },

  componentDidUpdate: function () {
    this._layout();
    this._draw();
  },

  componentWillUnmount: function () {
    var topology = React.findDOMNode(this.refs.topology);
    topology.removeEventListener('mousemove', this._onMouseMove);
    topology.removeEventListener('mouseleave', this._onMouseLeave);
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var colorKeys = [];
    var colors = {};
    this.props.links.forEach(function (link) {
      if (link.colorIndex && ! colors[link.colorIndex]) {
        colorKeys.push(<div key={link.colorIndex} ref={link.colorIndex}
          className={"background-color-index-" + link.colorIndex}></div>);
        colors[link.colorIndex] = true;
      }
    });

    return (
      <div ref="topology" className={classes.join(' ')}>
        <canvas ref="canvas" className={CLASS_ROOT + "__canvas"}
          width={this.state.canvasWidth} height={this.state.canvasHeight} />
        {this.props.children}
        <div className={CLASS_ROOT + "__color-key"}>
          {colorKeys}
        </div>
      </div>
    );
  }

});

module.exports = Topology;
