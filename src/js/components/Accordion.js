// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Headline from './Headline';
import List from './List';
import Paragraph from './Paragraph';

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
      headline,
      subHeadline,
      openMulti
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className
    );

    let content;
    if (headline || subHeadline) {
      content = (
        <Box align="center">
          {headline &&
            <Headline size="large" strong={true} margin="none" align="center">
              {headline}
            </Headline>
          }
          {subHeadline &&
            <Paragraph
              className={`${CLASS_ROOT}__sub-headline`}
              size="large"
              align="center"
            >
              {subHeadline}
            </Paragraph>
          }
        </Box>
      );
    }

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
      <Box className={classes} colorIndex={colorIndex}>
        {content}
        <Box separator="top">
          <List>
            {accordionChildren}
          </List>
        </Box>
      </Box>
    );
  }
};

Accordion.propTypes = {
  animate: PropTypes.bool,
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
  colorIndex: PropTypes.string
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
