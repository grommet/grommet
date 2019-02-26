/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../Select';

export default class SelectInteractive extends React.Component {
  state = { value: [], options: this.props.options };

  render() {
    if (this.props.searchable) {
      return (
        <Select
          {...this.props}
          value={this.state.value}
          onChange={event =>
            this.setState({
              value: event.value,
              options: this.props.options,
            })
          }
          onSearch={searchText => {
            const regexp = new RegExp(searchText, 'i');
            this.setState({
              options: this.props.options.filter(o => o.match(regexp)),
            });
          }}
          options={this.state.options}
        />
      );
    }
    return (
      <Select
        {...this.props}
        value={this.state.value}
        onChange={event =>
          this.setState({
            value: event.value,
            options: this.props.options,
          })
        }
      />
    );
  }
}

SelectInteractive.propTypes = {
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf([
    'none',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  closeOnChange: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledKey: PropTypes.string,
  dropAlign: PropTypes.shape({
    top: PropTypes.oneOf(['top', 'bottom']),
    bottom: PropTypes.oneOf(['top', 'bottom']),
    right: PropTypes.oneOf(['left', 'right']),
    left: PropTypes.oneOf(['left', 'right']),
  }),
  dropHeight: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  dropTarget: PropTypes.object,
  focusIndicator: PropTypes.bool,
  id: PropTypes.string,
  labelKey: PropTypes.string,
  messages: PropTypes.shape({
    multiple: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.node,
  plain: PropTypes.bool,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  value: PropTypes.array,
  valueLabel: PropTypes.node,
  valueKey: PropTypes.string,
  emptySearchMessage: PropTypes.string,
};
