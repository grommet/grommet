import React, { useContext, useEffect, useRef, useState } from 'react';

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
  focusIndicator,
  messages,
  onFilter,
  onFiltering,
  property,
}) => {
  const { theme } = useThemeValue();
  const inputRef = useRef();
  const buttonRef = useRef();
  const needsFocus = filtering === property;
  const [buttonNeedsFocus, setButtonNeedsFocus] = useState(false);
  const { format } = useContext(MessageContext);

  useEffect(() => {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);

  // Focus the button after closing the search
  useEffect(() => {
    if (buttonNeedsFocus && buttonRef.current) {
      buttonRef.current.focus();
      setButtonNeedsFocus(false);
    }
  }, [buttonNeedsFocus]);

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
        setButtonNeedsFocus(true);
      }}
    >
      <Box
        width={{ min: 'xsmall' }}
        flex
        // padding right is not needed any longer. There is margin
        // right set already on the container, see Header.js
        pad={theme.dataTable.searcher?.pad}
      >
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
          pad={theme.dataTable.searcher?.text?.pad}
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
        focusIndicator={focusIndicator}
        onClick={() =>
          onFiltering(filtering === property ? undefined : property)
        }
      />
    </>
  );
};

Searcher.displayName = 'Searcher';

export { Searcher };
