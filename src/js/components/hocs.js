import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import getDisplayName from 'recompose/getDisplayName';

import baseTheme from '../themes/vanilla';
import { deepMerge } from '../utils';

export const withFocus = (WrappedComponent) => {
  class FocusableComponent extends Component {
    constructor() {
      super();
      this.handleActiveMouse = this.handleActiveMouse.bind(this);
      this.setFocus = this.setFocus.bind(this);
      this.state = {
        mouseActive: false,
        focus: false,
      };
    }
    componentDidMount() {
      window.addEventListener('mousedown', this.handleActiveMouse);

      // we could be using onFocus in the wrapper node itself
      // but react does not invoke it if you programically
      // call wrapperNode.focus() inside componentWillUnmount
      // see Drop "this.originalFocusedElement.focus();" for reference
      const wrapperNode = findDOMNode(this.wrapperRef);
      if (wrapperNode && wrapperNode.addEventListener) {
        wrapperNode.addEventListener('focus', this.setFocus);
      }
    }
    componentWillUnmount() {
      if (this.mouseTimer) {
        clearTimeout(this.mouseTimer);
      }
      window.removeEventListener('mousedown', this.handleActiveMouse);
      const wrapperNode = findDOMNode(this.wrapperRef);
      if (wrapperNode && wrapperNode.addEventListener) {
        wrapperNode.removeEventListener('focus', this.setFocus);
      }
    }
    handleActiveMouse() {
      this.setState({ mouseActive: true }, () => {
        // this avoids showing focus when clicking around
        if (this.mouseTimer) {
          clearTimeout(this.mouseTimer);
        }

        // empirical number to reset mouseActive after
        // some time has passed without mousedown
        this.mouseTimer = setTimeout(() => {
          this.setState({ mouseActive: false });
        }, 300);
      });
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
          ref={(ref) => {
            this.wrapperRef = ref;
          }}
          focus={focus}
          {...this.props}
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
