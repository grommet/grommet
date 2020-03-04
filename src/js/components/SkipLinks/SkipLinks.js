import React, { cloneElement, useRef, useState } from 'react';

import { Box } from '../Box';
import { Heading } from '../Heading';
import { Layer } from '../Layer';

const SkipLinks = ({ children, id, messages }) => {
  const [showLayer, setShowLayer] = useState(false);

  const layerRef = useRef(null);

  const onFocus = () => {
    setShowLayer(true);
  };

  const removeLayer = () => {
    setShowLayer(false);
  };

  const onBlur = () => {
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(() => {
      const layerNode = layerRef.current;
      if (
        layerNode &&
        layerNode.layerContainer &&
        layerNode.layerContainer.contains &&
        !layerNode.layerContainer.contains(document.activeElement)
      ) {
        removeLayer();
      }
    }, 0);
  };

  return (
    <Layer
      id={id}
      position={showLayer ? 'top' : 'hidden'}
      ref={layerRef}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Box pad={{ horizontal: 'medium' }}>
        <Heading level={2}>{messages.skipTo}:</Heading>
        <Box direction="row" align="center" pad={{ bottom: 'medium' }}>
          {children.map((element, index) =>
            cloneElement(element, {
              key: `skip-link-${index}`,
              onClick: removeLayer,
            }),
          )}
        </Box>
      </Box>
    </Layer>
  );
};

SkipLinks.defaultProps = {
  messages: {
    skipTo: 'Skip To',
  },
};

let SkipLinksDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SkipLinksDoc = require('./doc').doc(SkipLinks);
}
const SkipLinksWrapper = SkipLinksDoc || SkipLinks;

export { SkipLinksWrapper as SkipLinks };
