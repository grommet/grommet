import React, {
  forwardRef,
  useCallback,
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
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { sizeStyle, useForwardedRef } from '../../utils';

import {
  StyledMaskedInput,
  StyledMaskedInputContainer,
  StyledIcon,
} from './StyledMaskedInput';
import { MaskedInputPropTypes } from './propTypes';

const parseValue = (mask, value, alwaysShowMask) => {
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

      // grab however much of value (starting at valueIndex) matches
      // item.fixed. If none matches it and there is more in value
      // add in the fixed item.
      let matching = 0;
      while (
        matching < length &&
        value[valueIndex + matching] === item.fixed[matching]
      ) {
        matching += 1;
      }

      console.log('fixed ', item.fixed, matching, valueIndex, value.length);
      if (matching > 0) {
        let part = value.slice(valueIndex, valueIndex + matching);
        if (valueIndex + matching - 1 < value.length) {
          // matched part of the fixed portion but there's more stuff
          // after it. Go ahead and fill in the entire fixed chunk
          part = item.fixed;
        }
        valueParts.push({
          part,
          beginIndex: valueIndex,
          endIndex: valueIndex + matching - 1,
        });
        valueIndex += matching;
      } else {
        valueParts.push({
          part: item.fixed,
          beginIndex: valueIndex,
          endIndex: valueIndex + length - 1,
        });
      }

      maskIndex += 1;
      found = true;
    } else if (item.options) {
      // reverse assuming larger is later
      found = item.options
        .slice(0)
        .reverse()
        // eslint-disable-next-line no-loop-func
        .some((option) => {
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
  console.log('VALUE PARTS', value, valueParts);
  if (alwaysShowMask) {
    while (maskIndex < mask.length) {
      console.log('NEED to ADD parts');
      const item = mask[maskIndex];
      const part = item.fixed || item.placeholder || '_';
      valueParts.push({
        part,
        beginIndex: valueIndex,
        endIndex: valueIndex + part.length - 1,
      });
      valueIndex += part.length;
      maskIndex += 1;
    }
  }
  return valueParts;
};

const defaultMask = [
  {
    regexp: /[^]*/,
  },
];

const defaultValue = (mask, alwaysShowMask) => {
  if (alwaysShowMask) {
    return mask.map(item => item.fixed || item.placeholder).join('');
  }
  return undefined;
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

const dropAlign = { top: 'bottom', left: 'left' };

const MaskedInput = forwardRef(
  (
    {
      a11yTitle,
      dropHeight,
      dropProps,
      focus: focusProp,
      focusIndicator = true,
      icon,
      id,
      mask = defaultMask,
      alwaysShowMask,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onClick,
      placeholder,
      plain,
      reverse,
      textAlign,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const formContext = useContext(FormContext);

    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp || defaultValue(mask, alwaysShowMask),
    });

    const [valueParts, setValueParts] =
      useState(parseValue(mask, value, alwaysShowMask));
    useEffect(() => {
      setValueParts(parseValue(mask, value, alwaysShowMask));
    }, [alwaysShowMask, mask, value]);

    const inputRef = useForwardedRef(ref);
    const dropRef = useRef();

    // Caller's ref, if provided
    const [dropPropsTarget, setDropPropsTarget] = useState();
    useEffect(() => {
      let nextDropPropsTarget;
      // If caller provided a ref, set to 'pending' until ref.current is defined
      if (dropProps && 'target' in dropProps) {
        nextDropPropsTarget = dropProps.target || 'pending';
        setDropPropsTarget(nextDropPropsTarget);
      }
    }, [dropProps]);

    const [focus, setFocus] = useState(focusProp);
    const [activeMaskIndex, setActiveMaskIndex] = useState();
    const [activeOptionIndex, setActiveOptionIndex] = useState();
    const [showDrop, setShowDrop] = useState();

    useEffect(() => {
      if (focus) {
        const timer = setTimeout(() => {
          // determine which mask element the caret is at
          const caretIndex = inputRef.current.selectionStart;
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
    }, [activeMaskIndex, focus, inputRef, mask, valueParts]);

    const setInputValue = useCallback(
      (nextValue) => {
        // Calling set value function directly on input because React library
        // overrides setter `event.target.value =` and loses original event
        // target fidelity.
        // https://stackoverflow.com/a/46012210 &&
        // https://github.com/grommet/grommet/pull/3171#discussion_r296415239
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value',
        ).set;
        nativeInputValueSetter.call(inputRef.current, nextValue);
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      },
      [inputRef],
    );

    // This could be due to a paste or as the user is typing.
    const onChangeInput = useCallback(
      (event) => {
        // Align with the mask.
        const pos = inputRef.current.selectionStart;
        console.log('ONCHANGE pos', pos);
        const nextValueParts = 
          parseValue(mask, event.target.value, alwaysShowMask);
        const nextValue = nextValueParts.map((part) => part.part).join('');

        if (nextValue !== event.target.value) {
          // The mask required inserting something, change the input.
          // This will re-trigger this callback with the next value
          setInputValue(nextValue);
        } else if (value !== nextValue) {
          setValue(nextValue);
          if (onChange) onChange(event);
        }
      },
      [alwaysShowMask, mask, onChange, setInputValue, setValue, value,
        inputRef],
    );

    const onOption = useCallback(
      (option) => () => {
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
        const nextValue = nextValueParts.map((part) => part.part).join('');
        setInputValue(nextValue);
        // restore focus to input
        inputRef.current.focus();
      },
      [activeMaskIndex, inputRef, mask, setInputValue, valueParts],
    );

    const onNextOption = useCallback(
      (event) => {
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
      (event) => {
        if (activeMaskIndex >= 0 && mask[activeMaskIndex].options) {
          event.preventDefault();
          const index = Math.max(activeOptionIndex - 1, 0);
          setActiveOptionIndex(index);
        }
      },
      [activeMaskIndex, activeOptionIndex, mask],
    );

    const onSelectOption = useCallback(
      (event) => {
        if (activeMaskIndex >= 0 && activeOptionIndex >= 0) {
          event.preventDefault();
          const option = mask[activeMaskIndex].options[activeOptionIndex];
          onOption(option)();
        }
      },
      [activeMaskIndex, activeOptionIndex, mask, onOption],
    );

    const onEsc = useCallback(
      (event) => {
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

    const onHideDrop = useCallback(() => setShowDrop(false), []);

    const renderPlaceholder = () =>
      mask.map((item) => item.placeholder || item.fixed).join('');

    const move = (evt, offset) => {
      if (!inputRef.current.value) return;  
      // try building valid index list and snap current to that.
      const pos = inputRef.current.selectionStart;
      const { length } = inputRef.current.value;

      let nextPos = pos + offset;
      console.log(
        `${offset > 0 ? 'RIGHT' : 'LEFT'} ${pos} -> ${nextPos} of ${length}`,
        evt);

      const validPos = new Array(length+1).fill('X');
      valueParts.forEach((part, index) => {
        if (!mask[index].fixed) {
          validPos.fill('.',
            part.beginIndex,
            part.endIndex + 2);
        }
      });
      let valid = validPos[nextPos] === '.';
      if (!valid) {
        if (evt) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        
        while (! valid && nextPos > 0 && nextPos < length) {
          nextPos += offset || 1;
          valid = validPos[nextPos] === '.';
        }
        if (valid) {
          inputRef.current.setSelectionRange(nextPos, nextPos);
        }
      }
      validPos[nextPos] = 'o';
      console.log(`${value.slice(0, nextPos)}|${value.slice(nextPos+1)}`);
      console.log(validPos.join(''), valid);
    };
    const onRight = evt => move(evt, 1);
    const onLeft = evt => move(evt, -1);

    useEffect(() => move(null, 0));

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
          onLeft={alwaysShowMask && onLeft}
          onRight={alwaysShowMask && onRight}
          onUp={onPreviousOption}
          onDown={showDrop ? onNextOption : () => setShowDrop(true)}
          onEnter={onSelectOption}
          onKeyDown={onKeyDown}
        >
          <StyledMaskedInput
            ref={inputRef}
            aria-label={a11yTitle}
            id={id}
            name={name}
            autoComplete="off"
            focusIndicator={focusIndicator}
            plain={plain}
            placeholder={placeholder || renderPlaceholder()}
            icon={icon}
            reverse={reverse}
            focus={focus}
            textAlign={textAlign}
            {...rest}
            onClick={evt => {
              if (alwaysShowMask) {
                console.log('click - ', inputRef.current.selectionStart);
                move(null, 0);
              }
              if (onClick) onClick(evt);
            }}
            value={value}
            theme={theme}
            onFocus={(event) => {
              console.log('ON FOCUS', mask, valueParts);
              if (inputRef.current) {
                if (alwaysShowMask) {
                  for (let i = 0;
                    i < valueParts.length && i < mask.length;
                    i += 1)
                  {
                    if (!mask[i].fixed) {
                      inputRef.current.setSelectionRange(
                        valueParts[i].beginIndex,
                        valueParts[i].endIndex + 1);
                      break;
                    }
                  }
                }
              }
              setFocus(true);
              setShowDrop(true);
              if (onFocus) onFocus(event);
            }}
            onBlur={(event) => {
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
        {showDrop &&
          mask[activeMaskIndex] &&
          mask[activeMaskIndex].options &&
          // If caller has specified dropProps.target, ensure target is defined
          dropPropsTarget !== 'pending' && (
            <Drop
              id={id ? `masked-input-drop__${id}` : undefined}
              align={dropAlign}
              responsive={false}
              target={inputRef.current}
              onClickOutside={onHideDrop}
              onEsc={onHideDrop}
              {...dropProps}
            >
              <ContainerBox
                ref={dropRef}
                overflow="auto"
                dropHeight={dropHeight}
              >
                {mask[activeMaskIndex].options.map((option, index) => {
                  // Determine whether the label is done as a child or
                  // as an option Button kind property.
                  const child = !theme.button.option ? (
                    <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
                      {option}
                    </Box>
                  ) : undefined;
                  // if we have a child, turn on plain, and hoverIndicator

                  return (
                    <Box key={option} flex={false}>
                      <Button
                        tabIndex="-1"
                        onClick={onOption(option)}
                        onMouseOver={() => setActiveOptionIndex(index)}
                        onFocus={() => {}}
                        active={index === activeOptionIndex}
                        plain={!child ? undefined : true}
                        align="start"
                        kind={!child ? 'option' : undefined}
                        hoverIndicator={!child ? undefined : 'background'}
                        label={!child ? option : undefined}
                      >
                        {child}
                      </Button>
                    </Box>
                  );
                })}
              </ContainerBox>
            </Drop>
          )}
      </StyledMaskedInputContainer>
    );
  },
);

MaskedInput.displayName = 'MaskedInput';
MaskedInput.propTypes = MaskedInputPropTypes;

export { MaskedInput };
