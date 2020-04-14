import React, { createRef, Component } from 'react';
import styled, { withTheme } from 'styled-components';

import {
  debounce,
  debounceDelay,
  selectedStyle,
  setFocusWithoutScroll,
} from '../../utils';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { StyledContainer } from './StyledSelect';
import { applyKey } from './utils';

// position relative is so scroll can be managed correctly
const OptionsBox = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
`;

const OptionBox = styled(Box)`
  ${props => props.selected && selectedStyle}
`;

const SelectOption = styled(Button)`
  display: block;
  width: 100%;
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

  searchRef = createRef();

  optionsRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      activeIndex: -1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { options, optionIndexesInValue, onSearch } = nextProps;

    if (onSearch) {
      if (
        prevState.activeIndex === -1 &&
        prevState.search === '' &&
        options &&
        optionIndexesInValue
      ) {
        const activeIndex = optionIndexesInValue.length
          ? optionIndexesInValue[0]
          : -1;
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

  selectOption = index => event => {
    const {
      multiple,
      onChange,
      options,
      optionIndexesInValue,
      valueKey,
    } = this.props;
    if (onChange) {
      let nextValue;
      let nextSelected;
      if (multiple) {
        const nextOptionIndexesInValue = optionIndexesInValue.slice(0);
        const valueIndex = optionIndexesInValue.indexOf(index);
        if (valueIndex === -1) {
          nextOptionIndexesInValue.push(index);
        } else {
          nextOptionIndexesInValue.splice(index, 1);
        }
        nextValue = nextOptionIndexesInValue.map(i =>
          valueKey && valueKey.reduce
            ? applyKey(options[i], valueKey)
            : options[i],
        );
        nextSelected = nextOptionIndexesInValue;
      } else {
        nextValue =
          valueKey && valueKey.reduce
            ? applyKey(options[index], valueKey)
            : options[index];
        nextSelected = index;
      }
      onChange(event, {
        option: options[index],
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
        () => this.clearKeyboardNavigation(),
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
        () => this.clearKeyboardNavigation(),
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
    const { activeIndex } = this.state;
    if (activeIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      this.selectOption(activeIndex)(event);
    }
  };

  optionLabel = index => {
    const { options, labelKey } = this.props;
    return applyKey(options[index], labelKey);
  };

  optionValue = index => {
    const { options, valueKey } = this.props;
    return applyKey(options[index], valueKey);
  };

  isDisabled = index => {
    const { disabled, disabledKey, options } = this.props;
    const option = options[index];
    let result;
    if (disabledKey) {
      result = applyKey(option, disabledKey);
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
          <OptionsBox role="menubar" tabIndex="-1" ref={this.optionsRef}>
            {options.length > 0 ? (
              <InfiniteScroll
                items={options}
                step={theme.select.step}
                onMore={onMore}
                replace={replace}
                show={activeIndex !== -1 ? activeIndex : undefined}
              >
                {(option, index, optionRef) => {
                  const isDisabled = this.isDisabled(index);
                  const isSelected = this.isSelected(index);
                  const isActive = activeIndex === index;
                  return (
                    <SelectOption
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={optionRef}
                      tabIndex="-1"
                      role="menuitem"
                      hoverIndicator="background"
                      disabled={isDisabled || undefined}
                      active={isActive}
                      selected={isSelected}
                      option={option}
                      onMouseOver={
                        !isDisabled ? this.onActiveOption(index) : undefined
                      }
                      onClick={
                        !isDisabled ? this.selectOption(index) : undefined
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
                tabIndex="-1"
                role="menuitem"
                hoverIndicator="background"
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
