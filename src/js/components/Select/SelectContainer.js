import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { debounce } from '../../utils';

import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

class SelectContainer extends Component {
  state = {
    activeIndex: -1, // for tracking keyboard interaction
    search: '',
  }
  static defaultProps = {
    value: '',
  }
  optionsRef = {}

  componentDidMount() {
    const { onSearch } = this.props;
    // timeout need to send the operation through event loop and allow time to the portal
    // to be available
    setTimeout(() => {
      if (onSearch) {
        findDOMNode(this.searchRef).querySelector('input').focus();
      } else if (this.selectRef) {
        findDOMNode(this.selectRef).focus();
      }
    }, 0);
  }

  componentDidUpdate() {
    const { activeIndex } = this.state;
    const buttonNode = findDOMNode(this.optionsRef[activeIndex]);
    if (activeIndex >= 0 && buttonNode && buttonNode.scrollIntoView) {
      buttonNode.scrollIntoView();
    }
  }

  onInput = (event) => {
    this.setState(
      { search: event.target.value },
      () => this.onSearch(this.state.search)
    );
  }

  onSearch = debounce(search => this.props.onSearch(search), 150)

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
        target: findDOMNode(this.inputRef),
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
    this.setState({ activeIndex: index });
  }

  onPreviousOption = (event) => {
    const { activeIndex } = this.state;
    event.preventDefault();
    const index = Math.max(activeIndex - 1, 0);
    this.setState({ activeIndex: index });
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
      dropBackground,
      id,
      name,
      onKeyDown,
      onSearch,
      options,
      searchPlaceholder,
      selected,
      value,
    } = this.props;
    const { activeIndex, search } = this.state;

    return (
      <Keyboard
        onEnter={this.onSelectOption}
        onUp={this.onPreviousOption}
        onDown={this.onNextOption}
        onKeyDown={onKeyDown}
      >
        <Box
          id={id ? `${id}__select-drop` : undefined}
          background={dropBackground}
        >
          {onSearch ? (
            <Box pad='xsmall'>
              <TextInput
                focusIndicator={true}
                size='small'
                ref={(ref) => { this.searchRef = ref; }}
                type='search'
                value={search}
                placeholder={searchPlaceholder}
                onInput={this.onInput}
              />
            </Box>
          ) : undefined}

          <Box
            flex={false}
            role='menubar'
            tabIndex='-1'
            ref={(ref) => { this.selectRef = ref; }}
          >
            <InfiniteScroll items={options} step={20}>
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
          </Box>
        </Box>
      </Keyboard>
    );
  }
}

export default SelectContainer;
