import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer } from '../../utils';

import { withTheme } from '../hocs';

import LayerContainer from './LayerContainer';
import doc from './doc';

class Layer extends Component {
  static defaultProps = {
    full: false,
    margin: 'none',
    modal: true,
    position: 'center',
    responsive: true,
  }

  originalFocusedElement = document.activeElement;
  layerContainer = getNewContainer();

  componentWillUnmount() {
    if (this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        // wait for the fixed positioning to come back to normal
        // see layer styling for reference
        setTimeout(() => {
          this.originalFocusedElement.focus();
        }, 0);
      } else if (this.originalFocusedElement.parentNode &&
        this.originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        this.originalFocusedElement.parentNode.focus();
      }
    }
    document.body.removeChild(this.layerContainer);
  }

  render() {
    const { theme, ...rest } = this.props;
    return createPortal(
      <LayerContainer {...rest} />,
      this.layerContainer
    );
  }
}

let LayerWrapper = Layer;
if (process.env.NODE_ENV !== 'production') {
  LayerWrapper = doc(LayerWrapper);
}

export default withTheme(LayerWrapper);
