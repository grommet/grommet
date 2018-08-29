import React, { cloneElement, Component } from 'react';
import { findDOMNode } from 'react-dom';

import { Box } from '../Box';
import { Heading } from '../Heading';
import { Layer } from '../Layer';

class SkipLinks extends Component {
  static defaultProps = {
    messages: {
      skipTo: 'Skip To',
    },
  }
  state = {
    showLayer: false,
  }
  onBlur = () => {
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(() => {
      const layerNode = findDOMNode(this.layerRef);
      if (!layerNode.contains(document.activeElement)) {
        this.removeLayer();
      }
    }, 0);
  }
  onFocus = () => {
    this.setState({ showLayer: true });
  }
  removeLayer = () => {
    this.setState({ showLayer: false });
  }
  render() {
    const { children, id, messages } = this.props;
    const { showLayer } = this.state;
    return (
      <Layer
        id={id}
        position={showLayer ? 'top' : 'hidden'}
        ref={(ref) => { this.layerRef = ref; }}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <Box pad={{ horizontal: 'medium' }}>
          <Heading level={2}>{messages.skipTo}:</Heading>
          <Box direction='row' align='center' pad={{ bottom: 'medium' }}>
            {children.map((element, index) => (
              cloneElement(
                element, {
                  key: `skip-link-${index}`,
                  onClick: this.removeLayer,
                }
              )
            ))}
          </Box>
        </Box>
      </Layer>
    );
  }
}

let SkipLinksDoc;
if (process.env.NODE_ENV !== 'production') {
  SkipLinksDoc = require('./doc').doc(SkipLinks); // eslint-disable-line global-require
}
const SkipLinksWrapper = SkipLinksDoc || SkipLinks;

export { SkipLinksWrapper as SkipLinks };
