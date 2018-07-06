import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
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

const SelectContainerBox = styled(Box)`
  max-height: ${props => props.theme.select.drop.maxHeight};
  scroll-behavior: smooth;
`;

class SelectContainer extends Component {
  state = {
    activeIndex: -1, // for tracking keyboard interaction
    search: '',
  }
  static defaultProps = {
    value: '',
  }

  optionsRef = {}
  searchRef = createRef()
  selectRef = createRef()

  componentDidMount() {
    const { onSearch } = this.props;
    // timeout need to send the operation through event loop and allow time to the portal
    // to be available
    setTimeout(() => {
      if (onSearch) {
        const input = findDOMNode(this.searchRef.current);
        if (input && input.focus) {
          setFocusWithoutScroll(input);
        }
      } else if (this.selectRef) {
        setFocusWithoutScroll(findDOMNode(this.selectRef.current));
      }
    }, 0);
  }

  onInput = (event) => {
    this.setState(
      { search: event.target.value },
      () => this.onSearch(this.state.search)
    );
  }

  // wait 300ms of idle time before notifying that the search changed
  // 300ms seems like the right amount to wait for after the used stopped typing
  onSearch = debounce(search => this.props.onSearch(search), 300)

  selectOption = (option, index) => {
    const { multiple, onChange, options, selected } = this.props;

    if (onChange) {
      let nextValue = option;
      let nextSelected = index;
      if (multiple) {
        nextValue = [];
        nextSelected = [];
        let removed = false;
        (selected || []).forEach((selectedIndex) => {
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
        <Box
          id={id ? `${id}__select-drop` : undefined}
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
          <SelectContainerBox
            flex={true}
            role='menubar'
            tabIndex='-1'
            ref={this.selectRef}
            overflow='auto'
            theme={theme}
          >
            <InfiniteScroll items={options} step={theme.select.step}>
              {(option, index) => (
                <Button
                  role='menuitem'
                  ref={(ref) => { this.optionsRef[index] = ref; }}
                  active={
                    selected === index ||
                    (Array.isArray(selected) && selected.indexOf(index) !== -1) ||
                    activeIndex === index ||
                    (option && option === value) ||
                    (option && Array.isArray(value) && value.indexOf(option) !== -1)
                  }
                  key={`option_${name || ''}_${index}`}
                  onClick={() => this.selectOption(option, index)}
                  hoverIndicator='background'
                >
                  {children ? children(option, index, options) : (
                    <Box align='start' pad='small'>
                      <Text margin='none'>
                        {(option !== null && option !== undefined) ?
                          option.toString() : undefined}
                      </Text>
                    </Box>
                  )}
                </Button>
              )}
            </InfiniteScroll>
          </SelectContainerBox>
        </Box>
      </Keyboard>
    );
  }
}

export default withTheme(SelectContainer);
