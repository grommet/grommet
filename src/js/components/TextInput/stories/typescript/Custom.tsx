import React, { useState, useRef, useEffect, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Search } from 'grommet-icons';
import { Box, Image, Grommet, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const myCustomTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: '#444444',
      shadowSize: 'medium',
      extend: `
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;

          overflow: hidden;
        `,
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
      light: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '14px',
      family: 'Arial',
    },
  },
});

const folks = [
  {
    name: 'Alan Souza',
    imageUrl:
      'https://s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80',
  },
  {
    name: 'Bryan Jacquot',
    imageUrl:
      'https://s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80',
  },
  {
    name: 'Chris Carlozzi',
    imageUrl:
      'https://s.gravatar.com/avatar/56ea1e2ecd0d3cc85479b2d09e31d071?s=80',
  },
  {
    name: 'Eric Soderberg',
    imageUrl:
      'https://s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80',
  },
  {
    name: 'Marlon Parizzotto',
    imageUrl:
      'https://s.gravatar.com/avatar/e6684969375a4dcc0aa99f0bfae544c3?s=80',
  },
  {
    name: 'Tales Chaves',
    imageUrl:
      'https://s.gravatar.com/avatar/1f80adca55d9f5d97932ff97f631a4e8?s=80',
  },
  {
    name: 'Tracy Barmore',
    imageUrl:
      'https://s.gravatar.com/avatar/4ec9c3a91da89f278e4482811caad7f3?s=80',
  },
];

const CustomSuggestionsTextInput = () => {
  const [value, setValue] = useState('');
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestedFolks, setSuggestedFolks] = useState([]);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const boxRef = useRef();

  useEffect(() => {
    forceUpdate();
  }, [forceUpdate]);

  const onChange = event => {
    const { value: newValue } = event.target;
    setValue(newValue);

    if (!newValue.trim()) {
      setSuggestedFolks([]);
    } else {
      // simulate an async call to the backend
      setTimeout(() => setSuggestedFolks(folks), 300);
    }
  };

  const onSelect = event => setValue(event.suggestion.value);

  const renderSuggestions = () => {
    return suggestedFolks
      .filter(
        ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      )
      .map(({ name, imageUrl }, index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad="small"
          >
            <Image
              width="48px"
              src={imageUrl}
              style={{ borderRadius: '100%' }}
            />
            <Text>
              <strong>{name}</strong>
            </Text>
          </Box>
        ),
        value: name,
      }));
  };

  return (
    <Grommet theme={myCustomTheme} full>
      <Box background="dark-1" fill align="center" pad={{ top: 'large' }}>
        <Box
          ref={boxRef}
          width="large"
          direction="row"
          align="center"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          round="small"
          elevation={suggestionOpen ? 'medium' : undefined}
          border={{
            side: 'all',
            color: suggestionOpen ? 'transparent' : 'border',
          }}
          style={
            suggestionOpen
              ? {
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                }
              : undefined
          }
        >
          <Search color="brand" />
          <TextInput
            type="search"
            dropTarget={boxRef.current}
            plain
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={renderSuggestions()}
            placeholder="Enter your name..."
            onSuggestionsOpen={() => setSuggestionOpen(true)}
            onSuggestionsClose={() => setSuggestionOpen(false)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/TextInput', module).add('Custom', () => (
    <CustomSuggestionsTextInput />
  ));
}
