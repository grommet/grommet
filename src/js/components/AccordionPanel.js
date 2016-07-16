// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Heading from './Heading';
import ListItem from './ListItem';
import OpenIcon from './icons/base/Add';
import CloseIcon from './icons/base/Subtract';
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
    const { animate, className, children, title } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--active`]: this.state.isOpen
      }
    );

    let panelControlIcon = <OpenIcon colorIndex="brand" />;
    if (this.state.isOpen) {
      panelControlIcon = <CloseIcon colorIndex="brand" />;
    }

    return (
      <ListItem className={classes} direction="column" pad="none">
        <Box
          pad={{horizontal: 'medium', vertical: 'small'}}
          full="horizontal"
          direction="row"
          justify="between"
          align="center"
          onClick={this._onClickPanel}
          responsive={false}
        >
          <Heading tag="h2" margin="small">{title}</Heading>
          {panelControlIcon}
        </Box>
        <Box
          full="horizontal"
          pad={{horizontal: 'medium'}}
        >
          <Collapsible isOpen={this.state.isOpen} animate={animate}>
            {children}
          </Collapsible>
        </Box>
      </ListItem>
    );
  }
};

AccordionPanel.propTypes = {
  title: PropTypes.string.isRequired
};
