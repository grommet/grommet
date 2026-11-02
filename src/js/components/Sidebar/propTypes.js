// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.node,
    footer: PropTypes.node,
    header: PropTypes.node,
  };
}
export const SidebarPropTypes = PropType;
