// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Status from './icons/Status';

const CLASS_ROOT = "topology";

class Label extends Component {
  render () {
    return (<span className={CLASS_ROOT + "__label"}>{this.props.children}</span>);
  }
}

class Part extends Component {
  render () {
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
    if (! this.props.status && ! this.props.label && realChildren === 0) {
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
}

Part.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
  demarcate: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  id: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'between', 'end']),
  label: PropTypes.string,
  reverse: PropTypes.bool,
  status: PropTypes.string
};

Part.defaultProps = {
  demarcate: true,
  direction: 'row',
  justify: 'center',
  align: 'stretch'
};

class Parts extends Component {

  componentDidMount () {
    this._makeUniform();
  }

  componentDidUpdate () {
    this._makeUniform();
  }

  _makeUniform () {
    if (this.props.uniform) {
      let parts = this.refs.component.children;
      // clear old basis
      for (let i = 0; i < parts.length; i += 1) {
        parts[i].style.webkitFlexBasis = null;
        parts[i].style.flexBasis = null;
      }
      // find max
      let max = 0;
      for (let i = 0; i < parts.length; i += 1) {
        if ('column' === this.props.direction) {
          max = Math.max(max, parts[i].offsetHeight);
        } else {
          max = Math.max(max, parts[i].offsetWidth);
        }
      }
      // set basis
      for (let i = 0; i < parts.length; i += 1) {
        parts[i].style.webkitFlexBasis = '' + max + 'px';
        parts[i].style.flexBasis = '' + max + 'px';
      }
    }
  }

  render () {
    var classes = [CLASS_ROOT + "__parts"];
    classes.push(CLASS_ROOT + "__parts--direction-" + this.props.direction);
    if (this.props.align) {
      classes.push(CLASS_ROOT + "__parts--align-" + this.props.align);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div ref="component" className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

Parts.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  uniform: PropTypes.bool
};

Parts.defaultProps = {
  direction: 'column'
};

class Topology extends Component {

  constructor () {
    super();

    this._layout = this._layout.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      canvasWidth: 100,
      canvasHeight: 100,
      highlighting: false,
      highlights: {}
    };
  }

  componentDidMount () {
    var topology = this.refs.topology;
    topology.addEventListener('mousemove', this._onMouseMove);
    topology.addEventListener('mouseleave', this._onMouseLeave);
    window.addEventListener('resize', this._onResize);
    this._layout();
    this._cacheLinkIds(this.props.links);
  }

  componentWillReceiveProps (nextProps) {
    this._cacheLinkIds(nextProps.links);
  }

  componentDidUpdate () {
    this._layout();
    this._draw();
  }

  componentWillUnmount () {
    var topology = this.refs.topology;
    topology.removeEventListener('mousemove', this._onMouseMove);
    topology.removeEventListener('mouseleave', this._onMouseLeave);
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _coords (id, canvasRect) {
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
  }

  _draw () {
    var canvasElement = this.refs.canvas;
    // don't draw if we don't have a canvas to draw on, such as a unit test
    if (canvasElement.getContext) {
      var context = canvasElement.getContext('2d');
      var canvasRect = canvasElement.getBoundingClientRect();
      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
      var linkOffset = this.props.linkOffset;

      this.props.links.forEach(function (link, linkIndex) {

        let key = this.refs[link.colorIndex];
        let style = window.getComputedStyle(ReactDOM.findDOMNode(key));
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
                Math.min(p1[1], p2[1]) + Math.max(linkOffset, (delta[1] / 2)) + (linkIndex * 2)];
              cp2 = [p2[0], cp1[1]];
            } else {
              // larger Y delta or equal
              let cp1xDelta = Math.max(linkOffset, (delta[0] / 2) + (linkIndex * 2));
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

  _layout () {
    var element = this.refs.contents;
    if (element.scrollWidth !== this.state.canvasWidth ||
      element.scrollHeight !== this.state.canvasHeight) {
      this.setState({
        canvasWidth: element.scrollWidth,
        canvasHeight: element.scrollHeight
      });
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _highlight (element) {
    let topology = this.refs.topology;
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
  }

  _onMouseMove (event) {
    // debounce
    clearTimeout(this._mouseMoveTimer);
    this._mouseMoveTimer = setTimeout(this._highlight.bind(this, event.target), 100);
  }

  _onMouseLeave () {
    this.setState({highlights: {}});
  }

  _cacheLinkIds (links) {
    // Remember which ids are used in links. This makes highlighting faster.
    var linkIds = {};
    links.forEach(function (link) {
      link.ids.forEach(function (id) {
        linkIds[id] = true;
      });
    });
    this.setState({linkIds: linkIds});
  }

  render () {
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
        <div ref="contents" className={CLASS_ROOT + "__contents"}>
          {this.props.children}
        </div>
        <div className={CLASS_ROOT + "__color-key"}>
          {colorKeys}
        </div>
      </div>
    );
  }

}

Topology.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      colorIndex: PropTypes.string,
      ids: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ),
  linkOffset: PropTypes.number
};

Topology.defaultProps = {
  links: [],
  linkOffset: 18
};

Topology.Parts = Parts;
Topology.Part = Part;
Topology.Label = Label;

module.exports = Topology;
