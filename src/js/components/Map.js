// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "map";

class ResourceMap extends Component {

  constructor() {
    super();

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._draw = this._draw.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onLeave = this._onLeave.bind(this);

    this.state = {
      canvasWidth: 100,
      canvasHeight: 100
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
    clearTimeout(this._drawTimer);
    this._drawTimer = setTimeout(this._draw, 50);
  }

  componentDidUpdate () {
    this._layout();
    clearTimeout(this._drawTimer);
    this._drawTimer = setTimeout(this._draw, 50);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  _coords (id, canvasRect) {
    var element = document.getElementById(id);
    var rect = element.getBoundingClientRect();
    return [
      rect.left - canvasRect.left + (rect.width / 2),
      rect.top - canvasRect.top + (rect.height / 2)
    ];
  }

  _draw () {
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

        if (this.state.activeId === link.parentId ||
          this.state.activeId === link.childId) {
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

  _layout () {
    var mapElement = this.refs.map;
    if (mapElement.scrollWidth !== this.state.canvasWidth ||
      mapElement.scrollHeight !== this.state.canvasHeight) {
      this.setState({
        canvasWidth: mapElement.scrollWidth,
        canvasHeight: mapElement.scrollHeight
      });
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._layoutTimer);
    this._layoutTimer = setTimeout(this._layout, 50);
  }

  _onEnter (id) {
    this.setState({activeId: id});
  }

  _onLeave () {
    this.setState({activeId: null});
  }

  _renderItems (items) {
    return items.map(function (item, index) {
      var classes = [CLASS_ROOT + "__item"];
      var active = this.state.activeId === item.id ||
        this.props.data.links.some(function (link) {
          return ((link.parentId === item.id ||
            link.childId === item.id) &&
            (link.parentId === this.state.activeId ||
            link.childId === this.state.activeId));
        }, this);
      if (active) {
        classes.push(CLASS_ROOT + "__item--active");
      }
      return (
        <li key={index} id={item.id} className={classes.join(' ')}
          onMouseEnter={this._onEnter.bind(this, item.id)}
          onMouseLeave={this._onLeave.bind(this, item.id)}>
          {item.node}
        </li>
      );
    }, this);
  }

  _renderCategories (categories) {
    var result = categories.map(function (category) {
      return (
        <li key={category.id} className={CLASS_ROOT + "__category"}>
          <ul className={CLASS_ROOT + "__category-items"}>
            {this._renderItems(category.items)}
          </ul>
          <div className={CLASS_ROOT + "__category-label"}>
            {category.label}
          </div>
        </li>
      );
    }, this);
    return result;
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var categories = [];
    if (this.props.data.categories) {
      categories = this._renderCategories(this.props.data.categories);
    }

    return (
      <div ref="map" className={classes.join(' ')}>
        <canvas ref="canvas" className={CLASS_ROOT + "__canvas"}
          width={this.state.canvasWidth} height={this.state.canvasHeight} />
        <canvas ref="highlightCanvas" className={CLASS_ROOT + "__canvas " + CLASS_ROOT + "__canvas--highlight"}
          width={this.state.canvasWidth} height={this.state.canvasHeight} />
        <ol className={CLASS_ROOT + "__categories"}>
          {categories}
        </ol>
      </div>
    );
  }

}

ResourceMap.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        node: PropTypes.node
      }))
    })),
    links: PropTypes.arrayOf(PropTypes.shape({
      parentId: PropTypes.string,
      childId: PropTypes.string
    }))
  }).isRequired
};

module.exports = ResourceMap;
