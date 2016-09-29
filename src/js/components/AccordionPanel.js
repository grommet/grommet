// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Header from './Header';
import Button from './Button';
import ListItem from './ListItem';
import TabNextIcon from './icons/base/TabNext';
import Collapsible from './Collapsible';

import CSSClassnames from '../utils/CSSClassnames';
import Intl from '../utils/Intl';

const CLASS_ROOT = CSSClassnames.ACCORDION_PANEL;

export default class AccordionPanel extends Component {
  constructor() {
    super();

    this._onClickTab = this._onClickTab.bind(this);
  }

  _onClickTab (event) {
    const { onChange } = this.props;
    if (event) {
      event.preventDefault();
    }
    onChange();
  }

  render () {
    const {
      active, animate, className, children, heading, pad
    } = this.props;
    const { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--active`]: active
      }
    );

    const tabContentTitle = Intl.getMessage(intl, 'Tab Contents', {
      activeTitle: heading
    });

    return (
      <ListItem className={classes} direction='column' pad='none'
        aria-expanded={active} aria-selected={active} role='tab'
        aria-label={heading}>
        <Button fill={true} plain={true} onClick={this._onClickTab}>
          <Header pad={pad} full='horizontal' direction='row' justify='between'
            align='center' responsive={false}
            className={`${CLASS_ROOT}__header`}>
            {heading}
            <TabNextIcon className={`${CLASS_ROOT}__control`} />
          </Header>
        </Button>
        <Collapsible aria-label={tabContentTitle} role='tabpanel'
          active={active} animate={animate} pad={pad}>
          {children}
        </Collapsible>
      </ListItem>
    );
  }
};

AccordionPanel.propTypes = {
  active: PropTypes.bool, // set by Accordion
  animate: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  pad: Header.propTypes.pad
};

AccordionPanel.contextTypes = {
  intl: PropTypes.object
};
