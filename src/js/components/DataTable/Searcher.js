import React, { Component } from 'react';

import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { FormSearch } from 'grommet-icons/icons/FormSearch';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { normalizeColor } from '../../utils';

class Searcher extends Component {
  inputRef = React.createRef();

  componentDidMount() {
    this.focusInputIfNeeded();
  }

  componentDidUpdate() {
    this.focusInputIfNeeded();
  }

  focusInputIfNeeded() {
    /* eslint-disable-next-line react/prop-types */
    const { filtering, property } = this.props;
    if (this.inputRef.current && filtering === property) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const {
      /* eslint-disable-next-line react/prop-types */
      filtering,
      filters,
      onFilter,
      onFiltering,
      property,
      theme,
    } = this.props;
    if (filtering === property) {
      return (
        <Keyboard onEsc={() => onFiltering(undefined)}>
          <Box flex pad={{ horizontal: 'small' }}>
            <TextInput
              name={`search-${property}`}
              ref={this.inputRef}
              value={filters[property]}
              onChange={event => onFilter(property, event.target.value)}
              onBlur={() => onFiltering(undefined)}
            />
          </Box>
        </Keyboard>
      );
    }

    return (
      <>
        {filters[property] ? (
          <Box
            flex={false}
            pad={{ horizontal: 'small' }}
            direction="row"
            align="center"
          >
            <Text>{filters[property]}</Text>
          </Box>
        ) : null}
        <Button
          a11yTitle={`focus-search-${property}`}
          icon={
            <FormSearch
              color={normalizeColor(
                filtering === property ? 'brand' : 'border',
                theme,
              )}
            />
          }
          hoverIndicator
          onClick={() =>
            onFiltering(filtering === property ? undefined : property)
          }
        />
      </>
    );
  }
}

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);

const SearcherWrapper = compose(withTheme)(Searcher);

export { SearcherWrapper as Searcher };
