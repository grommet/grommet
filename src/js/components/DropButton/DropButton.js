import React, { createRef, Component } from 'react';
import { compose } from 'recompose';

import { Button } from '../Button';
import { Drop } from '../Drop';
import { withForwardRef, withTheme } from '../hocs';
import { setFocusWithoutScroll } from '../../utils';

class DropButton extends Component {
  static defaultProps = {
    a11yTitle: 'Open Drop',
    dropAlign: { top: 'top', left: 'left' },
  };

  buttonRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      show: props.open || false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { show } = prevState;
    const { open } = nextProps;
    if (open !== undefined && open !== show) {
      return { show: open };
    }
    return null;
  }

  componentDidMount() {
    const { open } = this.props;
    if (open) {
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { show } = this.state;
    if (!show && prevState.show) {
      // focus on the button if the drop is closed
      setFocusWithoutScroll(this.buttonRef.current);
    }
  }

  onDropClose = () => {
    const { onClose } = this.props;
    this.setState({ show: false }, () => {
      if (onClose) {
        onClose();
      }
    });
  };

  onToggle = () => {
    const { onClose, onOpen } = this.props;
    const { show } = this.state;
    this.setState(
      { show: !show },
      () => (show ? onClose && onClose() : onOpen && onOpen()),
    );
  };

  render() {
    const {
      disabled,
      dropAlign,
      forwardRef,
      dropContent,
      dropTarget,
      id,
      open,
      theme,
      ...rest
    } = this.props;
    const { show } = this.state;

    delete rest.onClose;
    delete rest.onOpen;

    let drop;
    if (show && this.buttonRef.current) {
      drop = (
        <Drop
          id={id ? `${id}__drop` : undefined}
          restrictFocus
          align={dropAlign}
          target={dropTarget || this.buttonRef.current}
          onClickOutside={this.onDropClose}
          onEsc={event => {
            // prevents layer to close on esc
            event.stopPropagation();
            if (event.nativeEvent) {
              event.nativeEvent.stopImmediatePropagation();
            }
            this.onDropClose();
          }}
        >
          {dropContent}
        </Drop>
      );
    }

    return (
      <React.Fragment>
        <Button
          id={id}
          ref={this.buttonRef}
          disabled={disabled}
          onClick={this.onToggle}
          {...rest}
        />
        {drop}
      </React.Fragment>
    );
  }
}

let DropButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  DropButtonDoc = require('./doc').doc(DropButton); // eslint-disable-line global-require
}
const DropButtonWrapper = compose(
  withTheme,
  withForwardRef,
)(DropButtonDoc || DropButton);

export { DropButtonWrapper as DropButton };
