import React, { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';

import { FormSearch } from 'grommet-icons/icons/FormSearch';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { normalizeColor } from '../../utils';

const Searcher = ({ filtering, filters, onFilter, onFiltering, property }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const inputRef = useRef();
  const needsFocus = filtering === property;

  useEffect(() => {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);

  return filtering === property ? (
    <Keyboard onEsc={() => onFiltering(undefined)}>
      <Box width={{ min: 'xsmall' }} flex pad={{ horizontal: 'small' }}>
        <TextInput
          name={`search-${property}`}
          a11yTitle={`Search by ${property}`}
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
        a11yTitle={`Open search by ${property}`}
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

Searcher.displayName = 'Searcher';

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);

export { Searcher };
