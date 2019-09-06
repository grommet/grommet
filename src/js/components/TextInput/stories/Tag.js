import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormClose } from 'grommet-icons';

const allSuggestions = ['sony', 'sonar', 'foo', 'bar'];

const Tag = ({ children, onRemove, ...rest }) => {
  const tag = (
    <Box
      direction="row"
      align="center"
      background="brand"
      pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
      margin={{ vertical: 'xxsmall' }}
      round="medium"
      {...rest}
    >
      <Text size="xsmall" margin={{ right: 'xxsmall' }}>
        {children}
      </Text>
      {onRemove && <FormClose size="small" color="white" />}
    </Box>
  );

  if (onRemove) {
    return <Button onClick={onRemove}>{tag}</Button>;
  }
  return tag;
};

const TagInput = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
  const [currentTag, setCurrentTag] = React.useState('');
  const [box, setBox] = React.useState();
  const boxRef = React.useCallback(setBox, []);

  const updateCurrentTag = event => {
    setCurrentTag(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const onAddTag = tag => {
    if (onAdd) {
      onAdd(tag);
    }
  };

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag);
      setCurrentTag('');
    }
  };

  const renderValue = () =>
    value.map((v, index) => (
      <Tag
        margin="xxsmall"
        key={`${v}${index + 0}`}
        onRemove={() => onRemove(v)}
      >
        {v}
      </Tag>
    ));

  return (
    <Keyboard onEnter={onEnter}>
      <Box
        direction="row"
        align="center"
        pad={{ horizontal: 'xsmall' }}
        border="all"
        ref={boxRef}
        wrap
      >
        {value.length > 0 && renderValue()}
        <Box flex style={{ minWidth: '120px' }}>
          <TextInput
            type="search"
            plain
            dropTarget={box}
            {...rest}
            onChange={updateCurrentTag}
            value={currentTag}
            onSelect={event => {
              event.stopPropagation();
              onAddTag(event.suggestion);
            }}
          />
        </Box>
      </Box>
    </Keyboard>
  );
};

const TagTextInput = () => {
  const [selectedTags, setSelectedTags] = React.useState(['foo', 'sony']);
  const [suggestions, setSuggestions] = React.useState(allSuggestions);

  const onRemoveTag = tag => {
    const removeIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    setSelectedTags(newTags);
  };

  const onAddTag = tag => setSelectedTags([...selectedTags, tag]);

  const onFilterSuggestion = value =>
    setSuggestions(
      allSuggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      ),
    );

  return (
    <Grommet full theme={grommet}>
      <Box pad="small">
        <TagInput
          placeholder="Search for aliases..."
          suggestions={suggestions}
          value={selectedTags}
          onRemove={onRemoveTag}
          onAdd={onAddTag}
          onChange={({ target: { value } }) => onFilterSuggestion(value)}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Tag', () => <TagTextInput />);
