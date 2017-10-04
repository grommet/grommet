import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { deepMerge } from '../utils';

export const withFocus = (WrappedComponent) => {
  class FocusableComponent extends Component {
    state = {
      mouseActive: false,
      focus: false,
    }
    setMouseActive() {
      this.setState({ mouseActive: true });
    }
    resetMouseActive() {
      this.setState({ mouseActive: false });
    }
    setFocus() {
      const { mouseActive } = this.state;
      if (mouseActive === false) {
        this.setState({ focus: true });
      }
    }
    resetFocus() {
      this.setState({ focus: false });
    }
    render() {
      const { focus } = this.state;
      return (
        <WrappedComponent
          focus={focus}
          {...this.props}
          onMouseDown={(event) => {
            this.setMouseActive();
            const { onMouseDown } = this.props;
            if (onMouseDown) {
              onMouseDown(event);
            }
          }}
          onMouseUp={(event) => {
            this.resetMouseActive();
            const { onMouseUp } = this.props;
            if (onMouseUp) {
              onMouseUp(event);
            }
          }}
          onFocus={(event) => {
            this.setFocus();
            const { onFocus } = this.props;
            if (onFocus) {
              onFocus(event);
            }
          }}
          onBlur={(event) => {
            this.resetFocus();
            const { onBlur } = this.props;
            if (onBlur) {
              onBlur(event);
            }
          }}
        />
      );
    }
  }

  return FocusableComponent;
};

export const withTheme = (WrappedComponent) => {
  class ThemedComponent extends Component {
    static contextTypes = {
      theme: PropTypes.object,
    }
    render() {
      const { theme, ...rest } = this.props;
      const { theme: contextTheme } = this.context;
      const localTheme = deepMerge(contextTheme, theme);
      return (
        <WrappedComponent theme={localTheme} {...rest} />
      );
    }
  }

  return ThemedComponent;
};

export default { withFocus, withTheme };
