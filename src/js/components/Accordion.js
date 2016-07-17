// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import List from './List';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ACCORDION;

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this._activatePanel = this._activatePanel.bind(this);

    this.state = {
      activeIndex: props.initialIndex
    };
  }

  _activatePanel (index) {
    this.setState({activeIndex: index});
  }

  render () {
    const {
      animate,
      className,
      children,
      colorIndex,
      openMulti
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className
    );

    const accordionChildren = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        id: 'accordion-panel-' + index,
        isOpen: !openMulti ? (this.state.activeIndex === index) : null,
        onTitleClick: () => {
          this._activatePanel(index);
        },
        animate
      });
    });

    return (
      <Box className={classes} colorIndex={colorIndex} separator="top">
        <List>
          {accordionChildren}
        </List>
      </Box>
    );
  }
};

Accordion.propTypes = {
  animate: PropTypes.bool,
  colorIndex: PropTypes.string
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
