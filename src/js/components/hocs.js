/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import getDisplayName from 'recompose/getDisplayName';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { AnnounceContext } from '../contexts';

let doc = () => x => x;

// Do not use the documentation wrapper in production.
if (process.env.NODE_ENV !== 'production') {
  doc = component => require(`./${component}/doc`).doc; // eslint-disable-line
}

export const withDocs = doc;

export const withFocus = WrappedComponent => {
  class FocusableComponent extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      const { withFocusRef } = nextProps;
      const { wrappedRef } = prevState;
      const nextWrappedRef = withFocusRef || wrappedRef;
      if (nextWrappedRef !== wrappedRef) {
        return { wrappedRef: nextWrappedRef };
      }
      return null;
    }

    mouseActive = false; // not in state because it doesn't affect rendering

    state = {
      focus: false,
      wrappedRef: React.createRef(),
    };

    componentDidMount = () => {
      const { wrappedRef } = this.state;
      window.addEventListener('mousedown', this.handleActiveMouse);

      // we could be using onFocus in the wrapper node itself
      // but react does not invoke it if you programically
      // call wrapperNode.focus() inside componentWillUnmount
      // see Drop "this.originalFocusedElement.focus();" for reference
      const wrapperNode = wrappedRef.current;
      if (wrapperNode && wrapperNode.addEventListener) {
        wrapperNode.addEventListener('focus', this.setFocus);
      }
    };

    componentWillUnmount = () => {
      const { wrappedRef } = this.state;
      window.removeEventListener('mousedown', this.handleActiveMouse);
      const wrapperNode = wrappedRef.current;
      if (wrapperNode && wrapperNode.addEventListener) {
        wrapperNode.removeEventListener('focus', this.setFocus);
      }
      clearTimeout(this.focusTimer);
      clearTimeout(this.mouseTimer);
    };

    handleActiveMouse = () => {
      // from https://marcysutton.com/button-focus-hell/
      this.mouseActive = true;
      // this avoids showing focus when clicking around
      clearTimeout(this.mouseTimer);
      // empirical number to reset mouseActive after
      // some time has passed without mousedown
      this.mouseTimer = setTimeout(() => {
        this.mouseActive = false;
      }, 150);
    };

    setFocus = () => {
      // delay setting focus to avoid interupting events,
      // 1ms was chosen empirically based on ie11 using Select and TextInput
      // with and without a FormField.
      clearTimeout(this.focusTimer);
      this.focusTimer = setTimeout(() => {
        const { focus } = this.state;
        if (!focus && !this.mouseActive) {
          this.setState({ focus: true });
        }
      }, 1);
    };

    resetFocus = () => {
      clearTimeout(this.focusTimer);
      this.focusTimer = setTimeout(() => {
        const { focus } = this.state;
        if (focus) {
          this.setState({ focus: false });
        }
      }, 1);
    };

    render() {
      const { onFocus, onBlur, withFocusRef, ...rest } = this.props;
      const { focus, wrappedRef } = this.state;
      return (
        <WrappedComponent
          ref={wrappedRef}
          focus={focus}
          {...rest}
          onFocus={event => {
            this.setFocus();
            if (onFocus) {
              onFocus(event);
            }
          }}
          onBlur={event => {
            this.resetFocus();
            if (onBlur) {
              onBlur(event);
            }
          }}
        />
      );
    }
  }

  const ForwardRef = React.forwardRef((props, ref) => (
    <FocusableComponent {...props} withFocusRef={ref} />
  ));

  ForwardRef.displayName = getDisplayName(WrappedComponent);
  ForwardRef.name = ForwardRef.displayName;
  ForwardRef.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatics(ForwardRef, WrappedComponent);

  return ForwardRef;
};

export const withForwardRef = WrappedComponent => {
  const ForwardRefComponent = React.forwardRef((props, ref) => (
    <WrappedComponent forwardRef={ref} {...props} />
  ));

  ForwardRefComponent.displayName = getDisplayName(WrappedComponent);
  ForwardRefComponent.name = ForwardRefComponent.displayName;
  ForwardRefComponent.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatics(ForwardRefComponent, WrappedComponent);

  return ForwardRefComponent;
};

export const withAnnounce = WrappedComponent => {
  const ForwardRef = React.forwardRef((props, ref) => (
    <AnnounceContext.Consumer>
      {announce => (
        <WrappedComponent {...props} announce={announce} ref={ref} />
      )}
    </AnnounceContext.Consumer>
  ));

  ForwardRef.displayName = getDisplayName(WrappedComponent);
  ForwardRef.name = ForwardRef.displayName;
  ForwardRef.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatics(ForwardRef, WrappedComponent);

  return ForwardRef;
};
