import React, { cloneElement, useContext, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Text } from '../Text';
import { Layer } from '../Layer';
import { defaultProps } from '../../default-props';

const SkipLinks = ({ children, id, messages }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [showLayer, setShowLayer] = useState(false);

  const firstAnchorRef = useRef(null);
  const layerRef = useRef(null);

  const onFocus = () => {
    setShowLayer(true);
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(() => {
      // The layer container is receiving the focus by default since the layer
      // isn't on the DOM yet and its children are not accessible.
      // Once the layer is focused and the children of the layer are
      // accessible on the DOM, the first anchor of the skiplink list will
      // steal the focus to itself.
      const layerNode = layerRef.current;
      // change the focus to the first SkipLink anchor
      if (layerNode === document.activeElement) {
        firstAnchorRef.current.focus();
      }
    }, 0);
  };

  const removeLayer = () => {
    setShowLayer(false);
  };

  const onBlur = () => {
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(() => {
      const layerNode = layerRef.current;
      if (layerNode && !layerNode.contains(document.activeElement)) {
        // close the layer when the activeElement isn't contained in the layer
        removeLayer();
      }
    }, 0);
  };

  return (
    <Layer
      id={id}
      position={showLayer ? theme.skipLinks.position : 'hidden'}
      ref={layerRef}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      modal={false}
      targetChildPosition="first" // prepend the Layer on the body container
      // Non-modal Layer's will take the full screen at small breakpoints
      // by default, which isn't what we want, hence setting responsive false
      responsive={false}
    >
      {showLayer && (
        <Box {...theme.skipLinks.container}>
          {messages.skipTo && (
            <Text {...theme.skipLinks.label}>{messages.skipTo}</Text>
          )}
          <Box align="center">
            {children.map((element, index) =>
              cloneElement(element, {
                key: `skip-link-${index}`,
                ref: index === 0 ? firstAnchorRef : undefined,
                onClick: removeLayer,
              }),
            )}
          </Box>
        </Box>
      )}
    </Layer>
  );
};

SkipLinks.defaultProps = {
  messages: {
    skipTo: 'Skip To:',
  },
};

let SkipLinksDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SkipLinksDoc = require('./doc').doc(SkipLinks);
}
const SkipLinksWrapper = SkipLinksDoc || SkipLinks;

export { SkipLinksWrapper as SkipLinks };
