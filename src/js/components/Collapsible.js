// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import Box from './Box';

import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';

const CLASS_ROOT = CSSClassnames.COLLAPSIBLE;

class Collapse extends Component {
  componentWillEnter (callback) {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const contentHeight = node.clientHeight;
      node.classList.remove('animate');
      node.style.height = 0;
      setTimeout(() => {
        node.classList.add('animate');
        node.style.height = `${contentHeight}px`;
        setTimeout(callback,
          parseFloat(getComputedStyle(node).transitionDuration) * 1000);
      });
    }
  }

  componentDidEnter () {
    const node = ReactDOM.findDOMNode(this);
    node.classList.remove('animate');
    node.style.height = '';
  }

  componentWillLeave (callback) {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const contentHeight = node.clientHeight;
      node.style.height = `${contentHeight}px`;
      setTimeout(() => {
        node.classList.add('animate');
        node.style.height = 0;
        setTimeout(callback,
          parseFloat(getComputedStyle(node).transitionDuration) * 1000);
      });
    }
  }

  render() {
    const classes = classnames(
      CLASS_ROOT,
      this.props.className
    );
    return <Box {...this.props} className={classes} />;
  }
}

class Collapsible extends Component {
  render () {
    const Component = this.props.animate ? TransitionGroup : Box;
    const collapseProps = Props.omit(this.props,
      Object.keys(Collapsible.propTypes));

    return (
      <Component className={`${CLASS_ROOT}__wrapper`}>
        {this.props.active &&
          <Collapse {...collapseProps} />
        }
      </Component>
    );
  }
}

Collapsible.propTypes = {
  active: PropTypes.bool,
  animate: PropTypes.bool
};

Collapsible.defaultProps = {
  animate: true
};

export default Collapsible;
