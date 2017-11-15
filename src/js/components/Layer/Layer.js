import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer } from '../../utils';

import { withTheme } from '../hocs';

import LayerContainer from './LayerContainer';
import doc from './doc';

class Layer extends Component {
  static defaultProps = {
    position: 'center',
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
    return createPortal(
      <LayerContainer
        {...this.props}
      />,
      this.layerContainer
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Layer);
}

export default withTheme(Layer);
