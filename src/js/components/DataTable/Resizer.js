import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { Box } from '../Box';

export default class Resizer extends Component {
  state = {};

  ref = React.createRef();

  onMouseDown = (event) => {
    if (this.ref.current) {
      const element = findDOMNode(this.ref.current);
      const rect = element.getBoundingClientRect();
      this.setState({ start: event.clientX, width: rect.width }, () => {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
      });
    }
  }

  onMouseMove = (event) => {
    const { property } = this.props;
    const { width } = this.state;
    const nextWidth = Math.max(12, width + (event.clientX - this.state.start));
    this.props.onResize(property)(nextWidth);
  }

  onMouseUp = () => {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    this.setState({ start: undefined, width: undefined });
  }

  render() {
    const { children, onResize, theme } = this.props;
    const { start } = this.state;
    if (onResize) {
      return (
        <Box ref={this.ref} direction='row' flex={true} style={{ height: '100%' }}>
          {children}
          <Box
            flex={false}
            {...theme.dataTable.resize}
            onMouseDown={this.onMouseDown}
            onMouseMove={start ? this.onMouseMove : undefined}
            onMouseUp={start ? this.onMouseUp : undefined}
            style={{ cursor: 'col-resize' }}
          />
        </Box>
      );
    }
    return children;
  }
}
