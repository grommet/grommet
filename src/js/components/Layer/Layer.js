import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import LayerContainer from './LayerContainer';

import doc from './doc';

import { createContextProvider } from '../hocs';
import { getNewContainer } from '../utils';

class Layer extends Component {
  static defaultProps = {
    align: 'center',
  }

  componentDidMount() {
    this.originalFocusedElement = document.activeElement;
    this.layerContainer = getNewContainer();
    this.renderLayer();
  }

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
    unmountComponentAtNode(this.layerContainer);
    document.body.removeChild(this.layerContainer);
  }

  renderLayer() {
    const ContextProvider = createContextProvider(this.props.context);
    render(
      <ContextProvider>
        <LayerContainer {...this.props} />
      </ContextProvider>,
      this.layerContainer
    );
  }

  render() {
    return (<span style={{ display: 'none' }} />);
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Layer);
}

export default Layer;
