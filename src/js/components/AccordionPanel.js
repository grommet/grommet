import PropTypes from 'prop-types';
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import Header from './Header';
import Button from './Button';
import ListItem from './ListItem';
import CaretNextIcon from './icons/base/CaretNext';
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
      a11yTitle, active, animate, className, children, heading, pad
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
      activeTitle: a11yTitle || heading
    });

    return (
      <div>
        <ListItem className={classes} direction='column' pad='none'
          aria-expanded={active} aria-selected={active} role='tab'
          aria-label={a11yTitle || heading}>
          <Button fill={true} plain={true} onClick={this._onClickTab}>
            <Header pad={pad} direction='row'
              justify='between' align='center' responsive={false}
              className={`${CLASS_ROOT}__header`}>
              {heading}
              <CaretNextIcon
                className={`${CLASS_ROOT}__control`} />
            </Header>
          </Button>
        </ListItem>
        <Collapsible aria-label={tabContentTitle} role='tabpanel'
          active={active} animate={animate} pad={pad}>
          {children}
        </Collapsible>
      </div>
    );
  }
}

AccordionPanel.propTypes = {
  a11yTitle: PropTypes.string,
  active: PropTypes.bool, // set by Accordion
  animate: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  pad: Header.propTypes.pad
};

AccordionPanel.contextTypes = {
  intl: PropTypes.object
};
