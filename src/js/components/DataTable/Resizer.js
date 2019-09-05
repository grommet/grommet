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
      const element = this.ref.current;
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
    const { children, onResize, theme } = this.props;
    const { start } = this.state;
    if (onResize) {
      return (
        <Box ref={this.ref} direction="row" fill>
          {children}
          <ResizerBox
            flex={false}
            {...theme.dataTable.resize}
            onMouseDown={this.onMouseDown}
            onMouseMove={start ? this.onMouseMove : undefined}
            onMouseUp={start ? this.onMouseUp : undefined}
          />
        </Box>
      );
    }
    return children;
  }
}

Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, defaultProps);

const ResizerWrapper = compose(withTheme)(Resizer);

export { ResizerWrapper as Resizer };
