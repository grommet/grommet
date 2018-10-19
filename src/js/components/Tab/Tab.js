import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { withForwardRef, withTheme } from '../hocs';
import { evalStyle, normalizeColor } from '../../utils';

import { StyledTab } from './StyledTab';

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
      active,
      forwardRef,
      header,
      title,
      onMouseOver,
      onMouseOut,
      theme,
      ...rest
    } = this.props;
    const { over } = this.state;

    delete rest.onActivate;

    let normalizedTitle;
    if (!header) {
      if (typeof title !== 'string') {
        normalizedTitle = title;
      } else if (active) {
        normalizedTitle = <Text weight='bold'>{title}</Text>;
      } else {
        const color = normalizeColor('text', theme);
        normalizedTitle = <Text color={color}>{title}</Text>;
      }
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
        plain
        role='tab'
        aria-selected={active}
        aria-expanded={active}
        {...rest}
        onClick={this.onClickTab}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onFocus={this.onMouseOver}
        onBlur={this.onMouseOut}
      >
        {header ? (
          <StyledTab
            as={Box}
            background={theme.tab.background}
            theme={theme}
          >
            {header}
          </StyledTab>
        ) : (
          <StyledTab
            as={Box}
            background={theme.tab.background}
            theme={theme}
            pad={{ bottom: 'xsmall' }}
            margin={{ vertical: 'xxsmall', horizontal: 'small' }}
            border={{ side: 'bottom', size: 'small', color: borderColor }}
          >
            {normalizedTitle}
          </StyledTab>
        )}
      </Button>
    );
  }
}

let TabDoc;
if (process.env.NODE_ENV !== 'production') {
  TabDoc = require('./doc').doc(Tab); // eslint-disable-line global-require
}
const TabWrapper = compose(
  withTheme,
  withForwardRef,
)(TabDoc || Tab);

export { TabWrapper as Tab };
