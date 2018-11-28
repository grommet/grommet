/* eslint-disable react/no-find-dom-node */
import React, { createRef, Component } from 'react';
import styled from 'styled-components';

import {
  debounce,
  debounceDelay,
  isNodeAfterScroll,
  isNodeBeforeScroll,
  setFocusWithoutScroll,
} from '../../utils';

import { withTheme } from '../hocs';
import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { SelectOption } from './SelectOption';

const ContainerBox = styled(Box)`
  max-height: inherit;

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }

  ${props =>
    props.theme.select.container && props.theme.select.container.extend};
`;

const OptionsBox = styled(Box)`
  scroll-behavior: smooth;
`;

class SelectContainer extends Component {
  static defaultProps = {
    children: null,
    disabled: undefined,
    id: undefined,
    multiple: false,
    name: undefined,
    onKeyDown: undefined,
    onSearch: undefined,
    options: undefined,
    searchPlaceholder: undefined,
    selected: undefined,
    value: '',
  };

  optionsRef = {};

  searchRef = createRef();

  selectRef = createRef();

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

  state = {
    search: '',
    activeIndex: -1,
  };

  componentDidMount() {
    const { onSearch } = this.props;
    const { activeIndex } = this.state;
    // timeout need to send the operation through event loop and allow time to the portal
    // to be available
    setTimeout(() => {
      const selectNode = this.selectRef.current;
      if (onSearch) {
        const input = this.searchRef.current;
        if (input && input.focus) {
          setFocusWithoutScroll(input);
        }
      } else if (selectNode) {
        setFocusWithoutScroll(selectNode);
      }

      // scroll to active option if it is below the fold
      if (activeIndex >= 0) {
        const optionNode = this.optionsRef[activeIndex];
        const { bottom: containerBottom } = selectNode.getBoundingClientRect();
        const { bottom: optionTop } = optionNode.getBoundingClientRect();

        if (containerBottom < optionTop) {
          optionNode.scrollIntoView();
        }
      }
    }, 0);
  }

  onChange = event => {
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

  // wait a debounceDelay of idle time in ms, before notifying that the search changed.
  // the debounceDelay timer starts to count when the user stopped typing
  onSearch = debounce(search => {
    const { onSearch } = this.props;
    onSearch(search);
  }, debounceDelay(this.props));

  selectOption = (option, index) => {
    const { multiple, onChange, options, selected, value } = this.props;

    if (onChange) {
      let nextValue = option;
      let nextSelected = index;
      if (multiple) {
        nextValue = [];
        nextSelected = [];
        let removed = false;
        let selectedIndexes = [];

        if (Array.isArray(selected)) {
          selectedIndexes = selected;
        } else if (Array.isArray(value)) {
          selectedIndexes = value.map(v => options.indexOf(v));
        }

        selectedIndexes.forEach(selectedIndex => {
          if (selectedIndex === index) {
            removed = true;
          } else {
            nextValue.push(options[selectedIndex]);
            nextSelected.push(selectedIndex);
          }
        });
        if (!removed) {
          nextValue.push(option);
          nextSelected.push(index);
        }
      }

      onChange({
        target: this.searchRef.current,
        option,
        value: nextValue,
        selected: nextSelected,
      });
    }
  };

  onNextOption = event => {
    const { options } = this.props;
    const { activeIndex } = this.state;
    event.preventDefault();
    const index = Math.min(activeIndex + 1, options.length - 1);
    this.setState({ activeIndex: index }, () => {
      const buttonNode = this.optionsRef[index];
      const selectNode = this.selectRef.current;

      if (isNodeAfterScroll(buttonNode, selectNode) && selectNode.scrollBy) {
        selectNode.scrollBy(0, buttonNode.getBoundingClientRect().height);
      }
    });
  };

  onPreviousOption = event => {
    const { activeIndex } = this.state;
    event.preventDefault();
    const index = Math.max(activeIndex - 1, 0);
    this.setState({ activeIndex: index }, () => {
      const buttonNode = this.optionsRef[index];
      const selectNode = this.selectRef.current;

      if (isNodeBeforeScroll(buttonNode, selectNode) && selectNode.scrollBy) {
        selectNode.scrollBy(0, -buttonNode.getBoundingClientRect().height);
      }
    });
  };

  onSelectOption = event => {
    const { options } = this.props;
    const { activeIndex } = this.state;
    if (activeIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      this.selectOption(options[activeIndex], activeIndex);
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
      id,
      onKeyDown,
      onSearch,
      options,
      searchPlaceholder,
      theme,
    } = this.props;
    const { activeIndex, search } = this.state;

    const customSearchInput = theme.select.searchInput;
    const SelectTextInput = customSearchInput || TextInput;

    return (
      <Keyboard
        onEnter={this.onSelectOption}
        onUp={this.onPreviousOption}
        onDown={this.onNextOption}
        onKeyDown={onKeyDown}
      >
        <ContainerBox id={id ? `${id}__select-drop` : undefined} theme={theme}>
          {onSearch && (
            <Box pad={!customSearchInput ? 'xsmall' : undefined} flex={false}>
              <SelectTextInput
                focusIndicator={!customSearchInput}
                size="small"
                ref={this.searchRef}
                type="search"
                value={search}
                placeholder={searchPlaceholder}
                onChange={this.onChange}
              />
            </Box>
          )}
          <OptionsBox
            flex="shrink"
            role="menubar"
            tabIndex="-1"
            ref={this.selectRef}
            overflow="auto"
            theme={theme}
          >
            <InfiniteScroll items={options} step={theme.select.step} replace>
              {(option, index) => {
                const isDisabled = this.isDisabled(index);
                const isSelected = this.isSelected(index);
                const isActive = isSelected || activeIndex === index;
                return (
                  <SelectOption
                    key={this.optionValue(index)}
                    ref={ref => {
                      this.optionsRef[index] = ref;
                    }}
                    disabled={isDisabled || undefined}
                    active={isActive}
                    selected={isSelected}
                    option={option}
                    onClick={
                      !isDisabled
                        ? () => this.selectOption(option, index)
                        : undefined
                    }
                  >
                    {children ? (
                      children(option, index, options, {
                        active: isActive,
                        disabled: isDisabled,
                        selected: isSelected,
                      })
                    ) : (
                      <Box align="start" pad="small">
                        <Text margin="none">{this.optionLabel(index)}</Text>
                      </Box>
                    )}
                  </SelectOption>
                );
              }}
            </InfiniteScroll>
          </OptionsBox>
        </ContainerBox>
      </Keyboard>
    );
  }
}

const SelectContainerWrapper = withTheme(SelectContainer);

export { SelectContainerWrapper as SelectContainer };
