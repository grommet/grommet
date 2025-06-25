import React, { useContext, useEffect, useRef } from 'react';

import { FormSearch } from 'grommet-icons/icons/FormSearch';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

const Searcher = ({
  filtering,
  filters,
  messages,
  onFilter,
  onFiltering,
  property,
}) => {
  const { theme } = useThemeValue();
  const inputRef = useRef();
  const buttonRef = useRef();
  const needsFocus = filtering === property;
  const { format } = useContext(MessageContext);

  useEffect(() => {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);

  const a11yTitle = format({
    id: 'dataTable.searchBy',
    messages,
    values: {
      property,
    },
  });
  return filtering === property ? (
    <Keyboard
      onEsc={() => {
        onFiltering(undefined);
        // Focus the button after closing the search
        // setTimeout with 0 delay pushes the focus operation to the
        // next round of the event loop, which happens after React has
        // updated the DOM with the button element
        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.focus();
          }
        }, 0);
      }}
    >
      <Box width={{ min: 'xsmall' }} flex pad={{ horizontal: 'small' }}>
        <TextInput
          name={`search-${property}`}
          a11yTitle={a11yTitle}
          ref={inputRef}
          value={filters[property]}
          onChange={(event) => onFilter(property, event.target.value)}
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
        ref={buttonRef}
        a11yTitle={a11yTitle}
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

export { Searcher };
