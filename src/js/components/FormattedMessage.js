// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// NOTE: This component is a temporary wrapper of react-intl FormattedMessage
// to avoid errors being thrown if the context hasn't been wrapped by
// IntlProvider. The hope is that react-intl will change to obviate the
// need for this component.

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

export default class GrommetFormattedMessage extends Component {
  render() {
    var result;
    if (this.context.intl) {
      result = (
        <FormattedMessage id={this.props.id}
          defaultMessage={this.props.defaultMessage} />
      );
    } else {
      result = (
        <span id={this.props.id}>
          {this.props.defaultMessage || this.props.id}
        </span>
      );
    }

    return result;
  }
}

GrommetFormattedMessage.contextTypes = {
  intl: PropTypes.object
};

GrommetFormattedMessage.propTypes = {
  id: PropTypes.string,
  defaultMessage: PropTypes.string
};
