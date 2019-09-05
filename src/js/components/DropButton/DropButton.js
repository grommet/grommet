import React, { createRef, Component } from 'react';
import { compose } from 'recompose';

import { Button } from '../Button';
import { Drop } from '../Drop';
import { withForwardRef } from '../hocs';
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
    const { forwardRef } = this.props;
    const { show } = this.state;
    if (!show && prevState.show) {
      // focus on the button if the drop is closed
      setFocusWithoutScroll((forwardRef || this.buttonRef).current);
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

  onToggle = event => {
    const { onClick, onClose, onOpen } = this.props;
    const { show } = this.state;
    this.setState({ show: !show }, () =>
      show ? onClose && onClose() : onOpen && onOpen(),
    );
    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      disabled,
      dropAlign,
      dropProps,
      forwardRef,
      dropContent,
      dropTarget,
      id,
      open,
      ...rest
    } = this.props;
    const { show } = this.state;

    delete rest.onClose;
    delete rest.onOpen;

    let drop;
    if (show && (forwardRef || this.buttonRef).current) {
      drop = (
        <Drop
          id={id ? `${id}__drop` : undefined}
          restrictFocus
          align={dropAlign}
          target={dropTarget || (forwardRef || this.buttonRef).current}
          onClickOutside={this.onDropClose}
          onEsc={this.onDropClose}
          {...dropProps}
        >
          {dropContent}
        </Drop>
      );
    }

    return (
      <React.Fragment>
        <Button
          id={id}
          ref={forwardRef || this.buttonRef}
          disabled={disabled}
          {...rest}
          onClick={this.onToggle}
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
const DropButtonWrapper = compose(withForwardRef)(DropButtonDoc || DropButton);

export { DropButtonWrapper as DropButton };
