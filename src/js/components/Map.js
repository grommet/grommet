// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Intl from '../utils/Intl';

const CLASS_ROOT = CSSClassnames.MAP;

export default class ResourceMap extends Component {

  constructor(props, context) {
    super(props, context);

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._draw = this._draw.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onLeave = this._onLeave.bind(this);
    this._getChildren = this._getChildren.bind(this);
    this._getParent = this._getParent.bind(this);
    this._mapNode = this._mapNode.bind(this);

    this.state = { canvasHeight: 100, canvasWidth: 100 };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  }

  componentDidUpdate () {
    this._layout();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  _coords (id, canvasRect) {
    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    const left = rect.left - canvasRect.left;
    const top = rect.top - canvasRect.top;
    const midX = left + (rect.width / 2);
    const midY = top + (rect.height / 2);
    return {
      top: [midX, top],
      bottom: [midX, top + rect.height],
      left: [left, midY],
      right: [left + rect.width, midY]
    };
  }

  _draw () {
    const { vertical } = this.props;
    const { dark } = this.context;
    const canvasElement = this.canvasRef;
    const highlightCanvasElement = this.highlightRef;
    // don't draw if we don't have a canvas to draw on, such as a unit test
    if (canvasElement.getContext) {
      const baseContext = canvasElement.getContext('2d');
      const highlightContext = highlightCanvasElement.getContext('2d');
      const canvasRect = canvasElement.getBoundingClientRect();
      baseContext.clearRect(0, 0, canvasRect.width, canvasRect.height);
      highlightContext.clearRect(0, 0, canvasRect.width, canvasRect.height);

      baseContext.strokeStyle = dark ? '#ffffff' : '#000000';
      baseContext.lineWidth = 1;
      highlightContext.strokeStyle = dark ? '#ffffff' : '#000000';
      highlightContext.lineWidth = 2;

      this.props.data.links.forEach(link => {
        const parentCoords = this._coords(link.parentId, canvasRect);
        const childCoords = this._coords(link.childId, canvasRect);
        const context = (this.state.activeId === link.parentId ||
          this.state.activeId === link.childId) ? highlightContext :
            baseContext;

        context.beginPath();
        let p1, p2;
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
        context.moveTo(p1[0], p1[1]);
        const midX = p1[0] + ((p2[0] - p1[0]) / 2);
        const midY = p1[1] + ((p2[1] - p1[1]) / 2);
        if (vertical) {
          context.quadraticCurveTo(midX + ((p1[0] - midX) / 2), p1[1],
            midX, midY);
          context.quadraticCurveTo(midX - ((p1[0] - midX) / 2), p2[1],
            p2[0], p2[1]);
        } else {
          context.quadraticCurveTo(p1[0], midY + ((p1[1] - midY) / 2),
            midX, midY);
          context.quadraticCurveTo(p2[0], midY - ((p1[1] - midY) / 2),
            p2[0], p2[1]);
        }
        context.stroke();
      });
    }
  }

  _layout () {
    const mapElement = this.mapRef;
    if (mapElement) {
      if (mapElement.scrollWidth !== this.state.canvasWidth ||
        mapElement.scrollHeight !== this.state.canvasHeight) {
        this.setState({
          canvasWidth: mapElement.scrollWidth,
          canvasHeight: mapElement.scrollHeight
        });
      }
      clearTimeout(this._drawTimer);
      this._drawTimer = setTimeout(this._draw, 50);
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
    this.setState({activeId: undefined});
  }

  _getChildren (parentId) {
    const { data } = this.props;
    let children = [];
    data.links.forEach((link) => {
      if (link.parentId === parentId) {
        children.push(link.childId);
      }
    });
    if (children.length > 0) {
      return this._mapNode(children);
    } else {
      return undefined;
    }
  }

  _getParent (childId) {
    const { data } = this.props;
    let parent = [];
    data.links.forEach((link) => {
      if (link.childId === childId) {
        parent.push(link.parentId);
      }
    });
    if (parent.length > 0) {
      return this._mapNode(parent);
    } else {
      return undefined;
    }
  }

  _mapNode (elements) {
    const { data } = this.props;
    return elements.map((element) => {
      let node;
      data.categories.some((category) => {
        return category.items.some((item) => {
          if (item.id === element) {
            node = item.node;
            return true;
          }
        });
      });
      return node;
    });
  }

  _renderItems (items) {
    const { data } = this.props;
    const { activeId } = this.state;
    const { intl } = this.context;
    return items.map((item, index) => {
      const active = activeId === item.id ||
        data.links.some(link => {
          return ((link.parentId === item.id ||
            link.childId === item.id) &&
            (link.parentId === activeId ||
            link.childId === activeId));
        });
      const classes = classnames(
        `${CLASS_ROOT}__item`, {
          [`${CLASS_ROOT}__item--active`]: active
        }
      );
      const children = this._getChildren(item.id);
      const parent = this._getParent(item.id);

      let relationshipMessage = '';
      if (!children && !parent) {
        relationshipMessage = Intl.getMessage(intl, 'No Relationship');
      } else {
        if (parent) {
          const parentMessage = Intl.getMessage(intl, 'Parent');
          relationshipMessage += (
            `, ${parentMessage}: (${parent.join()})`
          );
        }
        if (children) {
          const childrenMessage = Intl.getMessage(intl, 'Children');
          relationshipMessage += (
            `, ${childrenMessage}: (${children.join()})`
          );
        }
      }
      return (
        <li key={index} id={item.id} className={classes}
          role='text' aria-label={`${item.node} ${relationshipMessage}`}
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
    const { className, data, vertical, ...props } = this.props;
    const { canvasHeight, canvasWidth } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--vertical`]: vertical
      },
      className
    );

    let categories;
    if (data.categories) {
      categories = this._renderCategories(data.categories);
    }

    return (
      <div ref={ref => this.mapRef = ref} {...props} className={classes}>
        <canvas ref={ref => this.canvasRef = ref} width={canvasWidth}
          height={canvasHeight} className={`${CLASS_ROOT}__canvas`}  />
        <canvas ref={ref => this.highlightRef = ref}
          className={`${CLASS_ROOT}__canvas ${CLASS_ROOT}__canvas--highlight`}
          width={canvasWidth} height={canvasHeight} />
        <ol className={`${CLASS_ROOT}__categories`}>
          {categories}
        </ol>
      </div>
    );
  }

}

ResourceMap.contextTypes = {
  dark: PropTypes.bool,
  intl: PropTypes.object
};

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
