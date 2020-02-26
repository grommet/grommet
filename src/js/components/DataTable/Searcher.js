import React, { useEffect, useRef } from 'react';

import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { FormSearch } from 'grommet-icons/icons/FormSearch';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { normalizeColor } from '../../utils';

const Searcher = ({
  filtering,
  filters,
  onFilter,
  onFiltering,
  property,
  theme,
}) => {
  const inputRef = useRef();
  const needsFocus = filtering === property;

  useEffect(() => {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);

  return filtering === property ? (
    <Keyboard onEsc={() => onFiltering(undefined)}>
      <Box flex pad={{ horizontal: 'small' }}>
        <TextInput
          name={`search-${property}`}
          ref={inputRef}
          value={filters[property]}
          onChange={event => onFilter(property, event.target.value)}
          onBlur={() => onFiltering(undefined)}
        />
      </Box>
    </Keyboard>
  ) : (
    <>
      {filters[property] ? (
        <Box
          flex={false}
          pad={{ horizontal: 'small' }}
          direction="row"
          align="center"
        >
          <Text>{filters[property]}</Text>
        </Box>
      ) : null}
      <Button
        a11yTitle={`focus-search-${property}`}
        icon={
          <FormSearch
            color={normalizeColor(
              filtering === property ? 'brand' : 'border',
              theme,
            )}
          />
        }
        hoverIndicator
        onClick={() =>
          onFiltering(filtering === property ? undefined : property)
        }
      />
    </>
  );
};

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);

const SearcherWrapper = compose(withTheme)(Searcher);

export { SearcherWrapper as Searcher };
