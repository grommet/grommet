// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    components: PropTypes.object,
    options: PropTypes.shape({}),
  };
}
export const MarkdownPropTypes = PropType;
