import React, { useState } from 'react';

import { Box, Tag, Text } from 'grommet';
import { SelectMultiple } from '../../SelectMultiple.js';

const tags = [
  'Production',
  'Test',
  'Integration',
  'Analytics',
  'Development',
  'Staging',
  'QA',
  'UAT',
  'Performance',
  'Crash and bash',
].sort();

export const ValueLabel = () => {
  const [selected, setSelected] = useState(tags.slice(0, 3));

  const onRemoveTag = (tag) => {
    setSelected(selected.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple with custom valueLabel</Text>
      <SelectMultiple
        showSelectedInline
        placeholder="Select tag"
        valueLabel={(options) => (
          <Box
            wrap
            direction="row"
            pad="xsmall"
            gap="xsmall"
            cssGap
            width="small"
          >
            {options && options.length &&
              options.map((tag) => (
                <Tag
                  key={`tag_${tag}`}
                  value={tag}
                  onRemove={() => onRemoveTag(tag)}
                />
              ))
            }
          </Box>
        )}
        options={tags}
        value={selected}
        onChange={({ value }) => setSelected([...value])}
      />
    </Box>
    // </Grommet>
  );
};

ValueLabel.parameters = {
  chromatic: { disable: true },
};

ValueLabel.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/Value Label',
};
