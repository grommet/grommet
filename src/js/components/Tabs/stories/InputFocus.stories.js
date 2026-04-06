import React from 'react';

import { Box, Tab, Tabs, TextInput, TextArea, Heading } from 'grommet';

export const TabsWithInputFocus = () => {
  const [nameValue, setNameValue] = React.useState(
    'This is default text in Tab 1',
  );
  const [emailValue, setEmailValue] = React.useState('email@example.com');
  const [messageValue, setMessageValue] = React.useState(
    'This is a textarea with default text. Try clicking in the middle and ' +
      'typing!',
  );
  const [bioValue, setBioValue] = React.useState(
    'Write your bio here. The cursor should stay in place when you type.',
  );

  return (
    <Box pad="large" gap="medium">
      <Heading level="2">Tabs with Text Inputs</Heading>
      <Box pad="small" background="light-2" round="small">
        <Heading level="3">Instructions</Heading>
        <Box as="p" margin="small">
          Try clicking in the middle of the text in any input field and typing.
          The cursor should stay in place as you
          type instead of jumping to the end of the text.
        </Box>
      </Box>

      <Tabs>
        <Tab title="Personal Info">
          <Box pad="medium" gap="medium">
            <Heading level="3">Personal Information</Heading>
            <Box gap="small">
              <Box as="label" htmlFor="name-input">
                Name
              </Box>
              <TextInput
                id="name-input"
                placeholder="Enter your name"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </Box>
            <Box gap="small">
              <Box as="label" htmlFor="email-input">
                Email
              </Box>
              <TextInput
                id="email-input"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </Box>
          </Box>
        </Tab>

        <Tab title="About">
          <Box pad="medium" gap="medium">
            <Heading level="3">About You</Heading>
            <Box gap="small">
              <Box as="label" htmlFor="message-textarea">
                Message
              </Box>
              <TextArea
                id="message-textarea"
                placeholder="Write a message"
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                rows={5}
              />
            </Box>
            <Box gap="small">
              <Box as="label" htmlFor="bio-textarea">
                Bio
              </Box>
              <TextArea
                id="bio-textarea"
                placeholder="Write your bio"
                value={bioValue}
                onChange={(e) => setBioValue(e.target.value)}
                rows={6}
              />
            </Box>
          </Box>
        </Tab>

        <Tab title="Additional">
          <Box pad="medium">
            <Heading level="3">Additional Information</Heading>
            <Box as="p">
              This tab does not have inputs, but you can switch to it and back
              to the other tabs to see that the input values are preserved.
            </Box>
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

TabsWithInputFocus.storyName = 'Tabs with input focus';

export default {
  title: 'Controls/Tabs/Tabs with input focus',
};
