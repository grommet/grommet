import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer } from '../../utils';

import { LayerContainer } from './LayerContainer';

class Layer extends Component {
  static defaultProps = {
    full: false,
    margin: 'none',
    modal: true,
    position: 'center',
    responsive: true,
  };

  state = {
    islayerContainerAvailable: false,
  };

  componentDidMount() {
    // ensure document is available
    this.originalFocusedElement = document.activeElement;
    this.layerContainer = getNewContainer();
    this.setState({ islayerContainerAvailable: true });
  }

  componentWillUnmount() {
    const { animate, animation } = this.props;
    if (this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        // wait for the fixed positioning to come back to normal
        // see layer styling for reference
        setTimeout(() => {
          this.originalFocusedElement.focus();
        }, 0);
      } else if (
        this.originalFocusedElement.parentNode &&
        this.originalFocusedElement.parentNode.focus
      ) {
        // required for IE11 and Edge
        this.originalFocusedElement.parentNode.focus();
      }
    }

    const activeAnimation = animation !== undefined ? animation : animate;
    if (activeAnimation !== false) {
      // undefined still has fadeIn
      // animate out and remove later
      const layerClone = this.layerContainer.cloneNode(true);
      layerClone.id = 'layerClone';
      document.body.appendChild(layerClone);
      const clonedContainer = layerClone.querySelector(
        '[class^="StyledLayer__StyledContainer"]',
      );
      clonedContainer.style = 'animation-direction: reverse';
      setTimeout(() => {
        // we add the id and query here so the unit tests work
        const clone = document.getElementById('layerClone');
        if (clone) document.body.removeChild(clone);
      }, 200); // matches 0.2s in StyledLayer.getAnimationStyle()
    }
  }

  render() {
    const { islayerContainerAvailable } = this.state;

    return islayerContainerAvailable
      ? createPortal(<LayerContainer {...this.props} />, this.layerContainer)
      : null;
  }
}

let LayerDoc;
if (process.env.NODE_ENV !== 'production') {
  LayerDoc = require('./doc').doc(Layer); // eslint-disable-line global-require
}
const LayerWrapper = LayerDoc || Layer;

export { LayerWrapper as Layer };
