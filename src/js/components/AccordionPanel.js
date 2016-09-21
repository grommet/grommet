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
  render () {
    const {
      active, animate, className, children, heading, onChange, pad
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--active`]: active
      }
    );

    return (
      <ListItem className={classes} direction="column" pad="none">
        <Header role="tab" className={`${CLASS_ROOT}__header`} pad={pad}
          full="horizontal" direction="row" justify="between" align="center"
          onClick={onChange} responsive={false}>
          {heading}
          <TabNextIcon className={`${CLASS_ROOT}__control`} />
        </Header>
        <Collapsible role="tabpanel" active={active} animate={animate}
          pad={pad}>
          {children}
        </Collapsible>
      </ListItem>
    );
  }
};

AccordionPanel.propTypes = {
  active: PropTypes.bool, // remove in 1.0, use {active from Accordion}
  animate: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  pad: Header.propTypes.pad
};
