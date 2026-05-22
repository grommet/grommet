import React, { useRef, useState } from 'react';

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
  const valuesRef = useRef(undefined as unknown as HTMLDivElement);
  const onRemoveTag = (tag: string) => {
    const nextSelected = selected.filter((selectedTag) => selectedTag !== tag);
    if (nextSelected.length > 0) {
      const index = selected.indexOf(tag);
      // update focus to the next tag's remove button
      // if there is one, otherwise the previous one
      const nextFocusIndex = index < nextSelected.length ? index : index - 1;
      if (nextFocusIndex >= 0 && valuesRef.current) {
        setTimeout(() => {
          const element = valuesRef.current as HTMLElement;
          const buttons = element?.querySelectorAll('button');
          buttons[nextFocusIndex].focus();
        }, 200);
      }
    }
    setSelected(nextSelected);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple with custom valueLabel</Text>
      <SelectMultiple
        showSelectedInline
        placeholder="Select tag"
        width="medium"
        valueLabel={(options: any[]) => (
          <Box
            ref={valuesRef}
            wrap
            direction="row"
            pad="xsmall"
            gap="xsmall"
            cssGap
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
        onChange={({ value }: { value: string[] }) => setSelected([...value])}
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
