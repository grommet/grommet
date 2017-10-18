import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { Down } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { debounce } from '../utils';

class SelectContainer extends Component {
  state = {
    activeOptionIndex: -1,
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
      } else {
        findDOMNode(this.selectRef).focus();
      }
    }, 0);
  }

  componentDidUpdate() {
    const { activeOptionIndex } = this.state;
    const buttonNode = findDOMNode(this.optionsRef[activeOptionIndex]);
    if (activeOptionIndex >= 0 && buttonNode) {
      buttonNode.scrollIntoView();
    }
  }

  onInput = (event) => {
    this.setState(
      { search: event.target.value, activeOptionIndex: -1 }, () => this.onSearch(this.state.search)
    );
  }

  onSearch = debounce(search => this.props.onSearch(search), 150)

  selectOption = (option) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange({ target: findDOMNode(this.inputRef), option });
    }
  }

  onNextOption = (event) => {
    const { options } = this.props;
    const { activeOptionIndex } = this.state;
    event.preventDefault();
    const index = Math.min(activeOptionIndex + 1, options.length - 1);
    this.setState({ activeOptionIndex: index });
  }

  onPreviousOption = (event) => {
    const { activeOptionIndex } = this.state;
    event.preventDefault();
    const index = Math.max(activeOptionIndex - 1, 0);
    this.setState({ activeOptionIndex: index });
  }

  onSelectOption = (event) => {
    const { options } = this.props;
    const { activeOptionIndex } = this.state;
    if (activeOptionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      this.selectOption(options[activeOptionIndex]);
    }
  }

  selectControl = () => {
    const { placeholder, value, ...rest } = this.props;
    delete rest.children;
    const content = React.isValidElement(value) ? value : (
      <TextInput
        ref={(ref) => { this.inputRef = ref; }}
        {...rest}
        type='text'
        placeholder={placeholder}
        plain={true}
        readOnly={true}
        value={value}
      />
    );
    return (
      <Box align='center' direction='row' border='all'>
        {content}
        <Box margin={{ horizontal: 'small' }}>
          <Down />
        </Box>
      </Box>
    );
  }

  render() {
    const {
      background,
      basis,
      children,
      name,
      onKeyDown,
      onSearch,
      options,
      searchPlaceholder,
      value,
    } = this.props;
    const { activeOptionIndex, search } = this.state;
    return (
      <Keyboard
        onEnter={this.onSelectOption}
        onUp={this.onPreviousOption}
        onDown={this.onNextOption}
        onKeyDown={onKeyDown}
      >
        <Box background={background}>
          {onSearch ? (
            <Box pad='xsmall'>
              <TextInput
                focus={true}
                plain={true}
                size='small'
                ref={(ref) => { this.searchRef = ref; }}
                type='search'
                value={search}
                placeholder={searchPlaceholder}
                onInput={this.onInput}
              />
            </Box>
          ) : undefined}
          <Box basis={basis} overflow='auto'>
            <Box flex={false} role='menubar' tabIndex='-1' ref={(ref) => { this.selectRef = ref; }}>
              {options.map((option, index) => (
                <Button
                  role='menuitem'
                  ref={(ref) => { this.optionsRef[index] = ref; }}
                  active={activeOptionIndex === index || option === value}
                  key={`option_${name || ''}_${index}`}
                  onClick={() => this.selectOption(option)}
                  hoverIndicator='background'
                >
                  {children ? children(option, index, options) : (
                    <Box align='start' pad='small'>
                      <Text margin='none'>{option.toString()}</Text>
                    </Box>
                  )}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Keyboard>
    );
  }
}

export default SelectContainer;
