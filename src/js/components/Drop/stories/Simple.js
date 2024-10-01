import React, { useRef, useState } from 'react';

import { Box, DropButton, Button, Anchor, Layer, Drop } from 'grommet';

const InteractiveContent = () => (
  <Box gap="medium" pad="large">
    Drop Contents
    <Button label="testing button" />
    <Anchor href="#" label="testing anchor" />
  </Box>
);

const align = { top: 'bottom', left: 'left' };

const SimpleDrop = () => {
  const [showDrop, setShowDrop] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const [showDropInModal, setShowDropInModal] = useState(false);
  const [showRestrictFocusDrop, setShowRestrictFocusDrop] = useState(false);
  const layerRef = useRef();
  const buttonRef = useRef();
  const layerButtonRef = useRef();
  const restrictFocusButtonRef = useRef();

  const onClose = () => setShowLayer(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <>
      <Box direction="row" pad="large" gap="small">
        <DropButton
          label="Drop button"
          dropContent={<InteractiveContent />}
          dropAlign={align}
        />
        <Button
          ref={buttonRef}
          label="Regular button"
          onClick={() => setShowDrop(true)}
        />
        <Button
          ref={layerRef}
          label="Open layer"
          onClick={() => setShowLayer(true)}
        />
        {showLayer && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={onClose}
            onEsc={onClose}
          >
            <Box
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              gap="small"
            >
              {/* <Anchor href="#" label="testing anchor" /> */}
              <DropButton
                label="Another drop button"
                dropContent={<InteractiveContent />}
                dropAlign={align}
              />
              <Button
                ref={layerButtonRef}
                label="Another regular button"
                onClick={() => setShowDropInModal(true)}
              />
              {showDropInModal && (
                <Drop
                  target={layerButtonRef.current}
                  align={align}
                  onClickOutside={() => setShowDropInModal(false)}
                  onEsc={() => setShowDropInModal(false)}
                >
                  <InteractiveContent />
                </Drop>
              )}
              <Button
                ref={restrictFocusButtonRef}
                label="A regular button with restrict focus"
                onClick={() => setShowRestrictFocusDrop(true)}
              />
              {showRestrictFocusDrop && (
                <Drop
                  target={restrictFocusButtonRef.current}
                  align={{ top: 'bottom' }}
                  onClickOutside={() => setShowRestrictFocusDrop(false)}
                  onEsc={() => setShowRestrictFocusDrop(false)}
                  restrictFocus
                >
                  <InteractiveContent />
                </Drop>
              )}
            </Box>
          </Layer>
        )}
      </Box>
      {showDrop && (
        <Drop
          target={buttonRef.current}
          align={align}
          onClickOutside={() => setShowDrop(false)}
          onEsc={() => setShowDrop(false)}
        >
          <InteractiveContent />
        </Drop>
      )}
    </>
    // </Grommet>
  );
};

export const Simple = () => <SimpleDrop />;
Simple.parameters = {
  chromatic: { disable: true },
};
Simple.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Simple',
};
