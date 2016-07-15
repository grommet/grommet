// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import ListItem from 'grommet/components/ListItem';
import OpenIcon from 'grommet/components/icons/base/Add';
import CloseIcon from 'grommet/components/icons/base/Subtract';
import Collapsible from './Collapsible';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ACCORDION_PANEL;

export default class AccordionPanel extends Component {
  constructor (props) {
    super(props);
    this._onClickPanel = this._onClickPanel.bind(this);
    this.state = {
      isOpen: false
    };
  }

  _onClickPanel () {
    this.setState({ isOpen : !this.state.isOpen });
  }

  render () {
    const { panelTitle, children } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      this.props.className,
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
          <Heading tag="h2" margin="small">{panelTitle}</Heading>
          {panelControlIcon}
        </Box>
        <Box
          full="horizontal"
          pad={{horizontal: 'medium'}}
        >
          <Collapsible isOpen={this.state.isOpen} children={children} />
        </Box>
      </ListItem>
    );
  }
};

AccordionPanel.propTypes = {
  panelTitle: PropTypes.string.isRequired
};
