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
  constructor(props, context) {
    super(props, context);
    this._onClickPanel = this._onClickPanel.bind(this);
    this.state = {
      active: props.active || false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({ active: nextProps.active });
    }
  }

  _onClickPanel () {
    this.setState({ active : !this.state.active });
    this.props.onActive();
  }

  render () {
    const { animate, className, children, heading } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--active`]: this.state.active
      }
    );

    return (
      <ListItem className={classes} direction="column" pad="none">
        <Header
          role="tab"
          className={`${CLASS_ROOT}__header`}
          pad={{horizontal: 'medium', vertical: 'small'}}
          full="horizontal"
          direction="row"
          justify="between"
          align="center"
          onClick={this._onClickPanel}
          responsive={false}
        >
          {heading}
          <TabNextIcon className={`${CLASS_ROOT}__control`} />
        </Header>
        <Collapsible
          role="tabpanel"
          active={this.state.active}
          animate={animate}
        >
          {children}
        </Collapsible>
      </ListItem>
    );
  }
};

AccordionPanel.propTypes = {
  active: PropTypes.bool,
  animate: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  onActive: PropTypes.func
};
