import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

import { withForwardRef, withTheme } from '../hocs';
import { colorForName } from '../../utils';

class Tab extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { active } = nextProps;
    const { over } = prevState;
    if (active && over) {
      return { over: undefined };
    }
    return null;
  }

  state = {}

  onMouseOver = (event) => {
    const { onMouseOver } = this.props;
    this.setState({ over: true });
    if (onMouseOver) {
      onMouseOver(event);
    }
  }

  onMouseOut = (event) => {
    const { onMouseOut } = this.props;
    this.setState({ over: undefined });
    if (onMouseOut) {
      onMouseOut(event);
    }
  }

  onClickTab = (event) => {
    const { onActivate } = this.props;
    if (event) {
      event.preventDefault();
    }
    onActivate();
  }

  render() {
    const {
      active, forwardRef, title, onMouseOver, onMouseOut, theme, ...rest
    } = this.props;
    const { over } = this.state;

    delete rest.onActivate;

    let normalizedTitle;
    if (typeof title !== 'string') {
      normalizedTitle = title;
    } else if (active) {
      normalizedTitle = <Text weight='bold'>{title}</Text>;
    } else {
      const color = theme.dark ?
        theme.global.colors.darkBackground.text :
        theme.global.colors.lightBackground.text;
      normalizedTitle = <Text color={color}>{title}</Text>;
    }

    let borderColor;
    if (active) {
      borderColor = theme.dark ? 'white' : 'black';
    } else if (over) {
      borderColor = colorForName('border', theme);
    } else {
      borderColor = 'transparent';
    }

    return (
      <Button
        ref={forwardRef}
        plain={true}
        role='tab'
        aria-selected={active}
        aria-expanded={active}
        {...rest}
        onClick={this.onClickTab}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <Box
          pad={{ bottom: 'xsmall' }}
          margin={{ horizontal: 'small' }}
          border={{ side: 'bottom', size: 'medium', color: borderColor }}
        >
          {normalizedTitle}
        </Box>
      </Button>
    );
  }
}

export default compose(
  withTheme,
  withForwardRef,
)(Tab);
