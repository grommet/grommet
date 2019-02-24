import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
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

  onToggle = () => {
    const { onClose, onOpen } = this.props;
    const { show } = this.state;
    this.setState({ show: !show }, () =>
      show ? onClose && onClose() : onOpen && onOpen(),
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
const DropButtonWrapper = compose(withForwardRef)(DropButtonDoc || DropButton);

export { DropButtonWrapper as DropButton };

/* PropTypes for UXPin Merge */
DropButton.propTypes = {
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  disabled: PropTypes.bool,
  dropAlign: PropTypes.shape({
    top: PropTypes.oneOf(["top", "bottom"]),
    bottom: PropTypes.oneOf(["top", "bottom"]),
    right: PropTypes.oneOf(["left", "right"]),
    left: PropTypes.oneOf(["left", "right"]),
  }),
  dropContent: PropTypes.node,
  dropTarget: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  active: PropTypes.bool,
  color: PropTypes.string,
  fill: PropTypes.bool,
  focusIndicator: PropTypes.bool,
  hoverIndicator: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  reverse: PropTypes.bool,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  as: PropTypes.string,
}

/* Export for UXPin Merge */
export default DropButton;