// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'columns';

export default class Columns extends Component {

  constructor (props) {
    super(props);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this.state = { count: 1 };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
    clearTimeout(this._layoutTimer);
  }

  _onResize () {
    clearTimeout(this._layoutTimer);
    this._layoutTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    const container = this.refs.container;
    let count = 1;
    const child = container.childNodes[0];
    if (child) {
      const rect = container.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();
      count = Math.floor(rect.width / childRect.width);
    }

    if (count === 0) {
      count = 1;
    }

    this.setState({ count: count });
  }

  render() {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size
      }
    );

    const children = React.Children.toArray(this.props.children);
    const childrenPerColumn = Math.ceil(children.length / this.state.count);
    let groups = [];
    let offset = 0;
    while (groups.length < this.state.count) {
      groups.push(children.slice(offset, offset + childrenPerColumn));
      offset += childrenPerColumn;
    }

    const columns = groups.map((group, index) => (
      <div key={index} className={`${CLASS_ROOT}__column`}>
        {group}
      </div>
    ));

    return (
      <div ref="container" className={classes}>
        {columns}
      </div>
    );
  }
}

Columns.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
