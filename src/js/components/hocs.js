import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'recompose/getDisplayName';

import baseTheme from '../themes/vanilla';
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

  FocusableComponent.displayName = getDisplayName(WrappedComponent);

  return FocusableComponent;
};

export const withTheme = (WrappedComponent) => {
  class ThemedComponent extends Component {
    static contextTypes = {
      theme: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context);
      this.buildTheme(props, context);
    }

    componentWillReceiveProps(nextProps) {
      // only merge on existence changes
      if ((nextProps.theme && !this.props.theme) ||
        (!nextProps.theme && this.props.theme)) {
        this.buildTheme(nextProps, this.context);
      }
    }

    buildTheme = (props, context) => {
      const { theme } = props;
      const { theme: contextTheme } = context;
      const localTheme = deepMerge(baseTheme, contextTheme, theme);
      this.state = { theme: localTheme };
    }

    render() {
      const { theme } = this.state;
      return (
        <WrappedComponent {...this.props} theme={theme} />
      );
    }
  }

  ThemedComponent.displayName = getDisplayName(WrappedComponent);

  return ThemedComponent;
};

export default { withFocus, withTheme };
