// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Header from './Header';
import ListItem from './ListItem';
import TabNextIcon from './icons/base/TabNext';
import Collapsible from './Collapsible';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ACCORDION_PANEL;

export default class AccordionPanel extends Component {
  constructor (props) {
    super(props);
    this._onClickPanel = this._onClickPanel.bind(this);
    this.state = {
      isOpen: props.isOpen || false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  _onClickPanel () {
    this.setState({ isOpen : !this.state.isOpen });
    this.props.onTitleClick();
  }

  render () {
    const { animate, className, children, heading } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--active`]: this.state.isOpen
      }
    );

    return (
      <ListItem className={classes} direction="column" pad="none">
        <Header
          className={`${CLASS_ROOT}-heading`}
          pad={{horizontal: 'medium', vertical: 'small'}}
          full="horizontal"
          direction="row"
          justify="between"
          align="center"
          onClick={this._onClickPanel}
          responsive={false}
        >
          {heading}
          <TabNextIcon />
        </Header>
        <Collapsible isOpen={this.state.isOpen} animate={animate}>
          {children}
        </Collapsible>
      </ListItem>
    );
  }
};

AccordionPanel.propTypes = {
  animate: PropTypes.bool,
  heading: PropTypes.node.isRequired
};
