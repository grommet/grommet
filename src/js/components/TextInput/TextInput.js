import React, {
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { AnnounceContext } from '../../contexts';
import { sizeStyle } from '../../utils';

import {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledSuggestions,
} from './StyledTextInput';

const renderLabel = suggestion => {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
};

const stringLabel = suggestion => {
  if (suggestion && typeof suggestion === 'object') {
    if (suggestion.label && typeof suggestion.label === 'string') {
      return suggestion.label;
    }
    return suggestion.value;
  }
  return suggestion;
};

const ContainerBox = styled(Box)`
  ${props =>
    props.dropHeight
      ? sizeStyle('max-height', props.dropHeight, props.theme)
      : 'max-height: inherit;'};

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }
`;

const TextInput = forwardRef(
  (
    {
      defaultValue,
      dropAlign = { top: 'bottom', left: 'left' },
      dropHeight,
      dropTarget,
      dropProps,
      id,
      messages = {
        enterSelect: '(Press Enter to Select)',
        suggestionsCount: 'suggestions available',
        suggestionsExist:
          'This input has suggestions use arrow keys to navigate',
        suggestionIsOpen:
          'Suggestions drop is open, continue to use arrow keys to navigate',
      },
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onSelect,
      onSuggestionsClose,
      onSuggestionsOpen,
      placeholder,
      plain,
      suggestions,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const announce = useContext(AnnounceContext);
    const formContext = useContext(FormContext);
    const inputRef = useRef();
    const dropRef = useRef();

    const [value, setValue] = useState(
      valueProp !== undefined
        ? valueProp
        : (formContext && name && formContext.get(name)) || '',
    );
    // updating here causes the cursor bug
    useEffect(() => setValue(valueProp), [valueProp]);
    useEffect(() => {
      if (formContext && name) setValue(formContext.get(name) || '');
    }, [formContext, name]);

    const [focus, setFocus] = useState();
    const [showDrop, setShowDrop] = useState();

    // if we have no suggestions, close drop if it's open
    useEffect(() => {
      if (showDrop && (!suggestions || !suggestions.length)) {
        setShowDrop(false);
        if (onSuggestionsClose) onSuggestionsClose();
      }
    }, [onSuggestionsClose, showDrop, suggestions]);

    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

    // reset activeSuggestionIndex when the drop is closed
    useEffect(() => {
      if (activeSuggestionIndex !== -1 && !showDrop) {
        setActiveSuggestionIndex(-1);
      }
    }, [activeSuggestionIndex, showDrop]);
    // announce active suggestion
    useEffect(() => {
      if (activeSuggestionIndex >= 0) {
        const label = stringLabel(suggestions[activeSuggestionIndex]);
        announce(`${label} ${messages.enterSelect}`);
      }
    }, [activeSuggestionIndex, announce, messages, suggestions]);

    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

    // set selectedSuggestionIndex based on value and current suggestions
    useEffect(() => {
      if (suggestions) {
        const suggestionValues = suggestions.map(suggestion =>
          typeof suggestion === 'object' ? suggestion.value : suggestion,
        );
        setSelectedSuggestionIndex(suggestionValues.indexOf(value));
      } else setSelectedSuggestionIndex(-1);
    }, [suggestions, value]);

    const openDrop = () => {
      setShowDrop(true);
      announce(messages.suggestionIsOpen);
      announce(`${suggestions.length} ${messages.suggestionsCount}`);
      if (onSuggestionsOpen) onSuggestionsOpen();
    };

    const closeDrop = () => {
      setShowDrop(false);
      if (messages.onSuggestionsClose) onSuggestionsClose();
    };

    const showStyledPlaceholder =
      placeholder && typeof placeholder !== 'string' && !value;

    let drop;
    if (showDrop) {
      drop = (
        <Drop
          ref={dropRef}
          id={id ? `text-input-drop__${id}` : undefined}
          align={dropAlign}
          responsive={false}
          target={dropTarget || (ref || inputRef).current}
          onClickOutside={closeDrop}
          onEsc={closeDrop}
          {...dropProps}
        >
          <ContainerBox overflow="auto" dropHeight={dropHeight}>
            <StyledSuggestions>
              <InfiniteScroll items={suggestions} step={theme.select.step}>
                {(suggestion, index) => {
                  const plainLabel =
                    typeof suggestion === 'object' &&
                    typeof isValidElement(suggestion.label);
                  return (
                    <li key={`${stringLabel(suggestion)}-${index}`}>
                      <Button
                        active={
                          activeSuggestionIndex === index ||
                          selectedSuggestionIndex === index
                        }
                        fill
                        hoverIndicator="background"
                        onClick={event => {
                          // we stole the focus, give it back
                          (ref || inputRef).current.focus();
                          closeDrop();
                          if (onSelect) {
                            event.persist();
                            const adjustedEvent = event;
                            adjustedEvent.suggestion = suggestion;
                            adjustedEvent.target = (ref || inputRef).current;
                            onSelect(adjustedEvent);
                          }
                          if (formContext) {
                            formContext.update(name, suggestion);
                          }
                        }}
                      >
                        {plainLabel ? (
                          renderLabel(suggestion)
                        ) : (
                          <Box align="start" pad="small">
                            {renderLabel(suggestion)}
                          </Box>
                        )}
                      </Button>
                    </li>
                  );
                }}
              </InfiniteScroll>
            </StyledSuggestions>
          </ContainerBox>
        </Drop>
      );
    }

    return (
      <StyledTextInputContainer plain={plain}>
        {showStyledPlaceholder && (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
        <Keyboard
          onEnter={event => {
            closeDrop();
            if (activeSuggestionIndex >= 0 && onSelect) {
              // prevent submitting forms when choosing a suggestion
              event.preventDefault();
              event.persist();
              const adjustedEvent = event;
              adjustedEvent.suggestion = suggestions[activeSuggestionIndex];
              adjustedEvent.target = (ref || inputRef).current;
              onSelect(adjustedEvent);
            }
          }}
          onEsc={
            showDrop
              ? event => {
                  closeDrop();
                  // we have to stop both synthetic events and native events
                  // drop and layer should not close by pressing esc on this
                  // input
                  event.stopPropagation();
                  event.nativeEvent.stopImmediatePropagation();
                }
              : undefined
          }
          onTab={showDrop ? closeDrop : undefined}
          onUp={
            showDrop &&
            suggestions &&
            suggestions.length > 0 &&
            activeSuggestionIndex
              ? event => {
                  event.preventDefault();
                  const index = Math.max(activeSuggestionIndex - 1, 0);
                  setActiveSuggestionIndex(index);
                }
              : undefined
          }
          onDown={
            suggestions && suggestions.length > 0
              ? event => {
                  if (!showDrop) {
                    openDrop();
                  } else {
                    event.preventDefault();
                    const index = Math.min(
                      activeSuggestionIndex + 1,
                      suggestions.length - 1,
                    );
                    setActiveSuggestionIndex(index);
                  }
                }
              : undefined
          }
          onKeyDown={onKeyDown}
        >
          <StyledTextInput
            ref={ref || inputRef}
            id={id}
            name={name}
            autoComplete="off"
            plain={plain}
            placeholder={
              typeof placeholder === 'string' ? placeholder : undefined
            }
            focus={focus}
            {...rest}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
            onFocus={event => {
              setFocus(true);
              if (suggestions && suggestions.length > 0) {
                announce(messages.suggestionsExist);
              }
              setShowDrop(true);
              if (onFocus) {
                onFocus(event);
              }
            }}
            onBlur={event => {
              setFocus(false);
              // This will be called when the user clicks on a suggestion,
              // check for that and don't remove the drop in that case.
              // Drop will already have removed itself if the user has focused
              // outside of the Drop.
              if (!dropRef.current) {
                closeDrop();
                if (onBlur) {
                  onBlur(event);
                }
              }
            }}
            onChange={event => {
              if (formContext && name) {
                // should use setValue() here
                formContext.set(name, event.target.value);
              }
              // should use setValue() here
              if (onChange) onChange(event);
            }}
          />
        </Keyboard>
        {drop}
      </StyledTextInputContainer>
    );
  },
);

TextInput.displayName = 'TextInput';

let TextInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TextInputDoc = require('./doc').doc(TextInput);
}
const TextInputWrapper = TextInputDoc || TextInput;

export { TextInputWrapper as TextInput };
