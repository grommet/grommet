import React, { Component } from 'react';
import { compose } from 'recompose';

import { Button } from '../Button';
import { Drop } from '../Drop';
import { withTheme } from '../hocs';

import doc from './doc';

class DropButton extends Component {
  static defaultProps = {
    a11yTitle: 'Open Drop',
    dropAlign: { top: 'top', left: 'left' },
  }

  constructor(props, context) {
    super(props, context);
    this.state = { show: props.open };
    this.checkRef = props.open;
  }

  componentDidMount() {
    // In case the caller starts with the drop open, before we have the
    // buttonRef, see if we have it now and re-render.
    if (this.checkRef && this.buttonRef) {
      this.checkRef = false;
      this.forceUpdate();
    }
  }

  componentWillReceiveProps({ open }) {
    const { show } = this.state;
    if (open !== undefined && open !== show) {
      this.setState({ show: open });
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
      disabled, dropAlign, dropContent, dropTarget, id, open, theme, ...rest
    } = this.props;
    const { show } = this.state;

    let drop;
    if (show && this.buttonRef) {
      drop = (
        <Drop
          key='drop'
          ref={(ref) => { this.dropRef = ref; }}
          id={id ? `${id}__drop` : undefined}
          restrictFocus={true}
          align={dropAlign}
          target={dropTarget || this.buttonRef}
          onClickOutside={this.onDropClose}
          onEsc={this.onDropClose}
        >
          {dropContent}
        </Drop>
      );
    }

    return [
      <Button
        key='button'
        id={id}
        ref={(ref) => { this.buttonRef = ref; }}
        onClick={disabled ? undefined : this.onToggle}
        {...rest}
      />,
      drop,
    ];
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(DropButton);
}

export default compose(
  withTheme,
)(DropButton);
