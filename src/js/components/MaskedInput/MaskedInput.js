import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';

import {
  StyledMaskedInput,
  StyledMaskedInputContainer,
  StyledIcon,
} from './StyledMaskedInput';

const parseValue = (mask, value) => {
  // break the value up into mask parts
  const valueParts = []; // { part, beginIndex, endIndex }
  let valueIndex = 0;
  let maskIndex = 0;
  while (
    value !== undefined &&
    valueIndex < value.length &&
    maskIndex < mask.length
  ) {
    const item = mask[maskIndex];
    let found;
    if (item.fixed) {
      const { length } = item.fixed;
      valueParts.push({
        part: item.fixed,
        beginIndex: valueIndex,
        endIndex: valueIndex + length - 1,
      });
      const part = value.slice(valueIndex, valueIndex + length);
      if (part === item.fixed) {
        valueIndex += length;
      }
      maskIndex += 1;
      found = true;
    } else if (item.options) {
      // reverse assuming larger is later
      found = item.options
        .slice(0)
        .reverse()
        // eslint-disable-next-line no-loop-func
        .some(option => {
          const { length } = option;
          const part = value.slice(valueIndex, valueIndex + length);
          if (part === option) {
            valueParts.push({
              part,
              beginIndex: valueIndex,
              endIndex: valueIndex + length - 1,
            });
            valueIndex += length;
            maskIndex += 1;
            return true;
          }
          return false;
        });
    }
    if (!found) {
      if (item.regexp) {
        const minLength =
          (Array.isArray(item.length) && item.length[0]) || item.length || 1;
        const maxLength =
          (Array.isArray(item.length) && item.length[1]) ||
          item.length ||
          value.length - valueIndex;
        let length = maxLength;
        while (!found && length >= minLength) {
          const part = value.slice(valueIndex, valueIndex + length);
          if (item.regexp.test(part)) {
            valueParts.push({
              part,
              beginIndex: valueIndex,
              endIndex: valueIndex + length - 1,
            });
            valueIndex += length;
            maskIndex += 1;
            found = true;
          }
          length -= 1;
        }
        if (!found) {
          valueIndex = value.length;
        }
      } else {
        const length = Array.isArray(item.length)
          ? item.length[1]
          : item.length || value.length - valueIndex;
        const part = value.slice(valueIndex, valueIndex + length);
        valueParts.push({
          part,
          beginIndex: valueIndex,
          endIndex: valueIndex + length - 1,
        });
        valueIndex += length;
        maskIndex += 1;
      }
    }
  }
  return valueParts;
};

const defaultMask = [];

const MaskedInput = forwardRef(
  (
    {
      focus: focusProp,
      icon,
      id,
      mask = defaultMask,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      placeholder,
      plain,
      reverse,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const formContext = useContext(FormContext);

    const [value, setValue] = formContext.useFormContext(name, valueProp, '');

    const [valueParts, setValueParts] = useState(parseValue(mask, value));
    useEffect(() => {
      setValueParts(parseValue(mask, value));
    }, [mask, value]);

    const inputRef = useRef();
    const dropRef = useRef();

    const [focus, setFocus] = useState(focusProp);
    const [activeMaskIndex, setActiveMaskIndex] = useState();
    const [activeOptionIndex, setActiveOptionIndex] = useState();
    const [showDrop, setShowDrop] = useState();

    useEffect(() => {
      if (focus) {
        const timer = setTimeout(() => {
          // determine which mask element the caret is at
          const caretIndex = (ref || inputRef).current.selectionStart;
          let maskIndex;
          valueParts.some((part, index) => {
            if (part.beginIndex <= caretIndex && part.endIndex >= caretIndex) {
              maskIndex = index;
              return true;
            }
            return false;
          });
          if (maskIndex === undefined && valueParts.length < mask.length) {
            maskIndex = valueParts.length; // first unused one
          }
          if (maskIndex && mask[maskIndex].fixed) {
            maskIndex -= 1; // fixed mask parts are never "active"
          }
          if (maskIndex !== activeMaskIndex) {
            setActiveMaskIndex(maskIndex);
            setActiveOptionIndex(-1);
            setShowDrop(maskIndex >= 0 && mask[maskIndex].options && true);
          }
        }, 10); // 10ms empirically chosen
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [activeMaskIndex, focus, mask, ref, valueParts]);

    const setInputValue = useCallback(
      nextValue => {
        // Calling set value function directly on input because React library
        // overrides setter `event.target.value =` and loses original event
        // target fidelity.
        // https://stackoverflow.com/a/46012210 &&
        // https://github.com/grommet/grommet/pull/3171#discussion_r296415239
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value',
        ).set;
        nativeInputValueSetter.call((ref || inputRef).current, nextValue);
        const event = new Event('input', { bubbles: true });
        (ref || inputRef).current.dispatchEvent(event);
      },
      [ref],
    );

    // This could be due to a paste or as the user is typing.
    const onChangeInput = useCallback(
      event => {
        // Align with the mask.
        const nextValueParts = parseValue(mask, event.target.value);
        const nextValue = nextValueParts.map(part => part.part).join('');

        if (value !== nextValue) {
          setInputValue(nextValue);
          if (onChange) onChange(event);
          setValue(nextValue);
        }
      },
      [mask, onChange, setInputValue, setValue, value],
    );

    const onOption = useCallback(
      option => () => {
        const nextValueParts = [...valueParts];
        nextValueParts[activeMaskIndex] = { part: option };
        // add any fixed parts that follow
        let index = activeMaskIndex + 1;
        while (
          index < mask.length &&
          !nextValueParts[index] &&
          mask[index].fixed
        ) {
          nextValueParts[index] = { part: mask[index].fixed };
          index += 1;
        }
        const nextValue = nextValueParts.map(part => part.part).join('');
        setInputValue(nextValue);
        // restore focus to input
        (ref || inputRef).current.focus();
      },
      [activeMaskIndex, mask, ref, setInputValue, valueParts],
    );

    const onNextOption = useCallback(
      event => {
        const item = mask[activeMaskIndex];
        if (item && item.options) {
          event.preventDefault();
          const index = Math.min(
            activeOptionIndex + 1,
            item.options.length - 1,
          );
          setActiveOptionIndex(index);
        }
      },
      [activeMaskIndex, activeOptionIndex, mask],
    );

    const onPreviousOption = useCallback(
      event => {
        if (activeMaskIndex >= 0 && mask[activeMaskIndex].options) {
          event.preventDefault();
          const index = Math.max(activeOptionIndex - 1, 0);
          setActiveOptionIndex(index);
        }
      },
      [activeMaskIndex, activeOptionIndex, mask],
    );

    const onSelectOption = useCallback(
      event => {
        if (activeMaskIndex >= 0 && activeOptionIndex >= 0) {
          event.preventDefault();
          const option = mask[activeMaskIndex].options[activeOptionIndex];
          onOption(option)();
        }
      },
      [activeMaskIndex, activeOptionIndex, mask, onOption],
    );

    const onEsc = useCallback(
      event => {
        if (showDrop) {
          // we have to stop both synthetic events and native events
          // drop and layer should not close by pressing esc on this input
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
          setShowDrop(false);
        }
      },
      [showDrop],
    );

    const renderPlaceholder = () => {
      return mask.map(item => item.placeholder || item.fixed).join('');
    };

    return (
      <StyledMaskedInputContainer plain={plain}>
        {icon && (
          <StyledIcon reverse={reverse} theme={theme}>
            {icon}
          </StyledIcon>
        )}
        <Keyboard
          onEsc={onEsc}
          onTab={showDrop ? () => setShowDrop(false) : undefined}
          onLeft={undefined}
          onRight={undefined}
          onUp={onPreviousOption}
          onDown={showDrop ? onNextOption : () => setShowDrop(true)}
          onEnter={onSelectOption}
          onKeyDown={onKeyDown}
        >
          <StyledMaskedInput
            ref={ref || inputRef}
            id={id}
            name={name}
            autoComplete="off"
            plain={plain}
            placeholder={placeholder || renderPlaceholder()}
            icon={icon}
            reverse={reverse}
            focus={focus}
            {...rest}
            value={value || ''}
            theme={theme}
            onFocus={event => {
              setFocus(true);
              setShowDrop(true);
              if (onFocus) onFocus(event);
            }}
            onBlur={event => {
              setFocus(false);
              // This will be called when the user clicks on a suggestion,
              // check for that and don't remove the drop in that case.
              // Drop will already have removed itself if the user has focused
              // outside of the Drop.
              if (!dropRef.current) setShowDrop(false);
              if (onBlur) onBlur(event);
            }}
            onChange={onChangeInput}
          />
        </Keyboard>
        {showDrop && mask[activeMaskIndex] && mask[activeMaskIndex].options && (
          <Drop
            id={id ? `masked-input-drop__${id}` : undefined}
            align={{ top: 'bottom', left: 'left' }}
            responsive={false}
            target={(ref || inputRef).current}
            onClickOutside={() => setShowDrop(false)}
            onEsc={() => setShowDrop(false)}
          >
            <Box ref={dropRef}>
              {mask[activeMaskIndex].options.map((option, index) => (
                <Box key={option} flex={false}>
                  <Button
                    tabIndex="-1"
                    onClick={onOption(option)}
                    onMouseOver={() => setActiveOptionIndex(index)}
                    onFocus={() => {}}
                    active={index === activeOptionIndex}
                    hoverIndicator="background"
                  >
                    <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
                      {option}
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          </Drop>
        )}
      </StyledMaskedInputContainer>
    );
  },
);

MaskedInput.displayName = 'MaskedInput';

let MaskedInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MaskedInputDoc = require('./doc').doc(MaskedInput);
}
const MaskedInputWrapper = MaskedInputDoc || MaskedInput;

export { MaskedInputWrapper as MaskedInput };
