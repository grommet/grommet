import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import {
  isNodeAfterScroll,
  isNodeBeforeScroll,
  sizeStyle,
  useForwardedRef,
} from '../../utils';

import {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledIcon,
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

const defaultDropAlign = { top: 'bottom', left: 'left' };

const defaultMessages = {
  enterSelect: '(Press Enter to Select)',
  suggestionsCount: 'suggestions available',
  suggestionsExist: 'This input has suggestions use arrow keys to navigate',
  suggestionIsOpen:
    'Suggestions drop is open, continue to use arrow keys to navigate',
};

const TextInput = forwardRef(
  (
    {
      a11yTitle,
      defaultSuggestion,
      defaultValue,
      dropAlign = defaultDropAlign,
      dropHeight,
      dropTarget,
      dropProps,
      icon,
      id,
      messages = defaultMessages,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onSelect,
      onSuggestionSelect,
      onSuggestionsClose,
      onSuggestionsOpen,
      placeholder,
      plain,
      readOnly,
      reverse,
      suggestions,
      textAlign,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const announce = useContext(AnnounceContext);
    const formContext = useContext(FormContext);
    const inputRef = useForwardedRef(ref);
    const dropRef = useRef();
    const suggestionsRef = useRef();
    const suggestionRefs = {};
    // if this is a readOnly property, don't set a name with the form context
    // this allows Select to control the form context for the name.
    const [value, setValue] = formContext.useFormInput(
      readOnly ? undefined : name,
      valueProp,
    );

    const [focus, setFocus] = useState();
    const [showDrop, setShowDrop] = useState();

    const handleSuggestionSelect = useMemo(
      () => (onSelect && !onSuggestionSelect ? onSelect : onSuggestionSelect),
      [onSelect, onSuggestionSelect],
    );
    const handleTextSelect = useMemo(
      () => (onSelect && onSuggestionSelect ? onSelect : undefined),
      [onSelect, onSuggestionSelect],
    );

    // if we have no suggestions, close drop if it's open
    useEffect(() => {
      if (showDrop && (!suggestions || !suggestions.length)) {
        setShowDrop(false);
        if (onSuggestionsClose) onSuggestionsClose();
      }
    }, [onSuggestionsClose, showDrop, suggestions]);

    // If we have suggestions and focus, open drop if it's closed.
    // This can occur when suggestions are tied to the value, as in
    // the caller updates the suggestions based on the value passed in.
    // We don't want focus or showDrop in the dependencies because we
    // don't want to open the drop just after Esc closed it.
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
      if (focus && !showDrop && suggestions && suggestions.length) {
        setShowDrop(true);
        if (onSuggestionsOpen) onSuggestionsOpen();
      }
    }, [onSuggestionsOpen, suggestions]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // choose the best suggestion, either the explicit default or the one
    // that matches the current value
    const bestSuggestion = useCallback(() => {
      if (suggestions) {
        const suggestionValues = suggestions.map(suggestion =>
          typeof suggestion === 'object' ? suggestion.value : suggestion,
        );
        const indexOfValue = suggestionValues.indexOf(value);
        if (indexOfValue === -1 && typeof defaultSuggestion === 'number') {
          return defaultSuggestion;
        }
        return indexOfValue;
      }
      return -1;
    }, [defaultSuggestion, suggestions, value]);

    // activeSuggestionIndex unifies mouse and keyboard interaction of
    // the suggestions
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(
      bestSuggestion(),
    );

    // reset activeSuggestionIndex when the drop is closed
    useEffect(() => {
      const nextActiveSuggestionIndex = bestSuggestion();
      if (activeSuggestionIndex !== nextActiveSuggestionIndex && !showDrop) {
        setActiveSuggestionIndex(nextActiveSuggestionIndex);
      }
    }, [activeSuggestionIndex, bestSuggestion, showDrop]);

    // announce active suggestion
    useEffect(() => {
      if (activeSuggestionIndex >= 0) {
        const label = stringLabel(suggestions[activeSuggestionIndex]);
        announce(`${label} ${messages.enterSelect}`);
      }
    }, [activeSuggestionIndex, announce, messages, suggestions]);

    // make sure activeSuggestion remains visible in scroll
    useEffect(() => {
      const buttonNode = suggestionRefs[activeSuggestionIndex];
      const optionsNode = suggestionsRef.current;
      if (
        buttonNode &&
        isNodeAfterScroll(buttonNode, optionsNode) &&
        optionsNode.scrollTo
      ) {
        optionsNode.scrollTo(
          0,
          buttonNode.offsetTop -
            (optionsNode.getBoundingClientRect().height -
              buttonNode.getBoundingClientRect().height),
        );
      }
      if (
        buttonNode &&
        isNodeBeforeScroll(buttonNode, optionsNode) &&
        optionsNode.scrollTo
      ) {
        optionsNode.scrollTo(0, buttonNode.offsetTop);
      }
    }, [activeSuggestionIndex, suggestionRefs]);

    const openDrop = useCallback(() => {
      setShowDrop(true);
      announce(messages.suggestionIsOpen);
      announce(`${suggestions.length} ${messages.suggestionsCount}`);
      if (onSuggestionsOpen) onSuggestionsOpen();
    }, [
      announce,
      messages.suggestionsCount,
      messages.suggestionIsOpen,
      onSuggestionsOpen,
      suggestions,
    ]);

    const closeDrop = useCallback(() => {
      setShowDrop(false);
      if (messages.onSuggestionsClose) onSuggestionsClose();
      if (onSuggestionsClose) onSuggestionsClose();
    }, [messages.onSuggestionsClose, onSuggestionsClose]);

    const setValueFromSuggestion = (event, suggestion) => {
      // if we stole the focus in the drop, perhaps by interacting with
      // a suggestion button or the scrollbar, give it back
      inputRef.current.focus();
      closeDrop();
      if (handleSuggestionSelect) {
        if (event.persist) event.persist();
        const adjustedEvent = event;
        adjustedEvent.suggestion = suggestion;
        handleSuggestionSelect(adjustedEvent);
      }
      inputRef.current.value = suggestion; // needed for uncontrolled cases
      setValue(suggestion);
    };

    const onNextSuggestion = event => {
      event.preventDefault();
      const nextActiveIndex = Math.min(
        activeSuggestionIndex + 1,
        suggestions.length - 1,
      );
      setActiveSuggestionIndex(nextActiveIndex);
    };

    const onPreviousSuggestion = event => {
      event.preventDefault();
      const nextActiveIndex = Math.max(activeSuggestionIndex - 1, 0);
      setActiveSuggestionIndex(nextActiveIndex);
    };

    const [showStyledPlaceholder, setShowStyledPlaceholder] = useState(
      placeholder &&
        typeof placeholder !== 'string' &&
        !(inputRef.current && inputRef.current.value) &&
        !value,
    );

    let drop;
    const extraProps = {
      onSelect: handleTextSelect,
    };

    if (showDrop) {
      drop = (
        <Drop
          ref={dropRef}
          id={id ? `text-input-drop__${id}` : undefined}
          align={dropAlign}
          responsive={false}
          target={dropTarget || inputRef.current}
          onClickOutside={closeDrop}
          onEsc={closeDrop}
          {...dropProps}
        >
          <ContainerBox
            ref={suggestionsRef}
            overflow="auto"
            dropHeight={dropHeight}
          >
            <StyledSuggestions>
              <InfiniteScroll items={suggestions} step={theme.select.step}>
                {(suggestion, index, itemRef) => {
                  // Determine whether the label is done as a child or
                  // as an option Button kind property.
                  const renderedLabel = renderLabel(suggestion);
                  let child;
                  if (typeof renderedLabel !== 'string')
                    // must be an element rendered by suggestions.label
                    child = renderedLabel;
                  else if (!theme.button.option)
                    // don't have theme support, need to layout here
                    child = (
                      <Box align="start" pad="small">
                        {renderedLabel}
                      </Box>
                    );
                  // if we have a child, turn on plain

                  return (
                    <li
                      key={`${stringLabel(suggestion)}-${index}`}
                      ref={itemRef}
                    >
                      <Button
                        active={activeSuggestionIndex === index}
                        ref={r => {
                          suggestionRefs[index] = r;
                        }}
                        fill
                        plain={!child ? undefined : true}
                        align="start"
                        kind={!child ? 'option' : undefined}
                        label={!child ? renderedLabel : undefined}
                        onClick={event =>
                          setValueFromSuggestion(event, suggestion)
                        }
                        onMouseOver={() => setActiveSuggestionIndex(index)}
                        onFocus={() => setActiveSuggestionIndex(index)}
                      >
                        {child}
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

    const keyboardProps = { onKeyDown };
    if (showDrop) {
      keyboardProps.onEnter = event => {
        // prevent submitting forms via Enter when the drop is open
        event.preventDefault();
        if (activeSuggestionIndex >= 0)
          setValueFromSuggestion(event, suggestions[activeSuggestionIndex]);
      };
      if (activeSuggestionIndex > 0) keyboardProps.onUp = onPreviousSuggestion;
      if (activeSuggestionIndex < suggestions.length - 1)
        keyboardProps.onDown = onNextSuggestion;
      keyboardProps.onTab = closeDrop;
    } else if (suggestions && suggestions.length > 0) {
      keyboardProps.onDown = openDrop;
    }

    // For the Keyboard target below, if we have focus,
    // either on the input element or within the drop,
    // then we set the target to the document,
    // otherwise we only listen to onDown on the input element itself,
    // primarily for tests.

    return (
      <StyledTextInputContainer plain={plain}>
        {showStyledPlaceholder && (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
        {icon && (
          <StyledIcon reverse={reverse} theme={theme}>
            {icon}
          </StyledIcon>
        )}
        <Keyboard target={focus ? 'document' : undefined} {...keyboardProps}>
          <StyledTextInput
            aria-label={a11yTitle}
            ref={inputRef}
            id={id}
            name={name}
            autoComplete="off"
            plain={plain}
            placeholder={
              typeof placeholder === 'string' ? placeholder : undefined
            }
            icon={icon}
            reverse={reverse}
            focus={focus}
            textAlign={textAlign}
            {...rest}
            {...extraProps}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
            readOnly={readOnly}
            onFocus={event => {
              // Don't do anything if we are acting like we already have
              // focus. This can happen when this input loses focus temporarily
              // to our drop, see onBlur() handler below.
              if (!focus) {
                setFocus(true);
                if (suggestions && suggestions.length > 0) {
                  announce(messages.suggestionsExist);
                  openDrop();
                }
                if (onFocus) onFocus(event);
              }
            }}
            onBlur={event => {
              // Only treat it as a blur if the element receiving focus
              // isn't in our drop. The relatedTarget will be our drop
              // when the user clicks on a suggestion or interacts with the
              // scrollbar in the drop.
              if (
                !event.relatedTarget ||
                event.relatedTarget !== dropRef.current
              ) {
                setFocus(false);
                if (onBlur) onBlur(event);
              }
            }}
            onChange={
              readOnly
                ? undefined
                : event => {
                    // when TextInput is not contained in a Form, no re-render
                    // will come from this onChange and remove the placeholder
                    // so we need to update state to ensure the styled
                    // placeholder only appears when there is no value
                    setShowStyledPlaceholder(!event.target.value);
                    setValue(event.target.value);
                    if (onChange) onChange(event);
                  }
            }
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
