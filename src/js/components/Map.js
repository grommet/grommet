// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.MAP;

export default class ResourceMap extends Component {

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
    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    return [
      rect.left - canvasRect.left + (rect.width / 2),
      rect.top - canvasRect.top + (rect.height / 2)
    ];
  }

  _draw () {
    const canvasElement = this.refs.canvas;
    const highlightCanvasElement = this.refs.highlightCanvas;
    // don't draw if we don't have a canvas to draw on, such as a unit test
    if (canvasElement.getContext) {
      const context = canvasElement.getContext('2d');
      const highlightContext = highlightCanvasElement.getContext('2d');
      const canvasRect = canvasElement.getBoundingClientRect();
      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
      highlightContext.clearRect(0, 0, canvasRect.width, canvasRect.height);

      context.strokeStyle = '#000000';
      context.lineWidth = 1;
      highlightContext.strokeStyle = '#000000';
      highlightContext.lineWidth = 2;

      this.props.data.links.forEach(link => {
        const parentCoords = this._coords(link.parentId, canvasRect);
        const childCoords = this._coords(link.childId, canvasRect);

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
      });
    }
  }

  _layout () {
    const mapElement = this.refs.map;
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
    return items.map((item, index) => {
      let classes = [`${CLASS_ROOT}__item`];
      const active = this.state.activeId === item.id ||
        this.props.data.links.some(link => {
          return ((link.parentId === item.id ||
            link.childId === item.id) &&
            (link.parentId === this.state.activeId ||
            link.childId === this.state.activeId));
        });
      if (active) {
        classes.push(`${CLASS_ROOT}__item--active`);
      }
      return (
        <li key={index} id={item.id} className={classes.join(' ')}
          onMouseEnter={this._onEnter.bind(this, item.id)}
          onMouseLeave={this._onLeave.bind(this, item.id)}>
          {item.node}
        </li>
      );
    });
  }

  _renderCategories (categories) {
    return categories.map(category => {
      return (
        <li key={category.id} className={`${CLASS_ROOT}__category`}>
          <div className={`${CLASS_ROOT}__category-label`}>
            {category.label}
          </div>
          <ul className={`${CLASS_ROOT}__category-items`}>
            {this._renderItems(category.items)}
          </ul>
        </li>
      );
    });
  }

  render () {
    const { data, vertical } = this.props;
    const { canvasHeight, canvasWidth } = this.state;
    let className = [CLASS_ROOT];
    if (vertical) {
      className.push(`${CLASS_ROOT}--vertical`);
    }
    if (this.props.className) {
      className.push(this.props.className);
    }

    let categories;
    if (data.categories) {
      categories = this._renderCategories(data.categories);
    }

    return (
      <div ref="map" className={className.join(' ')}>
        <canvas ref="canvas" className={`${CLASS_ROOT}__canvas`}
          width={canvasWidth} height={canvasHeight} />
        <canvas ref="highlightCanvas"
          className={`${CLASS_ROOT}__canvas ${CLASS_ROOT}__canvas--highlight`}
          width={canvasWidth} height={canvasHeight} />
        <ol className={`${CLASS_ROOT}__categories`}>
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
  }).isRequired,
  vertical: PropTypes.bool
};
