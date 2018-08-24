import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { withForwardRef, withTheme } from '../hocs';
import { evalStyle, normalizeColor } from '../../utils';

import { doc } from './doc';

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
      const color = normalizeColor(theme.global.text.color, theme);
      normalizedTitle = <Text color={color}>{title}</Text>;
    }

    let borderColor;
    if (active) {
      borderColor = theme.dark ? 'white' : 'black';
    } else if (over) {
      borderColor = theme.dark ? 'white' : 'black';
    } else {
      borderColor = evalStyle(normalizeColor(theme.global.control.border.color, theme), theme);
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
          border={{ side: 'bottom', size: 'small', color: borderColor }}
        >
          {normalizedTitle}
        </Box>
      </Button>
    );
  }
}

let TabWrapper = Tab;
if (process.env.NODE_ENV !== 'production') {
  TabWrapper = doc(TabWrapper);
}

TabWrapper = compose(
  withTheme,
  withForwardRef,
)(TabWrapper);

export { TabWrapper as Tab };
