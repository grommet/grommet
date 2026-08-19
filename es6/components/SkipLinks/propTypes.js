// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
    messages: PropTypes.shape({
      skipTo: PropTypes.string
    })
  };
}
export var SkipLinksPropTypes = PropType;