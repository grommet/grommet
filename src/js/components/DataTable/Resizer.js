import React, { Component } from 'react';

import { compose } from 'recompose';

import styled, { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';

const ResizerBox = styled(Box)`
  cursor: col-resize;
`;

class Resizer extends Component {
  state = {};

  ref = React.createRef();

  onMouseDown = event => {
    if (this.ref.current) {
      let element = this.ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const rect = element.getBoundingClientRect();
      this.setState({ start: event.clientX, width: rect.width }, () => {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
      });
    }
  };

  onMouseMove = event => {
    const { onResize, property } = this.props;
    const { start, width } = this.state;
    // We determined 12 empirically as being wide enough to hit but
    // not too wide to cause false hits.
    const nextWidth = Math.max(12, width + (event.clientX - start));
    onResize(property)(nextWidth);
  };

  onMouseUp = () => {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    this.setState({ start: undefined, width: undefined });
  };

  render() {
    const { theme } = this.props;
    const { start } = this.state;
    return (
      <ResizerBox
        ref={this.ref}
        flex={false}
        responsive={false}
        pad={{ vertical: 'small' }}
        {...theme.dataTable.resize}
        onMouseDown={this.onMouseDown}
        onMouseMove={start ? this.onMouseMove : undefined}
        onMouseUp={start ? this.onMouseUp : undefined}
      />
    );
  }
}

Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, defaultProps);

const ResizerWrapper = compose(withTheme)(Resizer);

export { ResizerWrapper as Resizer };
