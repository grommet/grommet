import React, { useRef, useState } from 'react';

import {
  Box,
  DropButton,
  Button,
  Anchor,
  Form,
  FormField,
  Header,
  TextInput,
  CheckBoxGroup,
  Layer,
  Drop,
  Text,
  Heading,
} from 'grommet';
import { User, Close } from 'grommet-icons';

const InteractiveContent = () => (
  <Box gap="medium" pad="large">
    Drop Contents
    <Button label="testing button" />
    <Anchor href="#" label="testing anchor" />
  </Box>
);

const darks = [false, true];
const kinds = [
  { name: 'default', props: {} },
  { name: 'primary', props: { primary: true } },
  { name: 'secondary', props: { secondary: true } },
];
const states = [
  {},
  { active: true },
  { disabled: true },
  { color: 'teal' },
  { color: '#9999ff' },
  { color: '#333399' },
  { hoverIndicator: 'teal' },
];
const contents = [
  { icon: <User /> },
  { label: 'label' },
  { icon: <User />, label: 'label' },
  {
    plain: true,
    children: (
      <Box pad="xsmall">
        <Text color="orange">label</Text>
      </Box>
    ),
  },
];

const align = { top: 'bottom', left: 'left' };

const SimpleDrop = () => {
  const [showDrop, setShowDrop] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const layerRef = useRef();
  const buttonRef = useRef();

  const onClose = () => setShowLayer(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box>
      {/* <Grommet> */}
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
          <Layer position="right" full="vertical" onEsc={onClose}>
            <Header flex={false} align="start" gap="small" justify="between">
              <Box pad="small">
                <Heading id="layer-title" level={2} margin="none">
                  Title
                </Heading>
              </Box>
              {onClose ? (
                <Button
                  icon={<Close />}
                  onClick={onClose}
                  a11yTitle="Close modal"
                />
              ) : null}
            </Header>
            <Box pad="medium" gap="medium" overflow="auto">
              <Box flex={false}>
                <Form
                  onSubmit={(event) => {
                    console.log(event.value);
                    setShowLayer(false);
                  }}
                  messages={{
                    required: 'This is a required field.',
                  }}
                >
                  <FormField
                    label="Title"
                    contentProps={{ width: 'medium' }}
                    required
                    name="application-title"
                    htmlFor="application-title"
                  >
                    <TextInput
                      id="application-title"
                      name="application-title"
                    />
                  </FormField>
                  <FormField
                    label="Publisher"
                    contentProps={{ width: 'medium' }}
                    required
                    name="publisher"
                    htmlFor="publisher"
                  >
                    <TextInput name="publisher" id="publisher" />
                  </FormField>
                  <FormField
                    label="Pricing"
                    contentProps={{ width: 'medium' }}
                    name="pricing"
                    htmlFor="pricing"
                    required
                  >
                    <CheckBoxGroup
                      id="pricing"
                      name="pricing"
                      options={[
                        'Annual license',
                        'Free',
                        'Free trial',
                        'Monthly Subscription',
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="Delivery"
                    contentProps={{ width: 'medium' }}
                    name="delivery"
                    htmlFor="delivery"
                    required
                  >
                    <CheckBoxGroup
                      id="delivery"
                      name="delivery"
                      options={[
                        'License key',
                        'Package manager',
                        'Web application',
                      ]}
                    />
                  </FormField>
                </Form>
              </Box>
              <Box direction="row" gap="small" flex={false}>
                <Button
                  label="Add application"
                  primary
                  type="submit"
                  form="application-form"
                />
                <Button label="Cancel" onClick={onClose} />
              </Box>
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
      <Box pad="large" gap="large">
        <Box gap="medium">
          {kinds.map((kind) => (
            <Box key={kind.name} flex={false}>
              <Heading level={3} size="small">
                {kind.name}
              </Heading>
              {states.map((state, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={index} direction="row" align="center">
                  {darks.map((dark) => (
                    <Box
                      key={dark}
                      direction={dark ? 'row-reverse' : 'row'}
                      align="center"
                      gap="small"
                      background={{ color: 'background', dark }}
                      pad="small"
                    >
                      {contents.map((content, index2) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={index2}
                          {...kind.props}
                          {...content}
                          {...state}
                        />
                      ))}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      {/* </Grommet> */}
    </Box>
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
  title: 'Controls/Drop/Simple2',
};
