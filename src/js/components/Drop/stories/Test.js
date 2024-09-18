import React, { useRef, useState } from 'react';
import { Box, Anchor, Button, Drop, Layer } from 'grommet';

const TestDrop = () => {
  const [showDrop, setShowDrop] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const layerRef = useRef();
  const dropRef = useRef();
  const modalRef = useRef();

  const onClose = () => setShowLayer(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <>
      <Button
        ref={dropRef}
        label="single drop"
        onClick={() => setShowDrop(true)}
      />
      {showDrop && (
        <Drop
          target={dropRef.current}
          onClickOutside={() => setShowDrop(false)}
          onEsc={() => setShowDrop(false)}
        >
          <Box gap="medium" pad="large">
            Drop Contents
            <Button label="testing button" />
            <Anchor href="#" label="testing anchor" />
          </Box>
        </Drop>
      )}
      <Button
        ref={layerRef}
        label="open layer"
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
          <Box fill="vertical" overflow="auto" width="medium" pad="medium">
            <Button label="testing button" />
            <Anchor href="#" label="testing anchor" />
            <Button
              ref={modalRef}
              label="open drop"
              onClick={() => setShowDrop(true)}
            />
            {showModal && (
              <Drop
                target={modalRef.current}
                onClickOutside={() => setShowModal(false)}
                onEsc={() => setShowModal(false)}
              >
                <Box gap="medium" pad="large">
                  Drop inside layer
                  <Button label="testing button" />
                  <Anchor href="#" label="testing anchor" />
                </Box>
              </Drop>
            )}
          </Box>
        </Layer>
      )}
    </>
    // </Grommet>
  );
};

export const Test = () => <TestDrop />;
Test.parameters = {
  chromatic: { disable: true },
};
Test.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Test',
};
