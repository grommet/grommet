import React, { Component } from 'react';
import { compose } from 'recompose';

import { Button } from '../Button';
import { Drop } from '../Drop';

import { withTheme } from '../hocs';

import doc from './doc';

class DropButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showDrop: props.open,
    };
  }

  componentWillReceiveProps({ open }) {
    const { showDrop } = this.state;
    if (open !== showDrop) {
      this.setState({ showDrop: open });
    }
  }
  onDropClose = () => {
    this.setState({
      showDrop: false,
    });
  }

  render() {
    const {
      background,
      children,
      control,
      id,
      messages = {},
      theme,
      ...rest
    } = this.props;
    const { showDrop } = this.state;

    let drop;
    if (showDrop) {
      drop = (
        <Drop
          key='drop-button__drop'
          restrictFocus={true}
          id={id ? `drop-button__${id}` : undefined}
          align={{ top: 'bottom', left: 'left' }}
          background={background}
          ref={(ref) => {
            this.dropRef = ref;
          }}
          control={this.componentRef}
          onClose={this.onDropClose}
        >
          {children}
        </Drop>
      );
    }

    return [
      <Button
        key='drop-button__button'
        id={id}
        ref={(ref) => {
          this.componentRef = ref;
        }}
        a11yTitle={messages.openMenu || 'Open Drop'}
        onClick={() => this.setState({ showDrop: !this.state.showDrop })}
        {...rest}
      >
        {control}
      </Button>,
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
