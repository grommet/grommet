import React, { Component } from 'react';
import { compose } from 'recompose';

import { Button } from '../Button';
import { Drop } from '../Drop';
import { withForwardRef, withTheme } from '../hocs';
import { setFocusWithoutScroll } from '../../utils';

import doc from './doc';

class DropButton extends Component {
  static defaultProps = {
    a11yTitle: 'Open Drop',
    dropAlign: { top: 'top', left: 'left' },
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { forwardRef, open } = nextProps;
    const { buttonRef, show } = prevState;
    const nextButtonRef = forwardRef || buttonRef;
    const reRenderOnMount = (show === undefined && open);
    if (open !== undefined && open !== show) {
      return { show: open, reRenderOnMount, buttonRef: nextButtonRef };
    }
    if (nextButtonRef !== buttonRef) {
      return { buttonRef: nextButtonRef };
    }
    return null;
  }

  state = {
    buttonRef: React.createRef(),
  }

  componentDidMount() {
    const { buttonRef, reRenderOnMount } = this.state;
    // In case the caller starts with the drop open, before we have the
    // buttonRef, see if we have it now and re-render.
    if (reRenderOnMount && buttonRef.current) {
      this.setState({ reRenderOnMount: false }); // eslint-disable-line
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.show && prevState.show) {
      // focus on the button if the drop is closed
      setFocusWithoutScroll(this.state.buttonRef.current);
    }
  }

  onDropClose = () => {
    const { onClose, open } = this.props;
    this.setState({ show: (open || false) }, () => {
      if (onClose) {
        onClose();
      }
    });
  }

  onToggle = () => {
    const { onClose, onOpen } = this.props;
    const { show } = this.state;
    this.setState({ show: !show },
      show ? (onClose && onClose()) : (onOpen && onOpen())
    );
  }

  render() {
    const {
      disabled, dropAlign, forwardRef, dropContent, dropTarget, id, open,
      theme, ...rest
    } = this.props;
    const { buttonRef, show } = this.state;

    let drop;
    if (show && buttonRef.current) {
      drop = (
        <Drop
          id={id ? `${id}__drop` : undefined}
          restrictFocus={true}
          align={dropAlign}
          target={dropTarget || buttonRef.current}
          onClickOutside={this.onDropClose}
          onEsc={this.onDropClose}
        >
          {dropContent}
        </Drop>
      );
    }

    return (
      <React.Fragment>
        <Button
          id={id}
          ref={buttonRef}
          onClick={disabled ? undefined : this.onToggle}
          {...rest}
        />
        {drop}
      </React.Fragment>
    );
  }
}

export default compose(
  withTheme,
  withForwardRef,
)(
  process.env.NODE_ENV !== 'production' ? doc(DropButton) : DropButton
);
