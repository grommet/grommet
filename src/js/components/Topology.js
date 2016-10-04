// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Status from './icons/Status';

const CLASS_ROOT = CSSClassnames.TOPOLOGY;
const STATUS_ICON = CSSClassnames.STATUS_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

class Label extends Component {
  render () {
    return (
      <span className={CLASS_ROOT + "__label"}>{this.props.children}</span>
    );
  }
}

class Part extends Component {
  render () {
    const {
      align, children, className, demarcate, direction, justify, label,
      reverse, status, ...props
    } = this.props;
    let realChildren = 0;
    Children.forEach(children, (child) => {
      if (child) {
        realChildren += 1;
      }
    });
    const classes = classnames(
      `${CLASS_ROOT}__part`,
      {
        [`${CLASS_ROOT}__part--direction-${direction}`]: direction,
        [`${CLASS_ROOT}__part--justify-${justify}`]: justify,
        [`${CLASS_ROOT}__part--align-${align}`]: align,
        [`${CLASS_ROOT}__part--demarcate`]: demarcate,
        [`${CLASS_ROOT}__part--reverse`]: reverse,
        [`${CLASS_ROOT}__part--empty`]:
          (! status && ! label && realChildren === 0)
      },
      className
    );

    let statusIcon;
    if (status) {
      statusIcon = <Status value={status} size="small" />;
    }

    let labelLabel;
    if (label) {
      labelLabel = <Label>{label}</Label>;
    }

    return (
      <div {...props} className={classes}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}>
        {statusIcon}
        {labelLabel}
        {children}
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
    const { direction, uniform } = this.props;
    if (uniform) {
      let parts = this._componentRef.children;
      // clear old basis
      for (let i = 0; i < parts.length; i += 1) {
        parts[i].style.flexBasis = null;
      }
      // find max
      let max = 0;
      for (let i = 0; i < parts.length; i += 1) {
        if ('column' === direction) {
          max = Math.max(max, parts[i].offsetHeight);
        } else {
          max = Math.max(max, parts[i].offsetWidth);
        }
      }
      // set basis
      for (let i = 0; i < parts.length; i += 1) {
        parts[i].style.flexBasis = '' + max + 'px';
      }
    }
  }

  render () {
    const { align, children, className, direction } = this.props;
    const classes = classnames(
      `${CLASS_ROOT}__parts`,
      {
        [`${CLASS_ROOT}__parts--direction-${direction}`]: direction,
        [`${CLASS_ROOT}__part--align-${align}`]: align
      },
      className
    );
    return (
      <div ref={ref => this._componentRef = ref} className={classes}>
        {children}
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

export default class Topology extends Component {

  constructor(props, context) {
    super(props, context);

    this._layout = this._layout.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      height: 100,
      activeIds: {},
      paths: [],
      width: 100
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  }

  componentWillReceiveProps (nextProps) {
    this._layout();
  }

  componentWillUnmount () {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _coords (id, containerRect) {
    var result;
    let element = document.getElementById(id);
    if (! element) {
      console.log('!!! Topology is unable to find the link target with id:',
        id);
      result = [0, 0];
    } else {
      let rect = element.getBoundingClientRect();
      // see if the element has a status child, use that if it does
      let statusElements = element.querySelectorAll(`.${STATUS_ICON}`);
      if (statusElements.length === 1) {
        rect = statusElements[0].getBoundingClientRect();
      }
      result = [
        rect.left - containerRect.left + (rect.width / 2),
        rect.top - containerRect.top + (rect.height / 2)
      ];
    }
    return result;
  }

  _buildPaths (contents) {
    const { linkOffset, links } = this.props;
    const { activeIds } = this.state;
    const rect = contents.getBoundingClientRect();

    const paths = links.map((link, linkIndex) => {
      let commands = '';
      let active = false;

      let p1 = this._coords(link.ids[0], rect);
      link.ids.forEach((id, idIndex) => {
        if (activeIds[id]) {
          active = true;
        }
        if (idIndex > 0) {
          const p2 = this._coords(id, rect);
          const delta = [Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1])];
          commands += ` M${p1[0]},${p1[1]}`;
          let cp1;
          let cp2;

          if (delta[0] > delta[1]) {
            // larger X delta
            cp1 = [p1[0],
              Math.min(p1[1], p2[1]) +
                Math.max(linkOffset, (delta[1] / 2)) + (linkIndex * 2)];
            cp2 = [p2[0], cp1[1]];
          } else {
            // larger Y delta or equal
            let cp1xDelta =
              Math.max(linkOffset, (delta[0] / 2) + (linkIndex * 2));
            if (p1[0] > p2[0]) {
              cp1 = [p2[0] + cp1xDelta, p1[1]];
            } else {
              cp1 = [p1[0] - cp1xDelta, p1[1]];
            }
            cp2 = [cp1[0], p2[1]];
          }

          commands +=
            ` C${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${p2[0]},${p2[1]}`;
          p1 = p2;
        }
      });

      const classes = classnames(
        `${CLASS_ROOT}__path`, {
          [`${CLASS_ROOT}__path--active`]: active,
          [`${COLOR_INDEX}-${link.colorIndex}`]: link.colorIndex
        }
      );

      return (
        <path key={linkIndex} fill="none" className={classes} d={commands} />
      );
    });

    return paths;
  }

  _layout () {
    const contents = findDOMNode(this._contentsRef);
    if (contents) {
      this.setState({
        width: contents.scrollWidth,
        height: contents.scrollHeight,
        paths: this._buildPaths(contents)
      });
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _activate (element) {
    let topology = this._topologyRef;
    let activeIds = {};
    while (element && element !== topology) {
      let id = element.getAttribute('id');
      if (id) {
        activeIds[id] = true;
      }
      element = element.parentNode;
    }
    this.setState({ activeIds: activeIds }, this._layout);
  }

  _onMouseMove (event) {
    // debounce
    clearTimeout(this._mouseMoveTimer);
    this._mouseMoveTimer =
      setTimeout(this._activate.bind(this, event.target), 100);
  }

  _onMouseLeave () {
    clearTimeout(this._mouseMoveTimer);
    this.setState({ activeIds: {} }, this._layout);
  }

  render () {
    const { children, className, links, ...props } = this.props;
    delete props.linkOffset;
    const { height, paths, width } = this.state;
    const classes = classnames( CLASS_ROOT, {}, className );

    var colorKeys = [];
    var colors = {};
    links.forEach(link => {
      if (link.colorIndex && ! colors[link.colorIndex]) {
        colorKeys.push(<div key={link.colorIndex}
          className={`${BACKGROUND_COLOR_INDEX}-${link.colorIndex}`} />);
        colors[link.colorIndex] = true;
      }
    });

    return (
      <div ref={ref => this._topologyRef = ref} {...props} className={classes}>
        <svg className={`${CLASS_ROOT}__links`}
          width={width} height={height} viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet">
          {paths}
        </svg>
        <div ref={ref => this._contentsRef = ref}
          className={`${CLASS_ROOT}__contents`}
          onMouseMove={this._onMouseMove}
          onMouseLeave={this._onMouseLeave}>
          {children}
        </div>
        <div className={`${CLASS_ROOT}__color-key`}>
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
