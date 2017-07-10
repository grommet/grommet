import PropTypes from 'prop-types';
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

// NOTE: This component is a temporary wrapper of react-intl FormattedMessage
// to avoid errors being thrown if the context hasn't been wrapped by
// IntlProvider. The hope is that react-intl will change to obviate the
// need for this component.

import React from 'react';
import { FormattedMessage } from 'react-intl';

const GrommetFormattedMessage = (props, context) => (
  context.intl ? <FormattedMessage {...props} />
    : <span>
        {props.defaultMessage || props.id}
      </span>
);

GrommetFormattedMessage.contextTypes = {
  intl: PropTypes.object
};

GrommetFormattedMessage.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string
};

GrommetFormattedMessage.displayName = 'GrommetFormattedMessage';

export default GrommetFormattedMessage;
