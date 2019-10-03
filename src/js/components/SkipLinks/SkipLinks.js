import React, { createRef, cloneElement, Component } from 'react';

import { Box } from '../Box';
import { Heading } from '../Heading';
import { Layer } from '../Layer';

class SkipLinks extends Component {
  static defaultProps = {
    messages: {
      skipTo: 'Skip To',
    },
  };

  state = {
    showLayer: false,
  };

  layerRef = createRef();

  onBlur = () => {
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(() => {
      const layerNode = this.layerRef.current;
      if (
        layerNode &&
        layerNode.layerContainer.contains &&
        !layerNode.layerContainer.contains(document.activeElement)
      ) {
        this.removeLayer();
      }
    }, 0);
  };

  onFocus = () => {
    this.setState({ showLayer: true });
  };

  removeLayer = () => {
    this.setState({ showLayer: false });
  };

  render() {
    /* eslint-disable-next-line react/prop-types */
    const { children, id, messages } = this.props;
    const { showLayer } = this.state;
    return (
      <Layer
        id={id}
        position={showLayer ? 'top' : 'hidden'}
        ref={this.layerRef}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <Box pad={{ horizontal: 'medium' }}>
          <Heading level={2}>{messages.skipTo}:</Heading>
          <Box direction="row" align="center" pad={{ bottom: 'medium' }}>
            {children.map((element, index) =>
              cloneElement(element, {
                key: `skip-link-${index}`,
                onClick: this.removeLayer,
              }),
            )}
          </Box>
        </Box>
      </Layer>
    );
  }
}

let SkipLinksDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SkipLinksDoc = require('./doc').doc(SkipLinks);
}
const SkipLinksWrapper = SkipLinksDoc || SkipLinks;

export { SkipLinksWrapper as SkipLinks };
