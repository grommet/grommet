import React, { Component, Fragment } from 'react';

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
              data-testid={`searcher-input-${property}`}
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
      <Fragment>
        {filters[property] ? (
          <Box flex={false} pad={{ horizontal: 'small' }}>
            <Text>{filters[property]}</Text>
          </Box>
        ) : null}
        <Button
          data-testid={`searcher-on-filtering-${property}`}
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
      </Fragment>
    );
  }
}

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);

const SearcherWrapper = compose(withTheme)(Searcher);

export { SearcherWrapper as Searcher };
