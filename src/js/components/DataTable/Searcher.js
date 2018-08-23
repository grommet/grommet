import React, { Component, Fragment } from 'react';
import { FormSearch } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

export class Searcher extends Component {
  inputRef = React.createRef()

  componentDidMount() {
    const { filtering, property } = this.props;
    if (this.inputRef.current && filtering === property) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { filtering, filters, onFilter, onFiltering, property } = this.props;
    if (filtering === property) {
      return (
        <Keyboard onEsc={() => onFiltering(undefined)}>
          <Box flex={true} pad={{ horizontal: 'small' }}>
            <TextInput
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
          icon={<FormSearch color={filtering === property ? 'brand' : 'border'} />}
          hoverIndicator={true}
          onClick={() => onFiltering(filtering === property ? undefined : property)}
        />
      </Fragment>
    );
  }
}
