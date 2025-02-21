import React from 'react';

import { FormClose } from 'grommet-icons';
import { Box, Button, Keyboard, Text, TextInput } from 'grommet';

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
  const boxRef = React.useRef();

  const updateCurrentTag = (event) => {
    setCurrentTag(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const onAddTag = (tag) => {
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
            dropTarget={boxRef.current}
            {...rest}
            onChange={updateCurrentTag}
            value={currentTag}
            onSuggestionSelect={(event) => onAddTag(event.suggestion)}
          />
        </Box>
      </Box>
    </Keyboard>
  );
};

export const WithTags = () => {
  const [selectedTags, setSelectedTags] = React.useState(['foo', 'sony']);
  const [suggestions, setSuggestions] = React.useState(allSuggestions);

  const onRemoveTag = (tag) => {
    const removeIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    setSelectedTags(newTags);
  };

  const onAddTag = (tag) => setSelectedTags([...selectedTags, tag]);

  const onFilterSuggestion = (value) =>
    setSuggestions(
      allSuggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      ),
    );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
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
    // </Grommet>
  );
};

WithTags.storyName = 'With tags';

export default {
  title: 'Input/TextInput/With tags',
};
