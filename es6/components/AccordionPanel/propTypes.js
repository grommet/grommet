// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    header: PropTypes.node
  };
}
export var AccordionPanelPropTypes = PropType;