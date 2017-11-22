import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

import { withTheme } from '../hocs';

class Tab extends Component {
  state = {
    hover: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active && nextProps.active) {
      this.setState({ hover: undefined });
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
    const { active, title, onMouseOver, onMouseOut, ...rest } = this.props;
    const { hover } = this.state;
    delete rest.onActivate;

    const activeTitle = typeof title === 'string' ? (
      <Text><strong>{title}</strong></Text>
    ) : title;

    const inactiveTitle = typeof title === 'string' ? (
      <Text color='dark-4'>{title}</Text>
    ) : title;

    return (
      <Button
        plain={true}
        role='tab'
        aria-selected={active}
        aria-expanded={active}
        onClick={this.onClickTab}
        onMouseOver={(...args) => {
          if (!active) {
            this.setState({ hover: 'border' });
          }
          if (onMouseOver) {
            onMouseOver(args);
          }
        }}
        onMouseOut={(...args) => {
          if (!active) {
            this.setState({ hover: undefined });
          }
          if (onMouseOut) {
            onMouseOut(args);
          }
        }}
        {...rest}
      >
        <Box
          pad={{ bottom: 'xsmall' }}
          margin={{ horizontal: 'small' }}
          border={(active || hover) ? (
            { side: 'bottom', size: 'medium', color: hover || 'black' }
          ) : { side: 'bottom', size: 'medium', color: 'transparent' }}
        >
          {active ? activeTitle : inactiveTitle}
        </Box>
      </Button>
    );
  }
}

export default compose(
  withTheme,
)(Tab);
