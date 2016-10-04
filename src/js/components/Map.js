// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Intl from '../utils/Intl';

const CLASS_ROOT = CSSClassnames.MAP;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class ResourceMap extends Component {

  constructor(props, context) {
    super(props, context);

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onLeave = this._onLeave.bind(this);

    this.state = { ...(this._stateFromProps(props)),
      height: 100, width: 100, paths: [] };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps), this._layout);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  _hashItems (data) {
    let result = {};
    data.categories.forEach(category => {
      category.items.forEach(item => {
        result[item.id] = item;
      });
    });
    return result;
  }

  _children (parentId, links, items) {
    let result = [];
    links.forEach(link => {
      if (link.parentId === parentId) {
        result.push(items[link.childId]);
      }
    });
    return result;
  }

  _parents (childId, links, items) {
    let result = [];
    links.forEach((link) => {
      if (link.childId === childId) {
        result.push(items[link.parentId]);
      }
    });
    return result;
  }

  _buildAriaLabels (data, items) {
    const { intl } = this.context;
    let labels = {};
    data.categories.forEach(category => {
      category.items.forEach(item => {

        const children = this._children(item.id, data.links, items);
        const parents = this._parents(item.id, data.links, items);

        let message = '';
        if (children.length === 0 && parents.length === 0) {
          message = Intl.getMessage(intl, 'No Relationship');
        } else {
          if (parents.length > 0) {
            const prefix = Intl.getMessage(intl, 'Parents');
            const labels = parents.map(item => item.label || item.node).join();
            message += `${prefix}: (${labels})`;
          }
          if (children.length > 0) {
            if (parents.length > 0) {
              message += ', ';
            }
            const prefix = Intl.getMessage(intl, 'Children');
            const labels = children.map(item => item.label || item.node).join();
            message += `${prefix}: (${labels})`;
          }
        }

        labels[item.id] = message;
      });
    });
    return labels;
  }

  _stateFromProps (props, state = {}) {
    const activeId =
      props.hasOwnProperty('active') ? props.active : state.activeId;

    const items = this._hashItems(props.data);

    return {
      activeId: activeId,
      ariaLabels: this._buildAriaLabels(props.data, items),
      items: items
    };
  }

  _coords (id, containerRect) {
    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    const midX = left + (rect.width / 2);
    const midY = top + (rect.height / 2);
    return {
      top: [midX, top],
      bottom: [midX, top + rect.height],
      left: [left, midY],
      right: [left + rect.width, midY]
    };
  }

  _buildPaths (map) {
    const { linkColorIndex, data: { links }, vertical } = this.props;
    const { activeId } = this.state;
    const rect = map.getBoundingClientRect();

    const paths = links.map((link, index) => {

      const parentCoords = this._coords(link.parentId, rect);
      const childCoords = this._coords(link.childId, rect);

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

      let commands = `M${p1[0]},${p1[1]}`;
      const midX = p1[0] + ((p2[0] - p1[0]) / 2);
      const midY = p1[1] + ((p2[1] - p1[1]) / 2);
      if (vertical) {
        commands += ` Q ${midX + ((p1[0] - midX) / 2)},${p1[1]}` +
          ` ${midX},${midY}`;
        commands += ` Q ${midX - ((p1[0] - midX) / 2)},${p2[1]}` +
          ` ${p2[0]},${p2[1]}`;
      } else {
        commands += ` Q ${p1[0]},${midY + ((p1[1] - midY) / 2)}` +
          ` ${midX},${midY}`;
        commands += ` Q ${p2[0]},${midY - ((p1[1] - midY) / 2)}` +
          ` ${p2[0]},${p2[1]}`;
      }

      const pathColorIndex = link.colorIndex || linkColorIndex;
      const classes = classnames(
        `${CLASS_ROOT}__path`, {
          [`${CLASS_ROOT}__path--active`]:
            (activeId === link.parentId || activeId === link.childId),
          [`${COLOR_INDEX}-${pathColorIndex}`]: pathColorIndex
        }
      );

      return (
        <path key={index} fill="none" className={classes} d={commands} />
      );
    });

    return paths;
  }

  _layout () {
    const map = findDOMNode(this._mapRef);
    if (map) {
      this.setState({
        width: map.scrollWidth,
        height: map.scrollHeight,
        paths: this._buildPaths(map)
      });
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._layoutTimer);
    this._layoutTimer = setTimeout(this._layout, 50);
  }

  _onEnter (id) {
    this.setState({activeId: id}, this._layout);
    if (this.props.onActive) {
      this.props.onActive(id);
    }
  }

  _onLeave () {
    this.setState({activeId: undefined}, this._layout);
    if (this.props.onActive) {
      this.props.onActive(undefined);
    }
  }

  _renderItems (items) {
    const { data } = this.props;
    const { activeId, ariaLabels } = this.state;
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
          [`${CLASS_ROOT}__item--active`]: active,
          [`${CLASS_ROOT}__item--plain`]:
            (item.node && typeof item.node !== 'string')
        }
      );

      return (
        <li key={index} id={item.id} className={classes}
          aria-label={`${item.label || item.node}, ${ariaLabels[item.id]}`}
          onMouseEnter={this._onEnter.bind(this, item.id)}
          onMouseLeave={this._onLeave.bind(this, item.id)}>
          {item.node || item.label}
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
    delete props.active;
    delete props.colorIndex;
    delete props.linkColorIndex;
    delete props.onActive;
    const { height, paths, width } = this.state;
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
      <div ref={ref => this._mapRef = ref} {...props} className={classes}>
        <svg className={`${CLASS_ROOT}__links`}
          width={width} height={height} viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet">
          {paths}
        </svg>
        <ol className={`${CLASS_ROOT}__categories`}>
          {categories}
        </ol>
      </div>
    );
  }

}

ResourceMap.contextTypes = {
  intl: PropTypes.object
};

ResourceMap.propTypes = {
  active: PropTypes.string,
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        node: PropTypes.node
      }))
    })),
    links: PropTypes.arrayOf(PropTypes.shape({
      childId: PropTypes.string.isRequired,
      colorIndex: PropTypes.string,
      parentId: PropTypes.string.isRequired
    }))
  }).isRequired,
  linkColorIndex: PropTypes.string,
  onActive: PropTypes.func,
  vertical: PropTypes.bool
};

ResourceMap.defaultProps = {
  linkColorIndex: 'graph-1'
};
