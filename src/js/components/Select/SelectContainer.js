/* eslint-disable react/no-find-dom-node */
import React, { createRef, Component } from 'react';
import styled from 'styled-components';

import {
  debounce,
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
    /* eslint-disable-next-line react/prop-types */
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

  // wait 300ms of idle time before notifying that the search changed
  // 300ms seems like the right amount to wait for after the used stopped typing
  onSearch = debounce(search => {
    const { onSearch } = this.props;
    onSearch(search);
  }, 300);

  selectOption = (option, index) => {
    const {
      /* eslint-disable-next-line react/prop-types */
      multiple,
      onChange,
      options,
      selected,
      value,
    } = this.props;

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

  render() {
    /* eslint-disable react/prop-types */
    const {
      children,
      disabled,
      id,
      name,
      onKeyDown,
      onSearch,
      options,
      searchPlaceholder,
      selected,
      theme,
      value,
    } = this.props;
    /* eslint-enable react/prop-types */
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
            <InfiniteScroll items={options} step={theme.select.step}>
              {(option, index) => {
                const isDisabled =
                  Array.isArray(disabled) && disabled.indexOf(index) !== -1;
                const isSelected =
                  selected === index ||
                  (Array.isArray(selected) && selected.indexOf(index) !== -1);
                const isActive =
                  isSelected ||
                  activeIndex === index ||
                  (option && option === value) ||
                  (option &&
                    Array.isArray(value) &&
                    value.indexOf(option) !== -1);
                return (
                  <SelectOption
                    ref={ref => {
                      this.optionsRef[index] = ref;
                    }}
                    disabled={isDisabled || undefined}
                    active={isActive}
                    selected={isSelected}
                    option={option}
                    key={`option_${name || ''}_${index}`}
                    onClick={() => this.selectOption(option, index)}
                  >
                    {children ? (
                      children(option, index, options, {
                        active: isActive,
                        disabled: isDisabled,
                        selected: isSelected,
                      })
                    ) : (
                      <Box align="start" pad="small">
                        <Text margin="none">
                          {option !== null && option !== undefined
                            ? option.toString()
                            : undefined}
                        </Text>
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
