import React, { Component, Fragment } from 'react';
import { FormSearch } from 'grommet-icons';

import { Button } from '../Button';
import { Box } from '../Box';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { Keyboard } from '../Keyboard';

export default class Searcher extends Component {
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
          <Box flex={false} pad={{ horizontal: 'small' }}>
            <TextInput
              ref={this.inputRef}
              value={filters[property]}
              onChange={event => onFilter(property, event.target.value)}
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
