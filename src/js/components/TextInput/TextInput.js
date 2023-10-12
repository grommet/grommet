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
  useSizedIcon,
} from '../../utils';

import {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledIcon,
  StyledSuggestions,
} from './StyledTextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { TextInputPropTypes } from './propTypes';

const renderLabel = (suggestion) => {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
};

const stringLabel = (suggestion) => {
  if (suggestion && typeof suggestion === 'object') {
    if (suggestion.label && typeof suggestion.label === 'string') {
      return suggestion.label;
    }
    return suggestion.value;
  }
  return suggestion;
};

const ContainerBox = styled(Box)`
  ${(props) =>
    props.dropHeight
      ? sizeStyle('max-height', props.dropHeight, props.theme)
      : 'max-height: inherit;'};

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }
`;

const defaultDropAlign = { top: 'bottom', left: 'left' };

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
      focusIndicator = true,
      icon,
      id,
      messages,
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
      width: widthProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { format } = useContext(MessageContext);
    const announce = useContext(AnnounceContext);
    const formContext = useContext(FormContext);
    const inputRef = useForwardedRef(ref);
    const dropRef = useRef();
    const suggestionsRef = useRef();
    // if this is a readOnly property, don't set a name with the form context
    // this allows Select to control the form context for the name.
    const [value, setValue] = formContext.useFormInput({
      name: readOnly ? undefined : name,
      value: valueProp,
    });

    const [focus, setFocus] = useState();
    const [showDrop, setShowDrop] = useState(false);

    const handleSuggestionSelect = useMemo(
      () => (onSelect && !onSuggestionSelect ? onSelect : onSuggestionSelect),
      [onSelect, onSuggestionSelect],
    );
    const handleTextSelect = useMemo(
      () => (onSelect && onSuggestionSelect ? onSelect : undefined),
      [onSelect, onSuggestionSelect],
    );

    const [suggestionsAtClose, setSuggestionsAtClose] = useState();

    const openDrop = useCallback(() => {
      setShowDrop(true);
      announce(
        format({
          id: 'textInput.suggestionIsOpen',
          messages,
        }),
      );
      announce(
        `${suggestions.length} ${format({
          id: 'textInput.suggestionsCount',
          messages,
        })}`,
      );
      if (onSuggestionsOpen) onSuggestionsOpen();
    }, [announce, messages, format, onSuggestionsOpen, suggestions]);

    const closeDrop = useCallback(() => {
      setSuggestionsAtClose(suggestions); // must be before closing drop
      setShowDrop(false);
      if (onSuggestionsClose) onSuggestionsClose();
    }, [onSuggestionsClose, suggestions]);

    const clickOutside = useCallback(
      (event) => {
        if (event.target !== inputRef.current) closeDrop();
      },
      [inputRef, closeDrop],
    );

    // Handle scenarios where we have focus, the drop isn't showing,
    // and the suggestions change. We don't want to open the drop if
    // the drop has been closed by onEsc and the suggestions haven't
    // changed. So, we remember the suggestions we are showing when
    // the drop was closed and only re-open it when the suggestions
    // subsequently change.
    useEffect(() => {
      if (
        focus &&
        !showDrop &&
        suggestions &&
        suggestions.length &&
        (!suggestionsAtClose ||
          suggestionsAtClose.length !== suggestions.length)
      ) {
        openDrop();
      }
    }, [focus, openDrop, showDrop, suggestions, suggestionsAtClose]);

    // if we have no suggestions, close drop if it's open
    useEffect(() => {
      if (showDrop && (!suggestions || !suggestions.length)) {
        closeDrop();
      }
    }, [closeDrop, showDrop, suggestions]);

    const valueSuggestionIndex = useMemo(
      () =>
        suggestions
          ? suggestions
              .map((suggestion) =>
                typeof suggestion === 'object' ? suggestion.value : suggestion,
              )
              .indexOf(value)
          : -1,
      [suggestions, value],
    );

    // choose the best suggestion, either the explicit default or the one
    // that matches the current value
    const resetSuggestionIndex = useMemo(() => {
      if (
        valueSuggestionIndex === -1 &&
        typeof defaultSuggestion === 'number'
      ) {
        return defaultSuggestion;
      }
      return valueSuggestionIndex;
    }, [defaultSuggestion, valueSuggestionIndex]);

    // activeSuggestionIndex unifies mouse and keyboard interaction of
    // the suggestions
    const [activeSuggestionIndex, setActiveSuggestionIndex] =
      useState(resetSuggestionIndex);

    // Only update active suggestion index when the mouse actually moves,
    // not when suggestions are moving under the mouse.
    const [mouseMovedSinceLastKey, setMouseMovedSinceLastKey] = useState();

    // set activeSuggestionIndex when value changes
    useEffect(
      () => setActiveSuggestionIndex(valueSuggestionIndex),
      [valueSuggestionIndex],
    );

    // reset activeSuggestionIndex when the drop is closed
    useEffect(() => {
      if (!showDrop) setActiveSuggestionIndex(resetSuggestionIndex);
    }, [resetSuggestionIndex, showDrop]);

    // announce active suggestion
    useEffect(() => {
      if (activeSuggestionIndex >= 0) {
        const label = stringLabel(suggestions[activeSuggestionIndex]);
        announce(
          `${label} ${format({
            id: 'textInput.enterSelect',
            messages,
          })}`,
        );
      }
    }, [activeSuggestionIndex, announce, messages, format, suggestions]);

    // make sure activeSuggestion is visible in scroll
    useEffect(() => {
      const timer = setTimeout(() => {
        const list = suggestionsRef.current;
        if (showDrop && activeSuggestionIndex !== -1 && list) {
          const container = list.parentNode;
          const item = list.children[activeSuggestionIndex];
          if (container.scrollTo) {
            if (isNodeAfterScroll(item, container))
              container.scrollTo(
                0,
                item.offsetTop -
                  (container.getBoundingClientRect().height -
                    item.getBoundingClientRect().height),
              );
            else if (isNodeBeforeScroll(item, container))
              container.scrollTo(0, item.offsetTop);
          }
        }
      }, 50); // delay to allow Drop to animate in
      return () => clearTimeout(timer);
    }, [activeSuggestionIndex, showDrop]);

    const setValueFromSuggestion = (event, suggestion) => {
      // if we stole the focus in the drop, perhaps by interacting with
      // a suggestion button or the scrollbar, give it back
      inputRef.current.focus();
      inputRef.current.value = suggestion; // needed for uncontrolled cases
      closeDrop();
      if (handleSuggestionSelect) {
        if (event.persist) event.persist();
        const adjustedEvent = event;
        adjustedEvent.suggestion = suggestion;
        handleSuggestionSelect(adjustedEvent);
      }
      setValue(suggestion);
    };

    const onNextSuggestion = useCallback(
      (event) => {
        event.preventDefault();
        const nextActiveIndex = Math.min(
          activeSuggestionIndex + 1,
          suggestions.length - 1,
        );
        setActiveSuggestionIndex(nextActiveIndex);
        setMouseMovedSinceLastKey(false);
      },
      [activeSuggestionIndex, suggestions],
    );

    const onPreviousSuggestion = useCallback(
      (event) => {
        event.preventDefault();
        const nextActiveIndex = Math.max(activeSuggestionIndex - 1, 0);
        setActiveSuggestionIndex(nextActiveIndex);
        setMouseMovedSinceLastKey(false);
      },
      [activeSuggestionIndex],
    );

    // account for input value in both controlled and uncontrolled scenarios
    const hasValue = value || inputRef.current?.value;
    const showStyledPlaceholder = useMemo(
      () => placeholder && typeof placeholder !== 'string' && !hasValue,
      [hasValue, placeholder],
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
          onClickOutside={clickOutside}
          onEsc={closeDrop}
          {...dropProps}
        >
          <ContainerBox
            id={id ? `listbox__${id}` : undefined}
            role="listbox"
            overflow="auto"
            dropHeight={dropHeight}
            onMouseMove={() => setMouseMovedSinceLastKey(true)}
          >
            <StyledSuggestions ref={suggestionsRef}>
              <InfiniteScroll
                items={suggestions}
                step={theme.select.step}
                show={
                  activeSuggestionIndex !== -1
                    ? activeSuggestionIndex
                    : undefined
                }
              >
                {(suggestion, index, itemRef) => {
                  const active = activeSuggestionIndex === index;
                  const selected = suggestion === value;
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
                        id={id ? `listbox-option-${index}__${id}` : undefined}
                        role="option"
                        aria-selected={selected ? 'true' : 'false'}
                        active={active}
                        fill="horizontal"
                        plain={!child ? undefined : true}
                        align="start"
                        kind={!child ? 'option' : undefined}
                        label={!child ? renderedLabel : undefined}
                        onClick={(event) =>
                          setValueFromSuggestion(event, suggestion)
                        }
                        onMouseMove={
                          mouseMovedSinceLastKey &&
                          activeSuggestionIndex !== index
                            ? () => setActiveSuggestionIndex(index)
                            : undefined
                        }
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
      keyboardProps.onEnter = (event) => {
        // prevent submitting forms via Enter when the drop is open
        event.preventDefault();
        if (activeSuggestionIndex >= 0)
          setValueFromSuggestion(event, suggestions[activeSuggestionIndex]);
        else closeDrop();
      };
      if (activeSuggestionIndex > 0) keyboardProps.onUp = onPreviousSuggestion;
      if (activeSuggestionIndex < suggestions.length - 1)
        keyboardProps.onDown = onNextSuggestion;
      keyboardProps.onTab = closeDrop;
    } else if (suggestions && suggestions.length > 0) {
      keyboardProps.onDown = openDrop;
    }

    /*
    If the text input has a list of suggestions, add the WAI-ARIA 1.2
    combobox role and states.
    */
    let comboboxProps = {};
    let activeOptionID;
    if (id && suggestions?.length > -1) {
      if (showDrop && activeSuggestionIndex > -1) {
        activeOptionID = `listbox-option-${activeSuggestionIndex}__${id}`;
      }
      comboboxProps = {
        'aria-activedescendant': activeOptionID,
        'aria-autocomplete': 'list',
        'aria-expanded': showDrop ? 'true' : 'false',
        'aria-controls': showDrop ? `listbox__${id}` : undefined,
        role: 'combobox',
      };
    }
    // For the Keyboard target below, if we have focus,
    // either on the input element or within the drop,
    // then we set the target to the document,
    // otherwise we only listen to onDown on the input element itself,
    // primarily for tests.

    const textInputIcon = useSizedIcon(icon, rest.size, theme);

    return (
      <StyledTextInputContainer plain={plain}>
        {showStyledPlaceholder && (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
        {textInputIcon && (
          <StyledIcon reverse={reverse} theme={theme}>
            {textInputIcon}
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
            focusIndicator={focusIndicator}
            textAlign={textAlign}
            widthProp={widthProp}
            {...rest}
            {...extraProps}
            {...comboboxProps}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
            readOnly={readOnly}
            onFocus={(event) => {
              // Don't do anything if we are acting like we already have
              // focus. This can happen when this input loses focus temporarily
              // to our drop, see onBlur() handler below.
              if (!focus) {
                setFocus(true);
                if (suggestions && suggestions.length > 0) {
                  announce(
                    format({
                      id: 'textInput.suggestionsExist',
                      messages,
                    }),
                  );
                  openDrop();
                }
                if (onFocus) onFocus(event);
              }
            }}
            onBlur={(event) => {
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
                : (event) => {
                    // when TextInput is not contained in a Form, no re-render
                    // will come from this onChange and remove the placeholder
                    // so we need to update state to ensure the styled
                    // placeholder only appears when there is no value
                    if (suggestions && focus && !showDrop) {
                      openDrop();
                    }
                    setValue(event.target.value);
                    setActiveSuggestionIndex(resetSuggestionIndex);
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
TextInput.propTypes = TextInputPropTypes;

export { TextInput };
