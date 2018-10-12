/* eslint-disable react/no-find-dom-node */
import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  debounce,
  isNodeAfterScroll,
  isNodeBeforeScroll,
  setFocusWithoutScroll,
} from '../../utils';

import { withTheme } from '../hocs';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

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
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onSearch: PropTypes.func,
    options: PropTypes.arrayOf(),
    searchPlaceholder: PropTypes.string,
    selected: PropTypes.bool,
    theme: PropTypes.shape({}).isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    id: undefined,
    multiple: false,
    name: undefined,
    onKeyDown: undefined,
    onSearch: undefined,
    options: undefined,
    searchPlaceholder: undefined,
    selected: false,
    value: '',
  }

  optionsRef = {}

  searchRef = createRef()

  selectRef = createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const { options, value } = nextProps;

    if (prevState.activeIndex === -1 && prevState.search === '' && options && value) {
      const optionValue = Array.isArray(value) && value.length ? value[0] : value;
      const activeIndex = options.indexOf(optionValue);
      return {
        activeIndex,
      };
    }
    if (prevState.activeIndex === -1 && prevState.search !== '') {
      return {
        activeIndex: 0,
      };
    }

    return null;
  }

  state = {
    search: '',
    activeIndex: -1,
  }

  componentDidMount() {
    const { onSearch } = this.props;
    const { activeIndex } = this.state;
    // timeout need to send the operation through event loop and allow time to the portal
    // to be available
    setTimeout(() => {
      const selectNode = findDOMNode(this.selectRef.current);
      if (onSearch) {
        const input = findDOMNode(this.searchRef.current);
        if (input && input.focus) {
          setFocusWithoutScroll(input);
        }
      } else if (this.selectRef) {
        setFocusWithoutScroll(findDOMNode(this.selectRef.current));
      }

      // scroll to active option if it is below the fold
      if (activeIndex >= 0) {
        const optionNode = findDOMNode(this.optionsRef[activeIndex]);
        const { bottom: containerBottom } = selectNode.getBoundingClientRect();
        const { bottom: optionTop } = optionNode.getBoundingClientRect();

        if (containerBottom < optionTop) {
          optionNode.scrollIntoView();
        }
      }
    }, 0);
  }

  onInput = (event) => {
    this.setState(
      {
        search: event.target.value,
        activeIndex: -1,
      },
      () => {
        const { search } = this.state;
        this.onSearch(search);
      }
    );
  }

  // wait 300ms of idle time before notifying that the search changed
  // 300ms seems like the right amount to wait for after the used stopped typing
  onSearch = debounce((search) => {
    const { onSearch } = this.props;
    onSearch(search);
  }, 300)

  selectOption = (option, index) => {
    const {
      multiple, onChange, options, selected, value,
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

        selectedIndexes.forEach((selectedIndex) => {
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
        target: findDOMNode(this.searchRef.current),
        option,
        value: nextValue,
        selected: nextSelected,
      });
    }
  }

  onNextOption = (event) => {
    const { options } = this.props;
    const { activeIndex } = this.state;
    event.preventDefault();
    const index = Math.min(activeIndex + 1, options.length - 1);
    this.setState({ activeIndex: index }, () => {
      const buttonNode = findDOMNode(this.optionsRef[index]);
      const selectNode = findDOMNode(this.selectRef.current);

      if (isNodeAfterScroll(buttonNode, selectNode) && selectNode.scrollBy) {
        selectNode.scrollBy(0, buttonNode.getBoundingClientRect().height);
      }
    });
  }

  onPreviousOption = (event) => {
    const { activeIndex } = this.state;
    event.preventDefault();
    const index = Math.max(activeIndex - 1, 0);
    this.setState({ activeIndex: index }, () => {
      const buttonNode = findDOMNode(this.optionsRef[index]);
      const selectNode = findDOMNode(this.selectRef.current);

      if (isNodeBeforeScroll(buttonNode, selectNode) && selectNode.scrollBy) {
        selectNode.scrollBy(0, -buttonNode.getBoundingClientRect().height);
      }
    });
  }

  onSelectOption = (event) => {
    const { options } = this.props;
    const { activeIndex } = this.state;
    if (activeIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      this.selectOption(options[activeIndex], activeIndex);
    }
  }

  render() {
    const {
      children,
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
        <ContainerBox
          id={id ? `${id}__select-drop` : undefined}
          theme={theme}
        >
          {onSearch && (
            <Box pad={!customSearchInput ? 'xsmall' : undefined} flex={false}>
              <SelectTextInput
                focusIndicator={!customSearchInput}
                size='small'
                ref={this.searchRef}
                type='search'
                value={search}
                placeholder={searchPlaceholder}
                onInput={this.onInput}
              />
            </Box>
          )}
          <OptionsBox
            flex='shrink'
            role='menubar'
            tabIndex='-1'
            ref={this.selectRef}
            overflow='auto'
            theme={theme}
          >
            <InfiniteScroll items={options} step={theme.select.step}>
              {(option, index) => (
                <Box key={`option_${name || ''}_${index}`} flex={false}>
                  <Button
                    role='menuitem'
                    ref={(ref) => { this.optionsRef[index] = ref; }}
                    active={
                      selected === index
                      || (Array.isArray(selected) && selected.indexOf(index) !== -1)
                      || activeIndex === index
                      || (option && option === value)
                      || (option && Array.isArray(value) && value.indexOf(option) !== -1)
                    }
                    onClick={() => this.selectOption(option, index)}
                    hoverIndicator='background'
                  >
                    {children ? children(option, index, options) : (
                      <Box align='start' pad='small'>
                        <Text margin='none'>
                          {(option !== null && option !== undefined)
                            ? option.toString() : undefined}
                        </Text>
                      </Box>
                    )}
                  </Button>
                </Box>
              )}
            </InfiniteScroll>
          </OptionsBox>
        </ContainerBox>
      </Keyboard>
    );
  }
}

const SelectContainerWrapper = withTheme(SelectContainer);

export { SelectContainerWrapper as SelectContainer };
