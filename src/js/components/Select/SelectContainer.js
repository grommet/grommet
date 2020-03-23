import React, { createRef, Component } from 'react';
import styled, { withTheme } from 'styled-components';

import {
  debounce,
  debounceDelay,
  isNodeAfterScroll,
  isNodeBeforeScroll,
  selectedStyle,
  setFocusWithoutScroll,
} from '../../utils';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { SelectOption } from './SelectOption';
import { StyledContainer } from './StyledSelect';

// position relative is so scroll can be managed correctly
const OptionsBox = styled(Box)`
  position: relative;
  scroll-behavior: smooth;
`;

const OptionBox = styled(Box)`
  ${props => props.selected && selectedStyle}
`;

class SelectContainer extends Component {
  static defaultProps = {
    children: null,
    disabled: undefined,
    emptySearchMessage: 'No matches found',
    id: undefined,
    multiple: false,
    name: undefined,
    onKeyDown: undefined,
    onSearch: undefined,
    options: undefined,
    searchPlaceholder: undefined,
    selected: undefined,
    value: '',
    replace: true,
  };

  optionRefs = {};

  searchRef = createRef();

  optionsRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      initialOptions: props.options,
      search: '',
      activeIndex: -1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { options, value, onSearch } = nextProps;

    if (onSearch) {
      if (
        prevState.activeIndex === -1 &&
        prevState.search === '' &&
        options &&
        value
      ) {
        const optionValue =
          Array.isArray(value) && value.length ? value[0] : value;
        const activeIndex = options.indexOf(optionValue);
        return { activeIndex };
      }
      if (prevState.activeIndex === -1 && prevState.search !== '') {
        return { activeIndex: 0 };
      }
    }
    return null;
  }

  componentDidMount() {
    const { onSearch } = this.props;
    const { activeIndex } = this.state;
    // timeout need to send the operation through event loop and allow
    // time to the portal to be available
    setTimeout(() => {
      const optionsNode = this.optionsRef.current;
      if (onSearch) {
        const input = this.searchRef.current;
        if (input && input.focus) {
          setFocusWithoutScroll(input);
        }
      } else if (optionsNode) {
        setFocusWithoutScroll(optionsNode);
      }

      // scroll to active option if it is below the fold
      if (activeIndex >= 0 && optionsNode) {
        const optionNode = this.optionRefs[activeIndex];
        const { bottom: containerBottom } = optionsNode.getBoundingClientRect();
        if (optionNode) {
          const { bottom: optionTop } = optionNode.getBoundingClientRect();

          if (containerBottom < optionTop) {
            optionNode.scrollIntoView();
          }
        }
      }
    }, 0);
  }

  onSearchChange = event => {
    this.setState(
      {
        search: event.target.value,
        activeIndex: -1,
      },
      () => {
        const { search } = this.state;
        this.onSearch(search);
      },
    );
  };

  // wait a debounceDelay of idle time in ms, before notifying that the search
  // changed.
  // the debounceDelay timer starts to count when the user stopped typing
  onSearch = debounce(search => {
    const { onSearch } = this.props;
    onSearch(search);
  }, debounceDelay(this.props));

  selectOption = option => event => {
    const { multiple, onChange, value, valueKey, selected } = this.props;
    const { initialOptions } = this.state;
    if (onChange) {
      let nextValue = Array.isArray(value) ? value.slice() : [];
      // preserve compatibility until selected is deprecated
      if (selected) {
        nextValue = selected.map(s => initialOptions[s]);
      }
      const optionValue = valueKey ? option[valueKey] : option;

      if (multiple) {
        if (nextValue.indexOf(optionValue) !== -1) {
          nextValue = nextValue.filter(v => v !== optionValue);
        } else {
          nextValue.push(optionValue);
        }
      } else {
        nextValue = optionValue;
      }

      const nextSelected = Array.isArray(nextValue)
        ? nextValue.map(v => initialOptions.indexOf(v))
        : initialOptions.indexOf(nextValue);
      onChange(event, {
        option,
        value: nextValue,
        selected: nextSelected,
      });
    }
  };

  // We use the state keyboardNavigating to prevent mouse over interaction
  // from triggering changing the activeIndex due to scrolling.
  clearKeyboardNavigation = () => {
    clearTimeout(this.keyboardNavTimer);
    this.keyboardNavTimer = setTimeout(() => {
      this.setState({ keyboardNavigating: false });
    }, 100); // 100ms was empirically determined
  };

  onNextOption = event => {
    const { options } = this.props;
    const { activeIndex } = this.state;
    event.preventDefault();
    let nextActiveIndex = activeIndex + 1;
    while (
      nextActiveIndex < options.length &&
      this.isDisabled(nextActiveIndex)
    ) {
      nextActiveIndex += 1;
    }
    if (nextActiveIndex !== options.length) {
      this.setState(
        { activeIndex: nextActiveIndex, keyboardNavigating: true },
        () => {
          const buttonNode = this.optionRefs[nextActiveIndex];
          const optionsNode = this.optionsRef.current;

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
          this.clearKeyboardNavigation();
        },
      );
    }
  };

  onPreviousOption = event => {
    const { activeIndex } = this.state;
    event.preventDefault();
    let nextActiveIndex = activeIndex - 1;
    while (nextActiveIndex >= 0 && this.isDisabled(nextActiveIndex)) {
      nextActiveIndex -= 1;
    }
    if (nextActiveIndex >= 0) {
      this.setState(
        { activeIndex: nextActiveIndex, keyboardNavigating: true },
        () => {
          const buttonNode = this.optionRefs[nextActiveIndex];
          const optionsNode = this.optionsRef.current;

          if (
            buttonNode &&
            isNodeBeforeScroll(buttonNode, optionsNode) &&
            optionsNode.scrollTo
          ) {
            optionsNode.scrollTo(0, buttonNode.offsetTop);
          }
          this.clearKeyboardNavigation();
        },
      );
    }
  };

  onActiveOption = index => () => {
    const { keyboardNavigating } = this.state;
    if (!keyboardNavigating) {
      this.setState({ activeIndex: index });
    }
  };

  onSelectOption = event => {
    const { options } = this.props;
    const { activeIndex } = this.state;
    if (activeIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      this.selectOption(options[activeIndex])(event);
    }
  };

  optionLabel = index => {
    const { options, labelKey } = this.props;
    const option = options[index];
    let optionLabel;
    if (labelKey) {
      if (typeof labelKey === 'function') {
        optionLabel = labelKey(option);
      } else {
        optionLabel = option[labelKey];
      }
    } else {
      optionLabel = option;
    }
    return optionLabel;
  };

  optionValue = index => {
    const { options, valueKey } = this.props;
    const option = options[index];
    let optionValue;
    if (valueKey) {
      if (typeof valueKey === 'function') {
        optionValue = valueKey(option);
      } else {
        optionValue = option[valueKey];
      }
    } else {
      optionValue = option;
    }
    return optionValue;
  };

  isDisabled = index => {
    const { disabled, disabledKey, options } = this.props;
    const option = options[index];
    let result;
    if (disabledKey) {
      if (typeof disabledKey === 'function') {
        result = disabledKey(option, index);
      } else {
        result = option[disabledKey];
      }
    } else if (Array.isArray(disabled)) {
      if (typeof disabled[0] === 'number') {
        result = disabled.indexOf(index) !== -1;
      } else {
        const optionValue = this.optionValue(index);
        result = disabled.indexOf(optionValue) !== -1;
      }
    }
    return result;
  };

  isSelected = index => {
    const { selected, value, valueKey } = this.props;
    let result;
    if (selected) {
      // deprecated in favor of value
      result = selected.indexOf(index) !== -1;
    } else {
      const optionValue = this.optionValue(index);
      if (Array.isArray(value)) {
        if (value.length === 0) {
          result = false;
        } else if (typeof value[0] !== 'object') {
          result = value.indexOf(optionValue) !== -1;
        } else if (valueKey) {
          result = value.some(valueItem => {
            const valueValue =
              typeof valueKey === 'function'
                ? valueKey(valueItem)
                : valueItem[valueKey];
            return valueValue === optionValue;
          });
        }
      } else if (valueKey && typeof value === 'object') {
        const valueValue =
          typeof valueKey === 'function' ? valueKey(value) : value[valueKey];
        result = valueValue === optionValue;
      } else {
        result = value === optionValue;
      }
    }
    return result;
  };

  render() {
    const {
      children,
      dropHeight,
      emptySearchMessage,
      id,
      onMore,
      onKeyDown,
      onSearch,
      options,
      searchPlaceholder,
      theme,
      replace,
    } = this.props;
    const { activeIndex, search } = this.state;

    const customSearchInput = theme.select.searchInput;
    const SelectTextInput = customSearchInput || TextInput;
    const selectOptionsStyle = {
      ...theme.select.options.box,
      ...theme.select.options.container,
    };

    return (
      <Keyboard
        onEnter={this.onSelectOption}
        onUp={this.onPreviousOption}
        onDown={this.onNextOption}
        onKeyDown={onKeyDown}
      >
        <StyledContainer
          as={Box}
          id={id ? `${id}__select-drop` : undefined}
          dropHeight={dropHeight}
        >
          {onSearch && (
            <Box pad={!customSearchInput ? 'xsmall' : undefined} flex={false}>
              <SelectTextInput
                focusIndicator={!customSearchInput}
                size="small"
                ref={this.searchRef}
                type="search"
                value={search}
                placeholder={searchPlaceholder}
                onChange={this.onSearchChange}
              />
            </Box>
          )}
          <OptionsBox
            flex="shrink"
            role="menubar"
            tabIndex="-1"
            ref={this.optionsRef}
            overflow="auto"
          >
            {options.length > 0 ? (
              <InfiniteScroll
                items={options}
                step={theme.select.step}
                onMore={onMore}
                replace={replace}
              >
                {(option, index) => {
                  const isDisabled = this.isDisabled(index);
                  const isSelected = this.isSelected(index);
                  const isActive = activeIndex === index;
                  return (
                    <SelectOption
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={ref => {
                        this.optionRefs[index] = ref;
                      }}
                      disabled={isDisabled || undefined}
                      active={isActive}
                      selected={isSelected}
                      option={option}
                      onMouseOver={
                        !isDisabled ? this.onActiveOption(index) : undefined
                      }
                      onClick={
                        !isDisabled ? this.selectOption(option) : undefined
                      }
                    >
                      {children ? (
                        children(option, index, options, {
                          active: isActive,
                          disabled: isDisabled,
                          selected: isSelected,
                        })
                      ) : (
                        <OptionBox
                          {...selectOptionsStyle}
                          selected={isSelected}
                        >
                          <Text {...theme.select.options.text}>
                            {this.optionLabel(index)}
                          </Text>
                        </OptionBox>
                      )}
                    </SelectOption>
                  );
                }}
              </InfiniteScroll>
            ) : (
              <SelectOption
                key="search_empty"
                disabled
                option={emptySearchMessage}
              >
                <OptionBox {...selectOptionsStyle}>
                  <Text {...theme.select.container.text}>
                    {emptySearchMessage}
                  </Text>
                </OptionBox>
              </SelectOption>
            )}
          </OptionsBox>
        </StyledContainer>
      </Keyboard>
    );
  }
}

Object.setPrototypeOf(SelectContainer.defaultProps, defaultProps);

const SelectContainerWrapper = withTheme(SelectContainer);

export { SelectContainerWrapper as SelectContainer };
