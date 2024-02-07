import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Box, Form, FormField, TextInput, Text, Tip, DateInput } from 'grommet';

import { Copy } from 'grommet-icons';

export const ReadOnly = () => {
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const textInputRef = useRef(null);
  const readOnlyOnClick = () => {
    navigator.clipboard.writeText('test');
    setCopyText('Copied!');
  };

  const readOnlyOnBlur = () => {
    if (copyText === 'Copied!') setCopyText('Copy to clipboard');
  };

  const readOnlyProps = {
    readOnly: true,
    onClick: readOnlyOnClick,
    onBlur: readOnlyOnBlur,
    onMouseOut: readOnlyOnBlur,
  };

  const CustomFormField = styled(FormField)`
    border: none;
  `;

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium" gap="medium">
        <Form>
          <Tip
            content={<Text id="ClipboardTip">{copyText}</Text>}
            dropProps={{
              stretch: false,
              align: {
                bottom: 'top',
              },
              target: textInputRef,
            }}
          >
            <CustomFormField
              contentProps={{
                background: '#f7f7f7',
                border: '1px solid #0000001f',
              }}
              label="name"
              htmlFor="name"
              name="name"
            >
              <TextInput
                ref={textInputRef}
                {...readOnlyProps}
                id="name"
                name="name"
                aria-readonly="true"
                value="Daisy"
                icon={<Copy />}
                reverse
                // aria-label="Input Text read only"
                aria-description="select to copy text to clipboard"
                // aria-describedby="ClipboardTip"
              />
            </CustomFormField>
          </Tip>
          <CustomFormField
            contentProps={{
              background: '#f7f7f7',
              border: '1px solid #0000001f',
            }}
            label="date"
            htmlFor="dare"
            name="date"
          >
            <DateInput
              id="date"
              name="date"
              value="02/11/2024"
              aria-label="read only date input"
              readOnly
              format="mm/dd/yyyy"
            />
          </CustomFormField>
        </Form>
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/ReadOnly',
};
